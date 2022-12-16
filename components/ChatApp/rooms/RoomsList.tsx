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
	return (
		<div className='roomsList'>
			{rooms ? (
				<Frame
					headerText={'Rooms'}
					body={() => (
						<div className='chat-channels'>
							{rooms.map((room: Room.RoomWrapper) => (
								<div key={room.roomName} className='rooms-list-item'>
									<>
										{room.roomName}
										<input type='button' className='button' onClick={() => removeRoom(room)} value='REMOVE' />
										<div className={room.room ? 'isSelected' : ''}>{room.room ? 'Connected' : 'Not connected'}</div>

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
									</>
								</div>
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
