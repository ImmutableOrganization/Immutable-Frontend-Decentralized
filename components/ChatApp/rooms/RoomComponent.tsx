import { Dispatch, SetStateAction, useEffect } from 'react';
import { Room } from 'trystero';
import { Frame } from '../../Frame';
import { RoomsList } from './RoomsList';
import { SingleRoom } from './SingleRoom';

interface RoomComponentProps {
	removeRoom: (room: RoomWrapper) => void;
	disconnectRoom: (room: RoomWrapper) => void;
	rooms: RoomWrapper[] | undefined;
	selectRoom: (room: RoomWrapper) => void;
	getPeers: (room: RoomWrapper) => string[];
	connectToRoom: (room: RoomWrapper) => void;
	connectStream: (room: RoomWrapper, _stream: MediaStream) => void;
	selfStream: MediaStream | undefined;
	selectedRoom: RoomWrapper | undefined;
	disconnectStream: (room: RoomWrapper, _stream: MediaStream) => void;
	setLocalStream: Dispatch<SetStateAction<MediaStream | undefined>>;
	setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
	setShowAllPeerOptions: Dispatch<SetStateAction<boolean>>;
}
export interface RoomWrapper {
	roomName: string;
	room: Room | undefined;
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
