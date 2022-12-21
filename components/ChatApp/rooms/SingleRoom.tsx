import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { selfId } from 'trystero';
import { PopupContext } from '../../../pages/_app';
import { Room } from './room';

interface SingleRoomProps {
  room: Room.RoomWrapper;
  getPeers: (room: Room.RoomWrapper) => string[];
  disconnectRoom: (room: Room.RoomWrapper) => void;
  selfStream: MediaStream | undefined;
  setLocalStream: Dispatch<SetStateAction<MediaStream | undefined>>;
  connectStream: (room: Room.RoomWrapper, _stream: MediaStream) => void;
  disconnectStream: (room: Room.RoomWrapper, _stream: MediaStream) => void;
  setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
  setShowAllPeerOptions: Dispatch<SetStateAction<boolean>>;
}

export const SingleRoom: React.FunctionComponent<SingleRoomProps> = ({
  room,
  getPeers,
  selfStream,
  setLocalStream,
  connectStream,
  disconnectStream,
  setOpenMessageOptions,
  setShowAllPeerOptions,
  disconnectRoom,
}) => {
  const [peers, setPeers] = useState<String[]>();

  useEffect(() => {
    if (room.room) {
      room.room.onPeerJoin(() => {
        setPeers(getPeers(room));
      });
      room.room.onPeerLeave(() => {
        setPeers(getPeers(room));
      });
    }
    setPeers(getPeers(room));
  }, []);

  const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

  const connectStreamHandler = async () => {
    if (!selfStream) {
      setToastMessage('Connecting to stream...');
      setOpenToast(true);
      setToastType('loading');
      const _selfStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setOpenToast(false);

      setLocalStream(_selfStream);
      connectStream(room, _selfStream);
    } else {
      connectStream(room, selfStream);
    }
  };

  // hide connect button if already connected
  // hide disconnect button if not connected
  // auto connect stream when user clicks connect your video / audio

  return (
    <div className='currRoom'>
      <span>You: {selfId}.</span>
      {peers?.length} peers in room.
      <input type='button' className='button' value='Options' onClick={() => setOpenMessageOptions(true)} />
      <input type='button' className='button' value='Show Peer Options' onClick={() => setShowAllPeerOptions(true)} />
      {selfStream ? (
        <>
          <input type='button' className='button' onClick={() => connectStreamHandler()} value='send stream' />
          <input
            type='button'
            className='button'
            onClick={() => {
              disconnectRoom(room);
              disconnectStream(room, selfStream);
            }}
            value='DISCONNECT'
          />
        </>
      ) : (
        <>
          <input type='button' className='button' onClick={() => connectStreamHandler()} value='Broadcast Video' />
          <input
            type='button'
            className='button'
            onClick={() => {
              disconnectRoom(room);
            }}
            value='DISCONNECT ROOM'
          />
        </>
      )}
    </div>
  );
};
