import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRooms } from '../components/ChatApp/hooks/useRooms';
import { MessageComponent, useMessages } from '../components/ChatApp/messages/MessageComponent';
import { RoomComponent } from '../components/ChatApp/rooms/RoomComponent';
import { LocalStreamComponent } from '../components/ChatApp/LocalStreamComponent';
import { VideoComponent } from '../components/ChatApp/VideoComponent';
import { AllPeerOptionsModal } from '../components/ChatApp/modals/AllPeerOptions';
import { MessageOptionsModal } from '../components/ChatApp/modals/MessageOptions';
import { useRouter } from 'next/router';
import { Room } from '../components/ChatApp/rooms/room';
import { Messages } from '../components/ChatApp/messages/messages';
import Head from 'next/head';

export const PeerToPeer: NextPage = () => {
  const router = useRouter();
  const { roomName, password } = router.query;

  // load room from url params
  useEffect(() => {
    if (roomName && typeof roomName === 'string') {
      if (password && typeof password === 'string') {
        setSelectedRoom({ roomName, room: undefined, password, allowStreams: true });
      } else {
        setSelectedRoom({ roomName, room: undefined, password: '', allowStreams: true });
      }
    }
  }, [roomName]);

  const [selectedRoom, setSelectedRoom] = useState<Room.RoomWrapper>(Room.emptyRoom);

  const getMessageListener = (message: Messages.Message, roomName: string) => {
    addMessage(message, roomName, false);
  };
  const sendMessageAction = (message: Messages.Message) => {
    callSendMessage(message);
  };

  const [maxMessageSize, setMaxMessageSize] = useState<number>(1000);
  const [blockMessagesWithProfanity, setBlockMessagesWithProfanity] = useState<boolean>(false);
  const [censcorMessagesWithProfanity, setCenscorMessagesWithProfanity] = useState<boolean>(true);
  const [peerMessageInterval, setPeerMessageInterval] = useState<number>(1000);

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
    allowStreamsForRoom,
  } = useRooms(setSelectedRoom, { getMessageListener }, maxMessageSize, blockMessagesWithProfanity, censcorMessagesWithProfanity, peerMessageInterval);

  const { messagesRef, addMessage } = useMessages(sendMessageAction);

  // ga tracking for page and events

  const [localStream, setLocalStream] = useState<MediaStream>();

  // need to have a config or something, with useLocalStorage, there will be many more of these
  // maybe can be a hook instead
  const [dateHidden, setDateHidden] = useState<boolean>(true);
  const [timeHidden, setTimeHidden] = useState<boolean>(false);
  const [shortenPeerId, setShortenPeerId] = useState<boolean>(true);

  const [openMessageOptions, setOpenMessageOptions] = useState<boolean>(false);

  const [showChatFeed, setShowChatFeed] = useState<boolean>(true);
  const [showVideoFeed, setShowVideoFeed] = useState<boolean>(true);

  const [showAllPeerOptions, setShowAllPeerOptions] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Peer to Peer</title>
      </Head>
      {openMessageOptions && (
        <MessageOptionsModal
          maxMessageSize={maxMessageSize}
          setMaxMessageSize={setMaxMessageSize}
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
          blockMessagesWithProfanity={blockMessagesWithProfanity}
          setBlockMessagesWithProfanity={setBlockMessagesWithProfanity}
          censcorMessagesWithProfanity={censcorMessagesWithProfanity}
          setCenscorMessagesWithProfanity={setCenscorMessagesWithProfanity}
          peerMessageInterval={peerMessageInterval}
          setPeerMessageInterval={setPeerMessageInterval}
        />
      )}
      {showAllPeerOptions && (
        <AllPeerOptionsModal
          blockPeerAudioController={blockPeerAudioController}
          blockPeerTextController={blockPeerTextController}
          blockPeerVideoController={blockPeerVideoController}
          peerStreams={streamsRef.current}
          setShowAllPeerOptions={setShowAllPeerOptions}
          selectedRoom={selectedRoom}
        />
      )}
      <LocalStreamComponent selectedRoom={selectedRoom} addRoom={addRoom} localStream={localStream} setLocalStream={setLocalStream} />
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
          allowStreamsForRoom={allowStreamsForRoom}
          blockPeerAudioController={blockPeerAudioController}
          blockPeerVideoController={blockPeerVideoController}
          rooms={rooms}
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

export default PeerToPeer;