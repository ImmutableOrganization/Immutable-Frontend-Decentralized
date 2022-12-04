import { NextPage } from 'next';
import { Component, useEffect, useState } from 'react';
import { BaseRoomConfig, joinRoom, Room } from 'trystero';
import { EncryptionComponent } from '../components/ChatApp/EncryptionComponent';
import { MessageComponent } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
let ranOnce = false;

const DecentralizedChat: NextPage = () => {
	// onload check if keys exist
	// if not prompt user to create
	// they can deny

	// display encryption status at top of page
	// display public key top of page with copy button

	const [sendMessageState, setSendMessageState] = useState<any>();

	useEffect(() => {
		if (!ranOnce) {
			// first just do unencrypted chat right lol.

			// make conn
			// THIS MUST BE UNIQUE AND PRIVATE
			const _appId = 'immutable';

			// _roomname - A string to namespace peers and events within a room.
			const _roomName = 'room22213213qsadsad';
			console.log('hi');
			const password = 'public';

			// CONFIG CAN TAKE A PASSWORD TO MASK PEERS TO NOT USERS OF THE APP
			//password, encrypts the SID for peers , session descriptions will be encrypted using AES-CBC
			// really no need i think, guess means only authed users can connect to the chat network.
			// maybe set an env one for the org.

			// other options params we can skip
			const config: BaseRoomConfig = { appId: _appId };
			// const room = joinRoom(config, _roomName);

			// if (rooms) {
			// should probably chekc if doesnt exist already
			// setRooms((rooms: any) => [...rooms, room]);
			// }

			// room.leave();
			// room.getPeers();
			// room.onPeerJoin((peerId) => console.log(`${peerId} joined`));
			// room.onPeerLeave((peerId) => console.log(`${peerId} left`));

			// const [sendMessage, getMessage, inprogressMessage] = room.makeAction('message');

			// setSendMessageState(sendMessage);

			// getMessage((_msg, peerId: string, metadata: any) => {
			// console.log('hi!');
			// });

			// inprogressMessage((percent, peerId, metadata) => console.log(`${percent * 100}% done receiving  from ${peerId}`));
			ranOnce = true;
		}
	}, []);

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

	const emptyRoom: RoomWrapper = {
		roomName: '',
		_id: '',
	};
	const [selectedRoom, setSelectedRoom] = useState<RoomWrapper>(emptyRoom);

	return (
		<>
			<EncryptionComponent />
			<RoomComponent selectedRoomCallback={setSelectedRoom} />
			<MessageComponent selectedRoom={selectedRoom} />
		</>
	);
};

export default DecentralizedChat;
