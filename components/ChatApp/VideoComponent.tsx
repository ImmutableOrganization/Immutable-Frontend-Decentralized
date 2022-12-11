import ReactPlayer from 'react-player';
import { Frame } from '../Frame';
import { PeerStream } from './hooks/useRooms';
import { RoomWrapper } from './RoomComponent';

interface VideoComponentProps {
	peerStreams: React.MutableRefObject<PeerStream | undefined>;
	selectedRoom: RoomWrapper;
}

export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({ peerStreams, selectedRoom }) => {
	return (
		<div className='peerStreams'>
			{/* map over peer streams */}
			{selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame
					headerText={'VIDEO'}
					body={() => (
						<>
							{peerStreams.current ? (
								<>
									<>
										{peerStreams.current &&
											Object.entries(peerStreams.current).map(([peerid, _stream], index) => {
												return (
													<div key={index} className='peerStream'>
														<>
															{peerid === 'self' ? 'self' : peerid}
															<ReactPlayer width={'100%'} playing={true} controls={true} url={_stream} />
														</>
													</div>
												);
											})}
									</>
								</>
							) : (
								<>
									<>No peer streams exist</>{' '}
								</>
							)}
						</>
					)}
				/>
			)}
		</div>
	);
};
