import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface RoomComponentProps {
	selectedRoomCallback: (room: RoomWrapper) => void;
}
export interface RoomWrapper {
	roomName: string;
	_id: string;
}
const useRooms = (selectedRoomCallback: (room: RoomWrapper) => void) => {
	const [rooms, setRooms] = useState<RoomWrapper[]>();

	// add room to state
	const addRoom = (roomName: string) => {
		if (roomName == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}

		if (rooms) {
			if (!rooms.find((room) => room.roomName === roomName)) {
				setRooms([...rooms, { roomName, _id: uuidv4() }]);
			}
		} else {
			setRooms([{ roomName, _id: uuidv4() }]);
		}
	};

	// remove room from state
	const removeRoom = (_room: RoomWrapper) => {
		if (rooms) {
			setRooms((rooms: any) => rooms.filter((room: RoomWrapper) => room._id !== _room._id));
		}
	};

	// select room
	const selectRoom = (_room: RoomWrapper) => {
		selectedRoomCallback(_room);
	};

	return { rooms, addRoom, removeRoom, selectRoom };
};
export const RoomComponent: React.FunctionComponent<RoomComponentProps> = ({ selectedRoomCallback }) => {
	const { rooms, addRoom, removeRoom, selectRoom } = useRooms(selectedRoomCallback);

	useEffect(() => {
		addRoom('test');
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
				{rooms ? (
					<>
						{rooms.map((room: RoomWrapper) => (
							<>
								<ul>
									<h2>{room.roomName}</h2>
									<li>peers</li>
									<input type='button' onClick={() => removeRoom(room)} value='leave room' />
									<li>ping</li>
									<input type='button' onClick={() => selectRoom(room)} value='select room' />
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
