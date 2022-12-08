import { useContext, useState } from 'react';
import { BaseRoomConfig, joinRoom, selfId } from 'trystero';
import { MessageCallback } from '../../../pages/decentralizedchat';
import { Message } from '../MessageComponent';
import { RoomWrapper } from '../RoomComponent';
import * as trystero from 'trystero';
import React from 'react';
import { PopupContext } from '../../../pages/_app';
import { FormError } from '../../Modals/Error';

export let sendMessage: trystero.ActionSender<Message>;

export interface PeerStream {
	[peerid: string]: MediaStream;
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

	// add room to state
	const addRoom = (_roomName: string) => {
		if (_roomName == '') {
			setFormError({ open: true, message: 'Room must have a name' });
			return;
		}
		// check if roomName is already in state
		if (rooms) {
			if (rooms.find((room) => room.roomName === _roomName)) {
				setFormError({ open: true, message: 'Room must have a name' });
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
		if (_room.room) {
			console.log('disconnecting from room executed', _room);
			_room.room.leave();
			const newItem: RoomWrapper = { ..._room, room: undefined };

			if (rooms) {
				setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
			} else {
				console.log("error, can't disconnect from room");
				// this should never be called
			}
		}
	};

	const connectStream = async (_room: RoomWrapper, _stream: MediaStream) => {
		// this object can store audio instances for later

		if (rooms) {
			// find _room in rooms
			const room = rooms.find((room) => room.roomName === _room.roomName);
			console.log('room', room);
			if (room) {
				if (room.room) {
					console.log('stream', _stream);
					// send stream to peers currently in the room
					room.room.addStream(_stream);

					// send stream to peers who join later
					room.room.onPeerJoin((peerId) => room?.room.addStream(_stream, peerId));
					// handle streams from other peers
					room?.room.onPeerStream((stream, peerId) => {
						console.log('stream received', stream, peerId);
						const copy = { ...streamsRef.current };
						copy[peerId] = stream;
						setStreamRef(copy);
					});
				}
			}
		}
	};

	const connectToRoom = (_room: RoomWrapper) => {
		// join room

		try {
			const config: BaseRoomConfig = { appId: '8AhTQ9k2K8nr' };
			const room = joinRoom(config, _room.roomName);
			console.log('JOINING ROOM params', _room);

			const newItem: RoomWrapper = { ..._room, room };
			// replace room in state with new room
			if (rooms) {
				setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
			} else {
				setRooms([newItem]);
			}

			console.log('JOINING ROOM', room);
			// replace room in state with new room

			// NOW SETUP LISTENERS
			// ON PEER JOIN AND ON PEER LEAVE I WANT TO EMIT MESSAGE TO ALL USERS IN ROOM
			// room.onPeerJoin((peerId) => console.log(`${peerId} joined`));
			// room.onPeerLeave((peerId) => console.log(`${peerId} left`));

			// THEN ACTION TO SEND MESSAGE TO USERS IN ROOM

			// const idsToNames = {};
			const [_sendMessage, getMessage, onMessageProgress] = room.makeAction<Message>('message');
			// console.log('sendMessage', _sendMessage);
			// _sendMessage({ message: 'test', timestamp: Date.now() });
			// its this line that breaks it
			sendMessage = _sendMessage;
			console.log('sendMessage', sendMessage);
			// parse message
			getMessage((_msg, peerId) => {
				console.log('message received', _msg);

				if (!_msg) {
					console.log('message failed val');
					// kick peer?
					return;
				}
				if (_msg.message) {
					//
				} else {
					console.log('message failed val');
					// kick peer?
					return;
				}
				if (_msg.timestamp) {
					//
				} else {
					console.log('timestamp failed val');
					// kick peer?
					return;
				}

				messageCallback.getMessageListener(_msg, peerId, _room.roomName);
			});

			// need to pass sendMessage to message component

			// need to show sends in progress somehow
			// inprogressMessage((percent, peerId, metadata) => console.log(`${percent * 100}% done receiving  from ${peerId}`));

			// // listen for peers naming themselves
			// room.onPeerJoin((peerId) => _sendMessage({ message: `${selfId} has joined the room`, timestamp: Date.now() }));
			// room.onPeerLeave((peerId) => console.log(`${idsToNames[peerId] || 'a weird stranger'} left`));

			// end of join room
		} catch (e) {
			console.log(e);
			// error callback here, either throws when user is already connected to room
			// might also when peer limit is too high
		}
	};

	// remove room from state
	const removeRoom = (_room: RoomWrapper) => {
		if (!_room.room) {
			console.log('no room to leave');
			return;
		}
		// NEED TO MAKE THIS LEAVE THE ROOM connection as well
		_room.room.leave();

		if (rooms) {
			setRooms((rooms: any) => rooms.filter((room: RoomWrapper) => room.roomName !== _room.roomName));
		}
	};

	// select room
	const selectRoom = (_room: RoomWrapper) => {
		if (_room.room) {
			console.log('must disconnect to room');
			disconnectRoom(_room);
			return;
		}
		selectedRoomCallback(_room);
	};

	const getPeers = (_room: RoomWrapper) => {
		if (_room.room) {
			console.log('peers');
			return _room.room.getPeers();
		}
		console.log('no peers');
		return [];
	};

	const callSendMessage = (message: Message) => {
		console.log('calling send message', message);
		if (sendMessage) {
			sendMessage(message);
			console.log('success');
		} else {
			console.log('fail');
		}
	};

	return { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers, callSendMessage, connectStream, streamsRef };
};
