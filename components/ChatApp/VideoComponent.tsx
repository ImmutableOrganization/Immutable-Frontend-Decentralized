import { useEffect, useState } from 'react';
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
	{ value: '1', label: '100%' },
	{ value: '2', label: '90%' },
	{ value: '3', label: '75%' },
	{ value: '4', label: '60%' },
	{ value: '5', label: '50%' },
	{ value: '6', label: '40%' },
	{ value: '7', label: '25%' },
	{ value: '8', label: '10%' },
	// { value: '5', label: 'Five' },
	// { value: '6', label: 'Six' },
	// { value: '7', label: 'Seven' },
	// { value: '8', label: 'Eight' },
	// { value: '9', label: 'Nine' },
];

const widths = [
	'100%',
	'90vw',
	'75vw',
	'60vw',
	'50vw',
	'40vw',
	'25vw',
	'10vw',
	// , '30vw', '35vw', '40vw', '45vw', '50vw'
];

const RepeatingPeriod: React.FunctionComponent = ({}) => {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (count < 5) {
				setCount(count + 1);
			} else {
				setCount(1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [count]);

	return <>{'.'.repeat(count)}</>;
};
export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({
	selfStream,
	peerStreams,
	selectedRoom,
	blockPeerAudioController,
	blockPeerVideoController,
}) => {
	const [columnCount, setColumnCount] = useState<number>(100);

	return (
		<div className='peerStreams'>
			{/* map over peer streams */}
			{selectedRoom && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame
					headerText={selectedRoom.roomName + ' AUDIO / VIDEO'}
					body={() => (
						<>
							<div className='video-column-count'>
								{'Width: ' + columnCount + '%'}
								<input
									type={'range'}
									className='text-input terminal-input'
									value={columnCount}
									onChange={(e) => {
										if (Number(e.target.value) > 100) {
											setColumnCount(100);
										} else {
											setColumnCount(Number(e.target.value));
										}
									}}
								/>
								{/* <Dropdown
									options={options}
									onChange={(e) => {
										setColumnCount(Number(e.value));
									}}
									value={options[columnCount - 1]}
									placeholder='Select the number of columns'
								/> */}
							</div>
							<div className='streams'>
								{selfStream && (
									<div className='peerStream' style={{ width: `${columnCount}vw` }}>
										<div className='streamHeader'>
											<div className='overflow-text'>{'YOU'}</div>
										</div>
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
																	<div key={index} className='peerStream' style={{ width: `${columnCount}vw` }}>
																		<>
																			<div className='streamHeader'>
																				<div className='overflow-text'>{peerid}</div>
																				<input
																					type='button'
																					className='button'
																					onClick={() => {
																						blockPeerVideoController(peerid, true);
																						blockPeerAudioController(peerid, true);
																					}}
																					value='X'
																				/>
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
										<>
											Waiting for streams
											<RepeatingPeriod />
										</>
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
