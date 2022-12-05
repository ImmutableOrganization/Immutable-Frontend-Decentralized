import { faBed } from '@fortawesome/free-solid-svg-icons';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';
import { BaseRoomConfig, joinRoom, Room } from 'trystero';
import { useRooms } from '../../pages/decentralizedchat';

interface RoomComponentProps {
	selectedRoomCallback: (room: RoomWrapper) => void;
}
export interface RoomWrapper {
	roomName: string;
	_id: string;
	room: Room | undefined;
}

let ranOnce = false;

export const RoomComponent: React.FunctionComponent<RoomComponentProps> = ({ selectedRoomCallback }) => {
	const { rooms, addRoom, removeRoom, selectRoom, connectToRoom, disconnectRoom, selfId, getPeers } = useRooms(selectedRoomCallback);

	useEffect(() => {
		if (!ranOnce) {
		}
	}, []);

	const joinRoom = () => {
		const [roomName, setRoomName] = useState<string>('');
		return (
			<div className='joinRoom'>
				<input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
				<input type='button' onClick={() => addRoom(roomName)} value='join room' />
			</div>
		);
	};

	const roomsList = () => {
		return (
			<div className='roomsList'>
				{selfId}

				{rooms ? (
					<>
						{rooms.map((room: RoomWrapper) => (
							<>
								<ul>
									<h2>{room.roomName}</h2>
									<input type='button' onClick={() => removeRoom(room)} value='leave room' />
									{room.room ? (
										<>
											<li>peers {}</li>
											<li>ping</li>
											<input type='button' onClick={() => disconnectRoom(room)} value='disconnect room' />
											<input type='button' onClick={() => console.log(getPeers(room))} value='getpeers' />
										</>
									) : (
										<>
											<li>Not Connected</li>
											<input
												type='button'
												onClick={(e: any) => {
													selectRoom(room);
													connectToRoom(room);
												}}
												value='connect to room'
											/>
										</>
									)}
								</ul>
							</>
						))}
					</>
				) : (
					<>Please join a room.</>
				)}
			</div>
		);
	};

	return (
		<div className='roomComponent'>
			{joinRoom()}
			{roomsList()}
		</div>
	);
};
