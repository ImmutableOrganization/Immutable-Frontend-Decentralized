import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Frame } from '../Frame';
import { Room } from './rooms/room';

interface VideoComponentProps {
  peerStreams: React.MutableRefObject<Room.PeerStream | undefined>;
  selectedRoom: Room.RoomWrapper;
  selfStream: MediaStream | undefined;
  allowStreamsForRoom: (room: Room.RoomWrapper, allow: boolean) => void;
  blockPeerAudioController: (peerId: string, block: boolean) => void;
  blockPeerVideoController: (peerId: string, block: boolean) => void;
  rooms: Room.RoomWrapper[] | undefined;
}

const RepeatingPeriod: React.FunctionComponent = ({}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 5) {
        setCount(count + 1);
      } else {
        setCount(1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return <>{'.'.repeat(count)}</>;
};
export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({
  selfStream,
  peerStreams,
  selectedRoom,
  blockPeerAudioController,
  blockPeerVideoController,
  allowStreamsForRoom,
  rooms,
}) => {
  const [columnCount, setColumnCount] = useState<number>(100);

  useEffect(() => {}, [rooms]);

  return (
    <div className='peerStreams'>
      {/* map over peer streams */}
      {selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
        <Frame
          headerText={selectedRoom.roomName + ' AUDIO / VIDEO'}
          body={() => (
            <>
              <div className='options'>
                <input
                  type={'range'}
                  className='text-input terminal-input'
                  value={columnCount}
                  onChange={(e) => {
                    if (Number(e.target.value) > 100) {
                      setColumnCount(100);
                    } else {
                      setColumnCount(Number(e.target.value));
                    }
                  }}
                />
                {'' + columnCount + '%'}
              </div>
              <div className='streams'>
                {selfStream && (
                  <div className='peerStream' style={{ width: `${columnCount}vw` }}>
                    <div className='streamHeader'>
                      <div className='overflow-text'>{'YOU'}</div>
                    </div>
                    <ReactPlayer playsinline={true} height={'auto'} width={`${columnCount}vw`} playing={true} controls={true} url={selfStream} />
                  </div>
                )}
                {peerStreams.current ? (
                  <>
                    {selectedRoom.allowStreams ? (
                      <>
                        {Object.entries(peerStreams.current).map(([peerid, _stream], index) => {
                          return (
                            <>
                              {!_stream.videoBlocked && (
                                <div key={index} className='peerStream' style={{ width: `${columnCount}vw` }}>
                                  <>
                                    <div className='streamHeader'>
                                      <div className='overflow-text'>{peerid}</div>
                                      <input
                                        type='button'
                                        className='button'
                                        onClick={() => {
                                          blockPeerVideoController(peerid, true);
                                          blockPeerAudioController(peerid, true);
                                        }}
                                        value='X'
                                      />
                                    </div>
                                    <ReactPlayer
                                      playsinline={true}
                                      height={'auto'}
                                      width={`${columnCount}vw`}
                                      playing={true}
                                      controls={true}
                                      url={_stream.mediaStream}
                                    />
                                  </>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div className='options'>
                        <input
                          type='button'
                          className='button'
                          onClick={() => {
                            allowStreamsForRoom(selectedRoom, true);
                          }}
                          value='Allow Streams'
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className='options'>
                    Waiting for streams
                    <RepeatingPeriod />
                  </div>
                )}
              </div>
            </>
          )}
        />
      )}
    </div>
  );
};
