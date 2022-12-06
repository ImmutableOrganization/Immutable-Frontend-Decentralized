import { useState } from 'react';
import { BaseRoomConfig, joinRoom, selfId } from 'trystero';
import { MessageCallback } from '../../../pages/decentralizedchat';
import { Message } from '../MessageComponent';
import { RoomWrapper } from '../RoomComponent';
import * as trystero from 'trystero';
import { v4 as uuidv4 } from 'uuid';

export let sendMessage: trystero.ActionSender<Message>;
export let peerAudios: any = {};
export let peerVideos: any = {};

export interface PeerStream {
	[peerid: string]: MediaStream;
}
export const useRooms = (selectedRoomCallback: (room: RoomWrapper) => void, messageCallback: MessageCallback) => {
	const [rooms, setRooms] = useState<RoomWrapper[]>();

	const [streams, setStreams] = useState<PeerStream>();

	// add room to state
	const addRoom = (_roomName: string) => {
		if (_roomName == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}
		// check if roomName is already in state
		if (rooms) {
			if (rooms.find((room) => room.roomName === _roomName)) {
				return;
				// CALLBACK TO ERROR HANDLER
			}
		}

		if (rooms) {
			if (!rooms.find((room) => room.roomName === _roomName)) {
				setRooms([...rooms, { roomName: _roomName, _id: uuidv4(), room: undefined }]);
			}
		} else {
			setRooms([{ roomName: _roomName, _id: uuidv4(), room: undefined }]);
		}
	};

	const disconnectRoom = (_room: RoomWrapper) => {
		console.log('disconnecting from room', _room);
		if (_room.room) {
			console.log('disconnecting from room executed', _room);
			_room.room.leave();
			const newItem: RoomWrapper = { ..._room, room: undefined };

			if (rooms) {
				setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room._id === _room._id ? newItem : room)));
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
			const room = rooms.find((room) => room._id === _room._id);
			if (room) {
				if (room.room) {
					// send stream to peers currently in the room
					room.room.addStream(_stream);

					// send stream to peers who join later
					room.room.onPeerJoin((peerId) => room?.room.addStream(_stream, peerId));
					// handle streams from other peers
					room?.room.onPeerStream((stream, peerId) => {
						setStreams((streams: any) => ({ ...streams, [peerId]: stream }));
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
				setRooms((rooms: any) => rooms.map((room: RoomWrapper) => (room._id === _room._id ? newItem : room)));
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

				messageCallback.getMessageListener(_msg, peerId, _room._id);
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
			setRooms((rooms: any) => rooms.filter((room: RoomWrapper) => room._id !== _room._id));
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

	return { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers, callSendMessage, connectStream, streams };
};
