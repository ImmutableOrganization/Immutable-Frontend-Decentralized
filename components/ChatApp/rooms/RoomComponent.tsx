import { Dispatch, SetStateAction } from 'react';
import { Frame } from '../../Frame';
import { Room } from './room';
import { RoomsList } from './RoomsList';
import { SingleRoom } from './SingleRoom';

interface RoomComponentProps {
  removeRoom: (room: Room.RoomWrapper) => void;
  disconnectRoom: (room: Room.RoomWrapper) => void;
  rooms: Room.RoomWrapper[] | undefined;
  selectRoom: (room: Room.RoomWrapper) => void;
  getPeers: (room: Room.RoomWrapper) => string[];
  connectToRoom: (room: Room.RoomWrapper) => void;
  connectStream: (room: Room.RoomWrapper, _stream: MediaStream) => void;
  selfStream: MediaStream | undefined;
  selectedRoom: Room.RoomWrapper | undefined;
  disconnectStream: (room: Room.RoomWrapper, _stream: MediaStream) => void;
  setLocalStream: Dispatch<SetStateAction<MediaStream | undefined>>;
  setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
  setShowAllPeerOptions: Dispatch<SetStateAction<boolean>>;
}

export const RoomComponent: React.FunctionComponent<RoomComponentProps> = ({
  removeRoom,
  disconnectRoom,
  selectRoom,
  rooms,
  getPeers,
  connectToRoom,
  connectStream,
  selfStream,
  selectedRoom,
  disconnectStream,
  setLocalStream,
  setOpenMessageOptions,
  setShowAllPeerOptions,
}) => {
  return (
    <div className='roomComponent'>
      {selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' ? (
        <Frame
          headerText={'You are in: ' + selectedRoom.roomName}
          body={() => (
            <SingleRoom
              room={selectedRoom}
              disconnectRoom={disconnectRoom}
              getPeers={getPeers}
              selfStream={selfStream}
              setLocalStream={setLocalStream}
              connectStream={connectStream}
              disconnectStream={disconnectStream}
              setOpenMessageOptions={setOpenMessageOptions}
              setShowAllPeerOptions={setShowAllPeerOptions}
            />
          )}
        />
      ) : (
        <RoomsList
          removeRoom={removeRoom}
          disconnectRoom={disconnectRoom}
          selectRoom={selectRoom}
          rooms={rooms}
          connectToRoom={connectToRoom}
          selectedRoom={selectedRoom}
        />
      )}
    </div>
  );
};
