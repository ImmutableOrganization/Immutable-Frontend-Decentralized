import { useState } from 'react';

interface RoomComponentProps {}

interface RoomWrapper {
	roomName: string;
}
const useRooms = () => {
	const [rooms, setRooms] = useState<RoomWrapper[]>();

	// add room to state
	const addRoom = (roomName: string) => {
		if (rooms) {
			setRooms((rooms: any) => [...rooms, { roomName }]);
		} else {
			setRooms([{ roomName }]);
		}
	};

	// remove room from state
	const removeRoom = (roomName: string) => {
		if (rooms) {
			setRooms((rooms: any) => rooms.filter((room: RoomWrapper) => room.roomName !== roomName));
		}
	};

	return { rooms, addRoom, removeRoom };
};

export const RoomComponent: React.FunctionComponent<RoomComponentProps> = () => {
	const { rooms, addRoom, removeRoom } = useRooms();

	const joinRoom = () => {
		const [roomName, setRoomName] = useState<string>('');
		return (
			<div className='joinRoom'>
				<input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
				<input type='button' onClick={() => addRoom(roomName)} value='join room' />
				<input type='button' onClick={() => removeRoom(roomName)} value='leave room' />
			</div>
		);
	};
	const roomsList = () => {
		return (
			<div className='roomsList'>
				{rooms ? (
					<>
						{rooms.map((room: RoomWrapper) => (
							<>
								<ul>
									<h2>{room.roomName}</h2>
									<li>peers</li>
									<li>leave</li>
									<li>ping</li>
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
