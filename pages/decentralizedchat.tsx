import { NextPage } from 'next';
import { useContext, useState } from 'react';
import { useRooms } from '../components/ChatApp/hooks/useRooms';
import { Message, MessageComponent, useMessages } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
import { PopupContext } from './_app';
import { LocalStreamComponent } from '../components/ChatApp/LocalStreamComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';

export interface MessageCallback {
	getMessageListener: (message: Message, roomId: string) => void;
}

const emptyRoom: RoomWrapper = {
	roomName: 'default',
	room: undefined,
};

const DecentralizedChat: NextPage = () => {
	const [selectedRoom, setSelectedRoom] = useState<RoomWrapper>(emptyRoom);

	const getMessageListener = (message: Message, roomName: string) => {
		addMessage(message, roomName, false);
	};
	const sendMessageAction = (message: Message) => {
		callSendMessage(message);
	};

	const { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers, callSendMessage, connectStream, streamsRef } = useRooms(
		setSelectedRoom,
		{ getMessageListener },
	);

	const { messagesRef, addMessage } = useMessages(sendMessageAction);

	// signing is for authentication, anyone with your public key can decrypt it and verify its you
	// encrypting is for secure messaging, where you require someones public key to write a message to them.
	// =in big pools you can encrypt to many people
	// you would get public key from peers on connection., they send public key etc

	// ga tracking for page and events

	// need to verify user is sending messages to a valid channel

	const [localStream, setLocalStream] = useState<MediaStream>();

	return (
		<>
			{/* <EncryptionComponent /> */}
			<LocalStreamComponent localStream={localStream} setLocalStream={setLocalStream} />

			<RoomComponent
				addRoom={addRoom}
				removeRoom={removeRoom}
				disconnectRoom={disconnectRoom}
				rooms={rooms}
				selfId={selfId}
				getPeers={getPeers}
				connectToRoom={connectToRoom}
				selectRoom={selectRoom}
				connectStream={connectStream}
				selfStream={localStream}
				selectedRoom={selectedRoom}
			/>
			<VideoComponent peerStreams={streamsRef} />
			<MessageComponent selectedRoom={selectedRoom} messages={messagesRef} addMessage={addMessage} />
		</>
	);
};

export default DecentralizedChat;
