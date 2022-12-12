import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
	disconnectStream: (room: RoomWrapper, _stream: MediaStream) => void;
	showChatFeed: boolean;
	setShowChatFeed: Dispatch<SetStateAction<boolean>>;
	showVideoFeed: boolean;
	setShowVideoFeed: Dispatch<SetStateAction<boolean>>;
	setLocalStream: Dispatch<SetStateAction<MediaStream | undefined>>;
	setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
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
	disconnectStream,
	showChatFeed,
	setShowChatFeed,
	showVideoFeed,
	setShowVideoFeed,
	setLocalStream,
	setOpenMessageOptions,
}) => {
	const joinRoom = () => {
		const [roomName, setRoomName] = useState<string>('');
		return (
			<Frame
				className='joinRoom'
				headerText='ADD Room'
				body={() => (
					<div className='addRoom'>
						<input
							type='text'
							className='text_input terminal-input'
							placeholder='Enter the room name'
							value={roomName}
							onChange={(e) => setRoomName(e.target.value)}
						/>
						<input type='button' className='button' onClick={() => addRoom(roomName)} value='add' />
					</div>
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

		const fetchStreamAndAdd = async () => {
			const _selfStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			setLocalStream(_selfStream);
			connectStream(room, _selfStream);
		};

		// hide connect button if already connected
		// hide disconnect button if not connected
		// auto connect stream when user clicks connect your video / audio

		return (
			<>
				{peers?.length}: peer's in this room.
				<input type='button' className='button' value='Chat Options' onClick={() => setOpenMessageOptions(true)} />
				{selfStream ? (
					<>
						<input type='button' className='button' onClick={() => connectStream(room, selfStream)} value='connect stream' />
						<input
							type='button'
							className='button'
							onClick={() => {
								disconnectStream(room, selfStream);
							}}
							value='DISCONNECT'
						/>
					</>
				) : (
					<>
						<input type='button' className='button' onClick={() => fetchStreamAndAdd()} value='Connect your Video / Audio' />
					</>
				)}
				<input type='button' className='button' onClick={() => setShowChatFeed(!showChatFeed)} value={!showChatFeed ? 'show chat' : 'hide chat'} />
				<input type='button' className='button' onClick={() => setShowVideoFeed(!showVideoFeed)} value={!showVideoFeed ? 'show video' : 'hide video'} />
			</>
		);
	};

	const roomsList = () => {
		return (
			<div className='roomsList'>
				{rooms ? (
					<Frame
						headerText={'Rooms'}
						body={() => (
							<div className='chat-channels'>
								{rooms.map((room: RoomWrapper) => (
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
												<input type='button' className='button' onClick={() => disconnectRoom(room)} value='disconnect' />
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

	return (
		<div className='roomComponent'>
			{joinRoom()}
			{roomsList()}
			{selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame headerText={'Current Room: ' + selectedRoom.roomName} body={() => <SingleRoom room={selectedRoom} />} />
			)}
		</div>
	);
};
