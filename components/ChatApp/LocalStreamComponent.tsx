import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import { PopupContext } from '../../pages/_app';
import { Frame } from '../Frame';
import { JoinRoom } from './rooms/JoinRoom';
import { Room } from './rooms/room';

interface LocalStreamComponentProps {
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;
  localStream: MediaStream | undefined;
  addRoom: (roomName: string, password: string) => void;
  selectedRoom: Room.RoomWrapper;
}

export const LocalStreamComponent: React.FunctionComponent<LocalStreamComponentProps> = ({ localStream, setLocalStream, addRoom, selectedRoom }) => {
  const [useAudio, setUseAudio] = useState<boolean>(true);
  const [useVideo, setUseVideo] = useState<boolean>(true);
  const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);
  const [hideLocalStream, setHideLocalStream] = useState<boolean>(true);

  const fetchStream = async () => {
    setToastMessage('Connecting to stream...');
    setOpenToast(true);
    setToastType('loading');

    const selfStream = await navigator.mediaDevices.getUserMedia({
      audio: useAudio,
      video: useVideo,
    });
    setOpenToast(false);

    setLocalStream(selfStream);
  };

  const streamConnectionHandler = () => {
    if (!localStream) {
      fetchStream();
    } else {
      disconnectStream();
    }
  };

  const disconnectStream = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(undefined);
  };

  return (
    <div className='localStream'>
      <Frame
        headerText={'User Options'}
        body={() => (
          <>
            <div className='options'>
              <div className='client-options'>
                <label
                  className={'checkbox-item ' + (localStream ? 'disabled' : '')}
                  onClick={() => {
                    if (localStream != undefined) return;
                    setUseAudio(!useAudio);
                  }}
                >
                  Audio
                  <FontAwesomeIcon icon={useAudio ? faCheckSquare : faSquare}></FontAwesomeIcon>
                </label>
                <input type='button' className='button' value={`${!localStream ? 'connect' : 'disconnect'}`} onClick={() => streamConnectionHandler()} />
                <label
                  className={'checkbox-item ' + (localStream ? 'disabled' : '')}
                  onClick={() => {
                    if (localStream != undefined) return;
                    setUseVideo(!useVideo);
                  }}
                >
                  Video
                  <FontAwesomeIcon icon={useVideo ? faCheckSquare : faSquare}></FontAwesomeIcon>
                </label>
                {localStream && hideLocalStream && (
                  <>
                    <input type='button' className='button' value='show' onClick={() => setHideLocalStream(false)} />
                  </>
                )}
              </div>
              {localStream && !hideLocalStream && (
                <>
                  <input type='button' className='button' value='hide' onClick={() => setHideLocalStream(true)} />
                  <div className='peerStream'>
                    <ReactPlayer width={'100%'} height={'100%'} playing={true} controls={true} url={localStream} />
                  </div>
                </>
              )}
            </div>
            {!selectedRoom || (selectedRoom.roomName == '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && <JoinRoom addRoom={addRoom} />)}
          </>
        )}
      />
    </div>
  );
};
