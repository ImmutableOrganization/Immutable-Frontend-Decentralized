import { faBed } from '@fortawesome/free-solid-svg-icons';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';
import { BaseRoomConfig, joinRoom, Room } from 'trystero';
import { MessageCallback, useRooms } from '../../pages/decentralizedchat';
import { Frame } from '../Frame';

interface RoomComponentProps {
	selectedRoomCallback: (room: RoomWrapper) => void;
	messageCallback: MessageCallback;
	addRoom: (roomName: string) => void;
	removeRoom: (room: RoomWrapper) => void;
	disconnectRoom: (room: RoomWrapper) => void;
	rooms: RoomWrapper[] | undefined;
	selfId: string;
	selectRoom: (room: RoomWrapper) => void;
	getPeers: (room: RoomWrapper) => void;
	connectToRoom: (room: RoomWrapper) => void;
	connectStream: (room: RoomWrapper, _stream: MediaStream) => void;
}
export interface RoomWrapper {
	roomName: string;
	_id: string;
	room: Room | undefined;
}

let ranOnce = false;

export const RoomComponent: React.FunctionComponent<RoomComponentProps> = ({
	selectedRoomCallback,
	messageCallback,
	addRoom,
	removeRoom,
	disconnectRoom,
	selectRoom,
	rooms,
	selfId,
	getPeers,
	connectToRoom,
	connectStream,
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
				headerText='Join Room'
				body={() => (
					<>
						<input type='text' className='text_input terminal-input' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
						<input type='button' className='button' onClick={() => addRoom(roomName)} value='join room' />
					</>
				)}
			></Frame>
		);
	};

	const roomsList = () => {
		return (
			<div className='roomsList'>
				{rooms ? (
					<>
						{rooms.map((room: RoomWrapper) => (
							<>
								<Frame
									key={room._id}
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
													<input type='button' className='button' onClick={() => connectStream(room)} value='connect stream' />
												</>
											) : (
												<>
													<li>Not Connected</li>
													<input
														type='button'
														className='button'
														onClick={(e: any) => {
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
					</>
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
