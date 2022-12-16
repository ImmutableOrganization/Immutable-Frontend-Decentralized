import ReactPlayer from 'react-player';
import { Frame } from '../Frame';
import { Room } from './rooms/room';

interface VideoComponentProps {
	peerStreams: React.MutableRefObject<Room.PeerStream | undefined>;
	selectedRoom: Room.RoomWrapper;
	selfStream: MediaStream | undefined;
	blockPeerAudioController: (peerId: string, block: boolean) => void;
	blockPeerVideoController: (peerId: string, block: boolean) => void;
}

export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({
	selfStream,
	peerStreams,
	selectedRoom,
	blockPeerAudioController,
	blockPeerVideoController,
}) => {
	return (
		<div className='peerStreams'>
			{/* map over peer streams */}
			{selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame
					headerText={selectedRoom.roomName + ' AUDIO / VIDEO'}
					body={() => (
						<>
							{selfStream && (
								<div className='peerStream'>
									{'YOU'}
									<ReactPlayer height={'100%'} width={'100%'} playing={true} controls={true} url={selfStream} />
								</div>
							)}
							{peerStreams.current ? (
								<>
									<>
										{peerStreams.current && (
											<>
												{'Receiving stream from ' + Object.keys(peerStreams.current).length + ' peers'}
												{Object.entries(peerStreams.current).map(([peerid, _stream], index) => {
													return (
														<>
															{!_stream.videoBlocked && (
																<div key={index} className='peerStream'>
																	<>
																		{peerid}
																		<input
																			type='button'
																			className='button'
																			onClick={() => {
																				blockPeerVideoController(peerid, true);
																				blockPeerAudioController(peerid, true);
																			}}
																			value='block'
																		/>
																		<ReactPlayer
																			height={'100%'}
																			width={'100%'}
																			playing={true}
																			controls={true}
																			url={_stream.mediaStream}
																		/>
																	</>
																</div>
															)}
														</>
													);
												})}
											</>
										)}
									</>
								</>
							) : (
								<div className='options'>
									<>No streams in room.</>
								</div>
							)}
						</>
					)}
				/>
			)}
		</div>
	);
};
