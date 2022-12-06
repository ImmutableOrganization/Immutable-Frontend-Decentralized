import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { EncryptionComponent } from '../components/ChatApp/EncryptionComponent';
import { useRooms } from '../components/ChatApp/hooks/useRooms';
import { Message, MessageComponent, useMessages } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';
let ranOnce = false;

export interface MessageCallback {
	// sendMessageAction: (message: Message) => void;
	getMessageListener: (message: Message, peerId: string, roomId: string) => void;
}
const DecentralizedChat: NextPage = () => {
	const emptyRoom: RoomWrapper = {
		roomName: 'default',
		_id: '',
		room: undefined,
	};

	const [selectedRoom, setSelectedRoom] = useState<RoomWrapper>(emptyRoom);

	// these hooks now being here couples everything too much

	const getMessageListener = (message: Message, peerId: string, roomId: string) => {
		console.log('got message', message, 'from peer' + peerId);
		addMessage(message, roomId, false);
	};
	const { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers, callSendMessage, connectStream } = useRooms(
		setSelectedRoom,
		{
			getMessageListener,
		},
	);

	const sendMessageAction = (message: Message) => {
		// callback recieved from message component
		// how to notify room component of message sent?
		console.log('sending message', message);
		callSendMessage(message);
	};
	const { messages, addMessage } = useMessages(sendMessageAction);

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

	// need to verify user is sending messages to a valid channel

	// there are video streams and audio s

	return (
		<>
			<EncryptionComponent />
			<RoomComponent
				selectedRoomCallback={setSelectedRoom}
				messageCallback={{ getMessageListener }}
				addRoom={addRoom}
				removeRoom={removeRoom}
				disconnectRoom={disconnectRoom}
				rooms={rooms}
				selfId={selfId}
				getPeers={getPeers}
				connectToRoom={connectToRoom}
				selectRoom={selectRoom}
				connectStream={connectStream}
			/>
			<VideoComponent />
			<MessageComponent selectedRoom={selectedRoom} messages={messages} addMessage={addMessage} />
		</>
	);
};

export default DecentralizedChat;
