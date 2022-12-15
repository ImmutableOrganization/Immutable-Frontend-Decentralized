import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRooms } from '../components/ChatApp/hooks/useRooms';
import { Message, MessageComponent, useMessages } from '../components/ChatApp/messages/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/rooms/RoomComponent';
import { LocalStreamComponent } from '../components/ChatApp/LocalStreamComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';
import { AllPeerOptionsModal } from '../components/ChatApp/modals/AllPeerOptions';
import { MessageOptionsModal } from '../components/ChatApp/modals/MessageOptions';
import { useRouter } from 'next/router';

export interface MessageCallback {
	getMessageListener: (message: Message, roomId: string) => void;
}

export const emptyRoom: RoomWrapper = {
	roomName: '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e',
	room: undefined,
};

const DecentralizedChat: NextPage = () => {
	const router = useRouter();
	const { roomName } = router.query;

	useEffect(() => {
		if (roomName && typeof roomName === 'string') {
			setSelectedRoom({ roomName, room: undefined });
		}
	}, [roomName]);

	const [selectedRoom, setSelectedRoom] = useState<RoomWrapper>(emptyRoom);

	const getMessageListener = (message: Message, roomName: string) => {
		addMessage(message, roomName, false);
	};
	const sendMessageAction = (message: Message) => {
		callSendMessage(message);
	};

	const {
		rooms,
		addRoom,
		removeRoom,
		selectRoom,
		connectToRoom,
		disconnectRoom,
		getPeers,
		callSendMessage,
		connectStream,
		streamsRef,
		disconnectStream,
		blockPeerAudioController,
		blockPeerVideoController,
		blockPeerTextController,
	} = useRooms(setSelectedRoom, { getMessageListener });

	useEffect(() => {
		if (!rooms || rooms.length === 0) {
			addRoom('GLOBAL');
		}
	}, []);

	const { messagesRef, addMessage } = useMessages(sendMessageAction);

	// ga tracking for page and events

	const [localStream, setLocalStream] = useState<MediaStream>();

	// need to have a config or something, with useLocalStorage, there will be many more of these
	const [dateHidden, setDateHidden] = useState<boolean>(true);
	const [timeHidden, setTimeHidden] = useState<boolean>(false);
	const [shortenPeerId, setShortenPeerId] = useState<boolean>(true);

	const [openMessageOptions, setOpenMessageOptions] = useState<boolean>(false);

	const [showChatFeed, setShowChatFeed] = useState<boolean>(true);
	const [showVideoFeed, setShowVideoFeed] = useState<boolean>(true);

	const [showAllPeerOptions, setShowAllPeerOptions] = useState<boolean>(false);

	return (
		<>
			{openMessageOptions && (
				<MessageOptionsModal
					setDateHidden={setDateHidden}
					setTimeHidden={setTimeHidden}
					setShortenPeerId={setShortenPeerId}
					setOpenMessageOptions={setOpenMessageOptions}
					dateHidden={dateHidden}
					timeHidden={timeHidden}
					shortenPeerId={shortenPeerId}
					showChatFeed={showChatFeed}
					setShowChatFeed={setShowChatFeed}
					showVideoFeed={showVideoFeed}
					setShowVideoFeed={setShowVideoFeed}
				/>
			)}
			{showAllPeerOptions && (
				<AllPeerOptionsModal
					blockPeerAudioController={blockPeerAudioController}
					blockPeerTextController={blockPeerTextController}
					blockPeerVideoController={blockPeerVideoController}
					peerStreams={streamsRef.current}
					setShowAllPeerOptions={setShowAllPeerOptions}
				/>
			)}
			<LocalStreamComponent addRoom={addRoom} localStream={localStream} setLocalStream={setLocalStream} />
			<RoomComponent
				removeRoom={removeRoom}
				disconnectRoom={disconnectRoom}
				rooms={rooms}
				getPeers={getPeers}
				connectToRoom={connectToRoom}
				selectRoom={selectRoom}
				connectStream={connectStream}
				selfStream={localStream}
				selectedRoom={selectedRoom}
				disconnectStream={disconnectStream}
				setLocalStream={setLocalStream}
				setOpenMessageOptions={setOpenMessageOptions}
				setShowAllPeerOptions={setShowAllPeerOptions}
			/>
			{showVideoFeed && (
				<VideoComponent
					selfStream={localStream}
					selectedRoom={selectedRoom}
					peerStreams={streamsRef}
					blockPeerAudioController={blockPeerAudioController}
					blockPeerVideoController={blockPeerVideoController}
				/>
			)}
			{showChatFeed && (
				<MessageComponent
					selectedRoom={selectedRoom}
					messages={messagesRef}
					addMessage={addMessage}
					shortenPeerId={shortenPeerId}
					dateHidden={dateHidden}
					timeHidden={timeHidden}
				/>
			)}
		</>
	);
};

export default DecentralizedChat;
