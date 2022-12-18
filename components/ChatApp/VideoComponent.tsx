import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Frame } from '../Frame';
import { Room } from './rooms/room';
import Dropdown from 'react-dropdown';

interface VideoComponentProps {
	peerStreams: React.MutableRefObject<Room.PeerStream | undefined>;
	selectedRoom: Room.RoomWrapper;
	selfStream: MediaStream | undefined;
	blockPeerAudioController: (peerId: string, block: boolean) => void;
	blockPeerVideoController: (peerId: string, block: boolean) => void;
}

const options = [
	{ value: '1', label: 'One' },
	{ value: '2', label: 'Two' },
	{ value: '3', label: 'Three' },
	{ value: '4', label: 'Four' },
	{ value: '5', label: 'Five' },
	{ value: '6', label: 'Six' },
	{ value: '7', label: 'Seven' },
	{ value: '8', label: 'Eight' },
	{ value: '9', label: 'Nine' },
];
export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({
	selfStream,
	peerStreams,
	selectedRoom,
	blockPeerAudioController,
	blockPeerVideoController,
}) => {
	const [columnCount, setColumnCount] = useState<number>(1);

	return (
		<div className='peerStreams'>
			{/* map over peer streams */}
			{selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame
					headerText={selectedRoom.roomName + ' AUDIO / VIDEO'}
					body={() => (
						<>
							what if i do a dropdown for amount of columns, prob can never see more than 10
							<Dropdown
								options={options}
								onChange={(e) => {
									setColumnCount(Number(e.value));
								}}
								value={options[columnCount + 1]}
								placeholder='Select an option'
							/>
							;
							<div className='streams'>
								{selfStream && (
									<div className='peerStream'>
										{'YOU'}
										<ReactPlayer height={'auto'} width={'100%'} playing={true} controls={true} url={selfStream} />
									</div>
								)}
								{peerStreams.current ? (
									<>
										<>
											{peerStreams.current && (
												<>
													{/* {'Receiving stream from ' + Object.keys(peerStreams.current).length + ' peers'} */}
													{Object.entries(peerStreams.current).map(([peerid, _stream], index) => {
														return (
															<>
																{!_stream.videoBlocked && (
																	<div
																		key={index}
																		className='peerStream'
																		style={{ gridTemplateColumns: '#'.repeat(columnCount) }}
																	>
																		<>
																			<div className='streamHeader'>
																				{peerid}
																				<div className='streamHeaderButtons'>
																					<input
																						type='button'
																						className='button'
																						onClick={() => {
																							console.log('clicked');
																						}}
																						value='record'
																					/>
																					<input
																						type='button'
																						className='button'
																						onClick={() => {
																							blockPeerVideoController(peerid, true);
																							blockPeerAudioController(peerid, true);
																						}}
																						value='block'
																					/>
																				</div>
																			</div>
																			<ReactPlayer
																				height={'auto'}
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
										<>Waiting for streams...</>
									</div>
								)}
							</div>
						</>
					)}
				/>
			)}
		</div>
	);
};
