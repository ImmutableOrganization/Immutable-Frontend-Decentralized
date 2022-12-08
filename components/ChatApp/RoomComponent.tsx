import { useEffect, useState } from 'react';
import { Room } from 'trystero';
import { Frame } from '../Frame';

interface RoomComponentProps {
	addRoom: (roomName: string) => void;
	removeRoom: (room: RoomWrapper) => void;
	disconnectRoom: (room: RoomWrapper) => void;
	rooms: RoomWrapper[] | undefined;
	selfId: string;
	selectRoom: (room: RoomWrapper) => void;
	getPeers: (room: RoomWrapper) => void;
	connectToRoom: (room: RoomWrapper) => void;
	connectStream: (room: RoomWrapper, _stream: MediaStream) => void;
	selfStream: MediaStream | undefined;
}
export interface RoomWrapper {
	roomName: string;
	room: Room | undefined;
}

let ranOnce = false;

export const RoomComponent: React.FunctionComponent<RoomComponentProps> = ({
	addRoom,
	removeRoom,
	disconnectRoom,
	selectRoom,
	rooms,
	selfId,
	getPeers,
	connectToRoom,
	connectStream,
	selfStream,
}) => {
	useEffect(() => {
		if (!ranOnce) {
		}
	}, []);

	const joinRoom = () => {
		const [roomName, setRoomName] = useState<string>('');
		return (
			<Frame
				className='joinRoom'
				headerText='ADD Room'
				body={() => (
					<>
						<input type='text' className='text_input terminal-input' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
						<input type='button' className='button' onClick={() => addRoom(roomName)} value='add room' />
					</>
				)}
			></Frame>
		);
	};

	const roomsList = () => {
		return (
			<div className='roomsList'>
				{rooms ? (
					<div className='chat-channels'>
						{rooms.map((room: RoomWrapper) => (
							<>
								<Frame
									key={room.roomName}
									headerText={room.roomName}
									body={() => (
										<>
											<input type='button' className='button' onClick={() => removeRoom(room)} value='leave room' />
											{room.room ? (
												<>
													<li>peers {}</li>
													<li>ping</li>
													<input type='button' className='button' onClick={() => disconnectRoom(room)} value='disconnect room' />
													<input type='button' className='button' onClick={() => console.log(getPeers(room))} value='getpeers' />
													{selfStream ? (
														<>
															<input
																type='button'
																className='button'
																onClick={() => connectStream(room, selfStream)}
																value='connect stream'
															/>
														</>
													) : (
														<>No stream connected.</>
													)}
												</>
											) : (
												<>
													<li>Not Connected</li>
													<input
														type='button'
														className='button'
														onClick={() => {
															selectRoom(room);
															connectToRoom(room);
														}}
														value='connect to room'
													/>
												</>
											)}
										</>
									)}
								/>
							</>
						))}
					</div>
				) : (
					// <>Please join a room.</>
					<></>
				)}
			</div>
		);
	};

	return (
		<div className='roomComponent'>
			<Frame headerText={'connection info'} body={() => <>connection id: {selfId}</>} />
			{joinRoom()}
			{roomsList()}
		</div>
	);
};
