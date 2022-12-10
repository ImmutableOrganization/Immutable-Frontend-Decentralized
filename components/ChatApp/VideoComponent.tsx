import ReactPlayer from 'react-player';
import { Room } from 'trystero';
import { PeerStream } from './hooks/useRooms';

interface VideoComponentProps {
	peerStreams: React.MutableRefObject<PeerStream | undefined>;
}
export interface RoomWrapper {
	roomName: string;
	_id: string;
	room: Room | undefined;
}

export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({ peerStreams }) => {
	return (
		<div className='peerStreams'>
			{/* map over peer streams */}
			{peerStreams.current ? (
				<>
					{Object.values(peerStreams.current).map((peerStream, index) => {
						return (
							<div key={index} className='peerStream'>
								<>
									{'Peer'}
									<ReactPlayer playing={true} controls={true} url={peerStream} />
								</>
							</div>
						);
					})}
				</>
			) : (
				<>
					<>No peer streams exist</>
				</>
			)}
		</div>
	);
};
