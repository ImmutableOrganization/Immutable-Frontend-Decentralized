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
	getPeers: (room: RoomWrapper) => string[];
	connectToRoom: (room: RoomWrapper) => void;
	connectStream: (room: RoomWrapper, _stream: MediaStream) => void;
	selfStream: MediaStream | undefined;
	selectedRoom: RoomWrapper | undefined;
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
	selectedRoom,
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
						<input
							type='text'
							className='text_input terminal-input'
							placeholder='Enter the room name'
							value={roomName}
							onChange={(e) => setRoomName(e.target.value)}
						/>
						<input type='button' className='button' onClick={() => addRoom(roomName)} value='add room' />
					</>
				)}
			></Frame>
		);
	};

	interface SingleRoomProps {
		room: RoomWrapper;
	}
	const SingleRoom: React.FunctionComponent<SingleRoomProps> = ({ room }) => {
		const [peers, setPeers] = useState<String[]>();

		if (room.room) {
			room.room.onPeerJoin(() => {
				setPeers(getPeers(room));
			});
			room.room.onPeerLeave(() => {
				setPeers(getPeers(room));
			});
		}
		useEffect(() => {
			setPeers(getPeers(room));
		}, []);

		return (
			<>
				{peers?.length}: peer's in this room.
				<input type='button' className='button' onClick={() => disconnectRoom(room)} value='disconnect room' />
				<input type='button' className='button' onClick={() => console.log(getPeers(room))} value='getpeers' />
				{selfStream ? (
					<>
						<input type='button' className='button' onClick={() => connectStream(room, selfStream)} value='connect stream' />
					</>
				) : (
					<>Your own stream is not connected.</>
				)}
			</>
		);
	};

	const roomsList = () => {
		return (
			<div className='roomsList'>
				{rooms ? (
					<div className='chat-channels'>
						<Frame
							headerText={'Rooms'}
							body={() =>
								rooms.map((room: RoomWrapper) => (
									<div key={room.roomName}>
										<>
											{room.roomName}
											{room.room ? 'connected' : 'not connected'}
											<br></br>
											<input type='button' className='button' onClick={() => removeRoom(room)} value='REMOVE' />
											{!room.room && (
												<>
													<input
														type='button'
														className='button'
														onClick={() => {
															selectRoom(room);
															connectToRoom(room);
														}}
														value='CONNECT'
													/>
												</>
											)}
										</>
									</div>
								))
							}
						/>
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
			{selectedRoom && <Frame headerText={'Current Room: ' + selectedRoom.roomName} body={() => <SingleRoom room={selectedRoom} />} />}
		</div>
	);
};
