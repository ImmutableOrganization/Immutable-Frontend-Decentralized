import ReactPlayer from 'react-player';
import { Room } from 'trystero';
import { PeerStream } from './hooks/useRooms';

interface VideoComponentProps {
	peerStreams: PeerStream | undefined;
}
export interface RoomWrapper {
	roomName: string;
	_id: string;
	room: Room | undefined;
}

export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({ peerStreams }) => {
	return (
		<div className='videoComponent'>
			{/* map over peer streams */}
			{peerStreams ? (
				Object.keys(peerStreams).map((peerStream) => <ReactPlayer playing={true} controls={true} url={peerStream} />)
			) : (
				<>No peer streams exist</>
			)}
		</div>
	);
};
