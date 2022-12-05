import { NextPage } from 'next';
import { Component, useEffect, useState } from 'react';
import * as trystero from 'trystero';
import { EncryptionComponent } from '../components/ChatApp/EncryptionComponent';
import { MessageComponent, useMessages } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
let ranOnce = false;
import { v4 as uuidv4 } from 'uuid';
import { BaseRoomConfig, joinRoom, selfId } from 'trystero';

const useConnectToRoom = () => {
	// THIS MUST BE UNIQUE AND PRIVATE
	// _roomname - A string to namespace peers and events within a room.
	// console.log('hi');
	// const password = 'public';
	// const [sendMessage, getMessage, inprogressMessage] = room.makeAction('message');
	// // sender, runs when message sent to peers
	// // reciever, runs when essage recieved from peers
	// getMessage((_msg, peerId: string, metadata: any) => {
	// 	console.log('hi!');
	// });
	// inprogressMessage((percent, peerId, metadata) => console.log(`${percent * 100}% done receiving  from ${peerId}`));
	// return { sendMessage, getMessage, inprogressMessage };
};
export const useRooms = (selectedRoomCallback: (room: RoomWrapper) => void) => {
	const [rooms, setRooms] = useState<RoomWrapper[]>();

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
			const [sendName, getName] = room.makeAction('name');

			// // tell other peers currently in the room our name
			sendName('Oedipa');

			// // tell newcomers
			room.onPeerJoin((peerId) => sendName('Oedipa', peerId));

			// // listen for peers naming themselves
			// messageReciever, need this to callback to update message list somehow
			maybe i can return these and then set them in base file
			getName((name, peerId) => (idsToNames[peerId] = name));

			room.onPeerLeave((peerId) => console.log(`${idsToNames[peerId] || 'a weird stranger'} left`));

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

	return { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers };
};
const DecentralizedChat: NextPage = () => {
	const emptyRoom: RoomWrapper = {
		roomName: 'default',
		_id: '',
		room: undefined,
	};

	const [selectedRoom, setSelectedRoom] = useState<RoomWrapper>(emptyRoom);
	const { messages, addMessage } = useMessages();

	const { rooms, connectToRoom } = useRooms(setSelectedRoom);
	// const { sendMessage, getMessage, inprogressMessage } = useConnectToRoom();
	// onload check if keys exist
	// if not prompt user to create
	// they can deny

	// display encryption status at top of page
	// display public key top of page with copy button

	useEffect(() => {
		if (!ranOnce) {
			// first just do unencrypted chat right lol.
			// connectToRoom(selectedRoom);
			// console.log('JOINING ROOM', selectedRoom);
			// console.log('rooms', rooms);

			// make conn

			// CONFIG CAN TAKE A PASSWORD TO MASK PEERS TO NOT USERS OF THE APP
			//password, encrypts the SID for peers , session descriptions will be encrypted using AES-CBC
			// really no need i think, guess means only authed users can connect to the chat network.
			// maybe set an env one for the org.

			// other options params we can skip

			// console.log(room);
			// if (rooms) {
			// should probably chekc if doesnt exist already
			// setRooms((rooms: any) => [...rooms, room]);
			// }

			// room.leave();
			// room.getPeers();
			// room.onPeerJoin((peerId) => console.log(`${peerId} joined`));
			// room.onPeerLeave((peerId) => console.log(`${peerId} left`));

			ranOnce = true;
		}
	}, []);

	// LIMITATIONS, user can only get messages in a room they have joined, cant background listen right
	// this is because of the connection limit on the browser, so we need to limit the number of rooms a user can join
	// am not sure the issues that would arise if i stored every room and made listeners for them all.

	// signing is for authentication, anyone with your public key can decrypt it and verify its you
	// encrypting is for secure messaging, where you require someones public key to write a message to them.
	// =in big pools you can encrypt to many people
	// you would get public key from peers on connection., they send public key etc

	// what is a room even i need to find that out so i can actually undertand this.
	// is a room a place on bittorrent? like

	// want a callback for an error
	// errors on join room, invalid conn, invalid room name, invalid password
	// needs to be a global popup for the chat page
	// push notifications as well for when you get a message, error
	// callback or notification if cant join room, invalid name etc

	// ga tracking for page and events

	// messages linked to a room
	// user select a room
	// user can enter messages to that room when its selected
	// user also can select how many rooms to listen etc
	// for now mvp -> user selects room, enters message, sends message, message is sent to all peers in room

	// need to verify user is sending messages to a valid channel

	return (
		<>
			<EncryptionComponent />
			<RoomComponent selectedRoomCallback={setSelectedRoom} />
			<MessageComponent selectedRoom={selectedRoom} messages={messages} addMessage={addMessage} />
		</>
	);
};

export default DecentralizedChat;
