import { useContext, useState } from 'react';
import { BaseRoomConfig, joinRoom, selfId } from 'trystero';
import { emptyRoom, MessageCallback } from '../../../pages/decentralizedchat';
import { Message } from '../MessageComponent';
import { RoomWrapper } from '../RoomComponent';
import * as trystero from 'trystero';
import React from 'react';
import { PopupContext } from '../../../pages/_app';
import { FormError } from '../../Modals/Error';

export let sendMessage: trystero.ActionSender<Message>;

export interface Peer {
	mediaStream: MediaStream;
	videoBlocked: boolean;
	audioBlocked: boolean;
	textBlocked: boolean;
}

export interface PeerStream {
	[peerid: string]: Peer;
}
export const useRooms = (selectedRoomCallback: (room: RoomWrapper) => void, messageCallback: MessageCallback) => {
	const [rooms, setRooms] = useState<RoomWrapper[]>();
	const { setFormError, setIsLoading } = useContext(PopupContext);

	const [streams, setStreams] = useState<PeerStream>();
	const streamsRef = React.useRef(streams);
	const setStreamRef = (data: PeerStream) => {
		streamsRef.current = data;
		setStreams(data);
	};

	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

	// add room to state
	const addRoom = (_roomName: string) => {
		if (_roomName == '') {
			setToastMessage('Room must have a name');
			setOpenToast(true);
			setToastType('failure');
			return;
		}
		// check if roomName is already in state
		if (rooms) {
			if (rooms.find((room) => room.roomName === _roomName)) {
				setToastMessage('Room exists');
				setOpenToast(true);
				setToastType('failure');
				return;
			}
		}
		if (rooms) {
			if (!rooms.find((room) => room.roomName === _roomName)) {
				setRooms([...rooms, { roomName: _roomName, room: undefined }]);
			}
		} else {
			setRooms([{ roomName: _roomName, room: undefined }]);
		}
	};

	const disconnectRoom = (_room: RoomWrapper) => {
		console.log('disconnecting from room', _room);
		console.log("unselecting room because it's disconnected");
		selectedRoomCallback(emptyRoom);

		// ok this is the issue, selected room is reset but the _room.room is undefined so we never actually leave. why?

		if (_room.room) {
			console.log('disconnecting from room executed', _room);
			_room.room.leave();
			const newItem: RoomWrapper = { ..._room, room: undefined };
			if (rooms) {
				setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
				// unselect room
			}
		}
	};

	const blockPeerVideoController = (peerId: string, block: boolean) => {
		if (streams) {
			const newStreams = { ...streams };
			if (newStreams[peerId]) {
				newStreams[peerId].videoBlocked = block;
				setStreamRef(newStreams);
			}
		}
	};

	const blockPeerAudioController = (peerId: string, block: boolean) => {
		if (streams) {
			const newStreams = { ...streams };
			if (newStreams[peerId]) {
				newStreams[peerId].audioBlocked = block;
				setStreamRef(newStreams);
			}
		}
	};

	const blockPeerTextController = (peerId: string, block: boolean) => {
		if (streams) {
			const newStreams = { ...streams };
			if (newStreams[peerId]) {
				newStreams[peerId].textBlocked = block;
				setStreamRef(newStreams);
			}
		}
	};

	const connectStream = async (_room: RoomWrapper, _stream: MediaStream) => {
		if (rooms) {
			// find _room in rooms
			const room = rooms.find((room) => room.roomName === _room.roomName);
			console.log('room', room);
			if (room) {
				if (room.room) {
					console.log('stream', _stream);
					try {
						room.room.addStream(_stream);
					} catch (e) {
						setFormError({ open: true, message: 'Error adding stream' });
					}
					room.room.onPeerJoin((peerId) => {
						console.log('peer joined', peerId);
						if (room.room) {
							room.room.addStream(_stream, peerId);
						} else {
							setFormError({ open: true, message: 'Room no longer exists for peer to join' });
						}
					});
				}
			}
		}
	};

	const disconnectStream = async (_room: RoomWrapper, _stream: MediaStream) => {
		if (rooms) {
			// find _room in rooms
			const room = rooms.find((room) => room.roomName === _room.roomName);
			console.log('room', room);
			if (room) {
				if (room.room) {
					console.log('stream', _stream);
					try {
						room.room.removeStream(_stream);
					} catch (e) {
						setFormError({ open: true, message: 'Error removing stream' });
					}
				}
			}
		}
	};

	const connectToRoom = (_room: RoomWrapper) => {
		try {
			const config: BaseRoomConfig = { appId: '8AhTQ9k2K8nr' };
			let room: trystero.Room;
			try {
				room = joinRoom(config, _room.roomName);
				const newItem: RoomWrapper = { ..._room, room };
				selectedRoomCallback(newItem);
				if (newItem.room) {
					// send stream to peer when they join

					newItem.room.onPeerStream((stream, peerId) => {
						console.log('stream received', stream, peerId);
						const copy = { ...streamsRef.current };
						copy[peerId] = { mediaStream: stream, videoBlocked: false, audioBlocked: false, textBlocked: false };
						setStreamRef(copy);
					});
				}

				// replace room in state with new room
				if (rooms) {
					setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
				} else {
					setRooms([newItem]);
				}

				console.log('JOINING ROOM', room);
				if (room) {
					const [_sendMessage, getMessage, onMessageProgress] = room.makeAction<Message>('message');
					sendMessage = _sendMessage;
					getMessage((_msg, peerId) => {
						if (!_msg) {
							setFormError({ open: true, message: 'Message failed validation' });
							return;
						}
						if (_msg.message == undefined || _msg.message == null || _msg.message == '') {
							setFormError({ open: true, message: 'Invalid message' });
							return;
						}
						if (_msg.timestamp == undefined || _msg.timestamp == null || _msg.timestamp <= 0) {
							setFormError({ open: true, message: 'Invalid timestamp' });
							return;
						}
						_msg.peerId = peerId;
						messageCallback.getMessageListener(_msg, _room.roomName);
					});
				} else {
					setFormError({ open: true, message: 'Room is undefined' });
				}
			} catch (e) {
				console.log('error joining room', e);
				setFormError({ open: true, message: 'Error joining room, ' + e });
			}
			console.log('JOINING ROOM params', _room);
		} catch (e) {
			console.log(e);
		}
	};

	// remove room from state
	const removeRoom = (_room: RoomWrapper) => {
		if (_room.room) {
			_room.room.leave();
			console.log('no room to leave');
		}
		if (rooms) {
			setRooms((rooms: any) => rooms.filter((room: RoomWrapper) => room.roomName !== _room.roomName));
		}
	};

	// select room
	const selectRoom = (_room: RoomWrapper) => {
		if (_room.room) {
			setFormError({ open: true, message: 'Already connected to room' });
			disconnectRoom(_room);
			return;
		}
		selectedRoomCallback(_room);
	};

	const getPeers = (_room: RoomWrapper) => {
		if (_room.room) {
			return _room.room.getPeers();
		} else {
			return [];
		}
	};

	const callSendMessage = (message: Message) => {
		console.log('calling send message', message);
		if (sendMessage) {
			sendMessage(message);
			console.log('success');
		} else {
			setFormError({ open: true, message: 'Unable to send message' });
			console.log('fail');
		}
	};

	return {
		rooms,
		addRoom,
		removeRoom,
		selectRoom,
		connectToRoom,
		disconnectRoom,
		selfId,
		getPeers,
		callSendMessage,
		connectStream,
		streamsRef,
		disconnectStream,
		blockPeerAudioController,
		blockPeerVideoController,
		blockPeerTextController,
	};
};
