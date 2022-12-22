import { useState } from 'react';
import { Frame } from '../../Frame';
import { Room } from './room';

interface RoomsListProps {
  removeRoom: (room: Room.RoomWrapper) => void;
  disconnectRoom: (room: Room.RoomWrapper) => void;
  selectRoom: (room: Room.RoomWrapper) => void;
  connectToRoom: (room: Room.RoomWrapper) => void;
  rooms: Room.RoomWrapper[] | undefined;
  selectedRoom: Room.RoomWrapper | undefined;
}
export const RoomsList: React.FunctionComponent<RoomsListProps> = ({ removeRoom, disconnectRoom, selectRoom, connectToRoom, rooms, selectedRoom }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='roomsList'>
      {rooms ? (
        <Frame
          headerText={'Rooms'}
          body={() => (
            <div className='chat-channels'>
              {rooms.map((room: Room.RoomWrapper, index: number) => (
                <>
                  {room.roomName && (
                    <div key={room.roomName + '.' + index} className='rooms-list-item'>
                      <>
                        {room.roomName}
                        <input type='button' className='button' onClick={() => removeRoom(room)} value='REMOVE' />
                        {room.room ? 'Connected' : 'Not connected'}
                        {!room.room ? (
                          <>
                            {/* if no room is selected show connect button, if a room is already selected do not show button */}
                            {!selectedRoom?.room && (
                              <input
                                type='button'
                                className='button'
                                onClick={() => {
                                  selectRoom(room);
                                  connectToRoom(room);
                                }}
                                value='CONNECT'
                              />
                            )}
                          </>
                        ) : (
                          <input type='button' className='button' onClick={() => disconnectRoom(room)} value='disconnect room' />
                        )}

                        {room.password ? (
                          <>
                            Password{' '}
                            {showPassword ? (
                              <>
                                <input type='button' className='button' onClick={() => setShowPassword(false)} value='Hide' /> <u>{room.password}</u>
                              </>
                            ) : (
                              <>
                                <input type='button' className='button' onClick={() => setShowPassword(true)} value='Show' />{' '}
                              </>
                            )}
                          </>
                        ) : (
                          <>No password </>
                        )}
                      </>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        />
      ) : (
        // <>Please join a room.</>
        <></>
      )}
    </div>
  );
};
