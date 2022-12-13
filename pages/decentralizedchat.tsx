import { NextPage } from 'next';
import { SetStateAction, useContext, useState } from 'react';
import { useRooms } from '../components/ChatApp/hooks/useRooms';
import { Message, MessageComponent, useMessages } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
import { PopupContext } from './_app';
import { LocalStreamComponent } from '../components/ChatApp/LocalStreamComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { time } from 'console';
import { Frame } from '../components/Frame';
import { Stream } from 'stream';

export interface MessageCallback {
	getMessageListener: (message: Message, roomId: string) => void;
}

export const emptyRoom: RoomWrapper = {
	roomName: '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e',
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

	const {
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
	} = useRooms(setSelectedRoom, { getMessageListener });

	const { messagesRef, addMessage } = useMessages(sendMessageAction);

	// signing is for authentication, anyone with your public key can decrypt it and verify its you
	// encrypting is for secure messaging, where you require someones public key to write a message to them.
	// =in big pools you can encrypt to many people
	// you would get public key from peers on connection., they send public key etc

	// ga tracking for page and events

	// need to verify user is sending messages to a valid channel

	const [localStream, setLocalStream] = useState<MediaStream>();
	const [dateHidden, setDateHidden] = useState<boolean>(true);
	const [timeHidden, setTimeHidden] = useState<boolean>(false);
	const [shortenPeerId, setShortenPeerId] = useState<boolean>(true);

	const [openMessageOptions, setOpenMessageOptions] = useState<boolean>(false);

	const [showChatFeed, setShowChatFeed] = useState<boolean>(true);
	const [showVideoFeed, setShowVideoFeed] = useState<boolean>(true);

	const [showAllPeerOptions, setShowAllPeerOptions] = useState<boolean>(false);
	const allPeerOptionsModal = () => {
		return (
			<Frame
				headerText='Options'
				className='message-options'
				body={() => (
					<div className='options'>
						{streamsRef.current ? (
							<>
								{Object.entries(streamsRef.current).map(([peerid, _stream], index) => {
									return (
										<div className=''>
											{peerid}:
											<input
												type='button'
												value={_stream.textBlocked && _stream.audioBlocked && _stream.videoBlocked ? 'UNBLOCK' : 'BLOCK'}
												className='button'
												onClick={() => {
													blockPeerTextController(peerid, !_stream.textBlocked);
													blockPeerAudioController(peerid, !_stream.audioBlocked);
													blockPeerVideoController(peerid, !_stream.videoBlocked);
												}}
											></input>
										</div>
									);
								})}
							</>
						) : (
							<>No streams available.</>
						)}
						<input type='button' className='button' value='CLOSE' onClick={() => setShowAllPeerOptions(false)} />
					</div>
				)}
			/>
		);
	};

	const messageOptionsModal = () => {
		return (
			<Frame
				headerText='Options'
				className='message-options'
				body={() => (
					<>
						<div className='options'>
							<label className='chat-option-item' onClick={() => setDateHidden(!dateHidden)}>
								HIDE DATE
								<FontAwesomeIcon icon={dateHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							<label className='chat-option-item' onClick={() => setTimeHidden(!timeHidden)}>
								HIDE TIME
								<FontAwesomeIcon icon={timeHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							<label className='chat-option-item' onClick={() => setShortenPeerId(!shortenPeerId)}>
								SHORTEN ID's
								<FontAwesomeIcon icon={shortenPeerId ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							<label className='chat-option-item' onClick={() => setShowChatFeed(!showChatFeed)}>
								Show Chat
								<FontAwesomeIcon icon={showChatFeed ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							<label className='chat-option-item' onClick={() => setShowVideoFeed(!showVideoFeed)}>
								Show Video
								<FontAwesomeIcon icon={showVideoFeed ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							<input type='button' className='button' value='CLOSE' onClick={() => setOpenMessageOptions(false)} />
						</div>
					</>
				)}
			/>
		);
	};

	return (
		<>
			{openMessageOptions && messageOptionsModal()}
			{showAllPeerOptions && allPeerOptionsModal()}
			{/* <EncryptionComponent /> */}
			<LocalStreamComponent addRoom={addRoom} localStream={localStream} setLocalStream={setLocalStream} />

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
				disconnectStream={disconnectStream}
				showChatFeed={showChatFeed}
				setShowChatFeed={setShowChatFeed}
				showVideoFeed={showVideoFeed}
				setShowVideoFeed={setShowVideoFeed}
				setLocalStream={setLocalStream}
				setOpenMessageOptions={setOpenMessageOptions}
				peerStreams={streamsRef}
				setShowAllPeerOptions={setShowAllPeerOptions}
			/>
			{showVideoFeed && (
				<VideoComponent
					selfStream={localStream}
					selectedRoom={selectedRoom}
					peerStreams={streamsRef}
					blockPeerAudioController={blockPeerAudioController}
					blockPeerTextController={blockPeerTextController}
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
					setOpenMessageOptions={setOpenMessageOptions}
				/>
			)}
		</>
	);
};

export default DecentralizedChat;
