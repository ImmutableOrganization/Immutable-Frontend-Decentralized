import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { EncryptionComponent } from '../components/ChatApp/EncryptionComponent';
import { peerAudios, peerVideos, useRooms } from '../components/ChatApp/hooks/useRooms';
import { Message, MessageComponent, useMessages } from '../components/ChatApp/MessageComponent';
import { RoomComponent, RoomWrapper } from '../components/ChatApp/RoomComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';
import ReactPlayer from 'react-player';
import { Frame } from '../components/Frame';

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
	const { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers, callSendMessage, connectStream, streams } = useRooms(
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

			// CONFIG CAN TAKE A PASSWORD TO MASK PEERS TO NOT USERS OF THE APP
			//password, encrypts the SID for peers , session descriptions will be encrypted using AES-CBC
			// really no need i think, guess means only authed users can connect to the chat network.
			// maybe set an env one for the org.

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

	const fetchStream = async () => {
		const selfStream = await navigator.mediaDevices.getUserMedia({
			audio: useAudio,
			video: useVideo,
		});
		setLocalStream(selfStream);
	};

	const disconnectStream = () => {
		if (localStream) {
			localStream.getTracks().forEach((track) => track.stop());
		}

		setLocalStream(undefined);
		peerAudios[selfId].srcObject = undefined;
		peerVideos[selfId].srcObject = undefined;
	};
	const [localStream, setLocalStream] = useState<MediaStream>();
	const [useAudio, setUseAudio] = useState<boolean>(true);
	const [useVideo, setUseVideo] = useState<boolean>(true);

	const streamConnectionHandler = () => {
		console.log('stream connected');
		if (!localStream) {
			fetchStream();
		} else {
			disconnectStream();
		}
	};

	const [hideLocalStream, setHideLocalStream] = useState<boolean>(false);

	return (
		<>
			<EncryptionComponent />
			<Frame
				headerText={'Local Stream Controls'}
				body={() => (
					<>
						<label>
							{`audio: ${useAudio ? 'on' : 'off'}`}
							<input disabled={localStream != undefined} type='checkbox' checked={useAudio} onChange={(e) => setUseAudio(!useAudio)} />
						</label>
						<label>
							{`video: ${useVideo ? 'on' : 'off'}`}
							<input disabled={localStream != undefined} type='checkbox' checked={useVideo} onChange={(e) => setUseVideo(!useVideo)} />
						</label>
						<input
							type='button'
							className='button'
							value={`${!localStream ? 'connect' : 'disconnect'} stream`}
							onClick={() => streamConnectionHandler()}
						/>

						{/* local stream preview */}
						{localStream && !hideLocalStream ? (
							<>
								<input type='button' className='button' value='hide local stream' onClick={() => setHideLocalStream(true)} />
								<h1>LOCAL</h1>
								<div>
									<ReactPlayer playing={true} controls={true} url={localStream} />
								</div>
							</>
						) : localStream && hideLocalStream ? (
							<>
								<input type='button' className='button' value='show local stream' onClick={() => setHideLocalStream(false)} />
							</>
						) : null}
					</>
				)}
			/>

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
			<VideoComponent peerStreams={streams} />
			<MessageComponent selectedRoom={selectedRoom} messages={messages} addMessage={addMessage} />
		</>
	);
};

export default DecentralizedChat;
