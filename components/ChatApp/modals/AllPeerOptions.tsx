import { Dispatch, SetStateAction } from 'react';
import { Frame } from '../../Frame';
import { PeerStream } from '../hooks/useRooms';

interface AllPeerOptionsModalProps {
	blockPeerTextController: (peerId: string, block: boolean) => void;
	blockPeerAudioController: (peerId: string, block: boolean) => void;
	blockPeerVideoController: (peerId: string, block: boolean) => void;
	peerStreams: PeerStream | undefined;
	setShowAllPeerOptions: Dispatch<SetStateAction<boolean>>;
}

export const AllPeerOptionsModal: React.FC<AllPeerOptionsModalProps> = ({
	blockPeerTextController,
	peerStreams,
	blockPeerAudioController,
	blockPeerVideoController,
	setShowAllPeerOptions,
}) => {
	return (
		<Frame
			headerText='Options'
			className='message-options'
			body={() => (
				<div className='options'>
					{peerStreams ? (
						<>
							{Object.entries(peerStreams).map(([peerid, _stream]) => {
								return (
									<div className='' key={peerid}>
										{peerid}:
										<input
											type='button'
											value={_stream.textBlocked && _stream.audioBlocked && _stream.videoBlocked ? 'UNBLOCK' : 'BLOCK'}
											className='button'
											onClick={() => {
												blockPeerTextController(peerid, !_stream.textBlocked);
												blockPeerAudioController(peerid, !_stream.audioBlocked);
												blockPeerVideoController(peerid, !_stream.videoBlocked);
											}}
										></input>
									</div>
								);
							})}
						</>
					) : (
						<>No streams available.</>
					)}
					<input type='button' className='button' value='CLOSE' onClick={() => setShowAllPeerOptions(false)} />
				</div>
			)}
		/>
	);
};
