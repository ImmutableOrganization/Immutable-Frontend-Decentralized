import { useContext, useEffect, useState } from 'react';
import { ActionSender, BaseRoomConfig, joinRoom, selfId } from 'trystero';
import React from 'react';
import { PopupContext } from '../../../pages/_app';
import { useLocalStorage } from 'usehooks-ts';
import { Messages } from '../messages/messages';
import { Room } from '../rooms/room';
import * as trystero from 'trystero';

export let sendMessage: ActionSender<Messages.Message>;

export const useRooms = (selectedRoomCallback: (_room: Room.RoomWrapper) => void, messageCallback: Messages.MessageCallback) => {
	const [rooms, setRooms] = useState<Room.RoomWrapper[]>();
	const [savedRooms, setSavedRooms] = useLocalStorage<Room.SavedRoom[]>('roomNames', []);
	const { setFormError } = useContext(PopupContext);

	useEffect(() => {
		if (!rooms || rooms.length === 0) {
			addRoom('GLOBAL', '');
		}
	}, [rooms]);
	useEffect(() => {
		setRooms(savedRooms.map((_room) => ({ roomName: _room.roomName, room: undefined, password: _room.password })));
	}, []);

	const [streams, setStreams] = useState<Room.PeerStream>();
	const streamsRef = React.useRef(streams);
	const setStreamRef = (data: Room.PeerStream) => {
		streamsRef.current = data;
		setStreams(data);
	};

	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

	// separate code for updating room state vs stream state
	// organization and functionality
	const addToSavedRooms = (roomName: string, _password: string) => {
		if (savedRooms) {
			if (!savedRooms.find((room) => room.roomName === roomName)) {
				setSavedRooms([...savedRooms, { roomName, password: _password }]);
			}
		} else {
			setSavedRooms([{ roomName, password: _password }]);
		}
	};
	const removedFromSavedRooms = (roomName: string) => {
		if (savedRooms) {
			setSavedRooms(savedRooms.filter((room) => room.roomName !== roomName));
		}
	};

	// add room to state
	const addRoom = (_roomName: string, _password: string) => {
		if (_roomName == '') {
			setToastMessage('Room must have a name');
			setOpenToast(true);
			setToastType('failure');
			return;
		}

		console.log('useROoom addRoom', _roomName);
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
			console.log(1);
			if (!rooms.find((room) => room.roomName === _roomName)) {
				console.log(2);
				setRooms([...rooms, { roomName: _roomName, room: undefined, password: _password }]);
				addToSavedRooms(_roomName, _password);
			}
		} else {
			console.log(4);
			setRooms([{ roomName: _roomName, room: undefined, password: _password }]);
			addToSavedRooms(_roomName, _password);
		}
	};

	const disconnectRoom = (_room: Room.RoomWrapper) => {
		console.log('disconnecting from room', _room);
		console.log("unselecting room because it's disconnected");
		selectedRoomCallback(Room.emptyRoom);

		// ok this is the issue, selected room is reset but the _room.room is undefined so we never actually leave. why?

		if (_room.room) {
			console.log('disconnecting from room executed', _room);
			_room.room.leave();
			const newItem: Room.RoomWrapper = { ..._room, room: undefined };
			if (rooms) {
				setRooms((rooms: any) => rooms.map((room: Room.RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
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

	const connectStream = async (_room: Room.RoomWrapper, _stream: MediaStream) => {
		if (rooms) {
			// find _room in rooms
			const _rooms = rooms.find((room) => room.roomName === _room.roomName);
			console.log('room', _rooms);
			if (_rooms) {
				if (_rooms.room) {
					console.log('stream', _stream);
					try {
						_rooms.room.addStream(_stream);
						_rooms.room.onPeerJoin((peerId) => {
							console.log('peer joined', peerId);
							if (_rooms.room) {
								_rooms.room.addStream(_stream, peerId);
							} else {
								setFormError({ open: true, message: 'Room no longer exists for peer to join' });
							}
						});
						_rooms.room.onPeerLeave((peerId) => {
							console.log('peer left', peerId);
							if (_rooms.room) {
								_rooms.room.removeStream(_stream, peerId);
							}
						});
					} catch (e) {
						console.log('error adding stream', e);
						setFormError({ open: true, message: 'Error adding stream' });
					}
				}
			}
		}
	};

	const disconnectStream = async (_room: Room.RoomWrapper, _stream: MediaStream) => {
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

	const connectToRoom = (_room: Room.RoomWrapper) => {
		try {
			const config: BaseRoomConfig = { appId: '63f7ef007b534d6bb42e9c02650f3901', password: _room.password };
			let room: trystero.Room;
			try {
				room = joinRoom(config, _room.roomName);
				console.log('joined room: ', room);
				const newItem: Room.RoomWrapper = { ..._room, room };
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

				console.log('updating room with new item ', newItem, rooms);
				// replace room in state with new room
				if (rooms) {
					setRooms((rooms: any) => rooms.map((room: Room.RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
				} else {
					setRooms([newItem]);
				}

				console.log('JOINING ROOM', room);
				if (room) {
					const [_sendMessage, getMessage] = room.makeAction<Messages.Message>('message');
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
	const removeRoom = (_room: Room.RoomWrapper) => {
		if (_room.room) {
			_room.room.leave();
			console.log('no room to leave');
		}
		if (rooms) {
			setRooms((rooms: any) => rooms.filter((room: Room.RoomWrapper) => room.roomName !== _room.roomName));
			removedFromSavedRooms(_room.roomName);
		}
	};

	// select room
	const selectRoom = (_room: Room.RoomWrapper) => {
		if (_room.room) {
			setFormError({ open: true, message: 'Already connected to room' });
			disconnectRoom(_room);
			return;
		}
		selectedRoomCallback(_room);
	};

	const getPeers = (_room: Room.RoomWrapper) => {
		if (_room.room) {
			return _room.room.getPeers();
		} else {
			return [];
		}
	};

	const callSendMessage = (message: Messages.Message) => {
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
		savedRooms,
	};
};
