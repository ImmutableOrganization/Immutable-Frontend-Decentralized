import { Dispatch, SetStateAction } from 'react';
import { Frame } from '../../Frame';
import { Room } from '../rooms/room';

interface AllPeerOptionsModalProps {
	blockPeerTextController: (peerId: string, block: boolean) => void;
	blockPeerAudioController: (peerId: string, block: boolean) => void;
	blockPeerVideoController: (peerId: string, block: boolean) => void;
	peerStreams: Room.PeerStream | undefined;
	selectedRoom: Room.RoomWrapper;
	setShowAllPeerOptions: Dispatch<SetStateAction<boolean>>;
}

export const AllPeerOptionsModal: React.FC<AllPeerOptionsModalProps> = ({
	blockPeerTextController,
	peerStreams,
	selectedRoom,
	blockPeerAudioController,
	blockPeerVideoController,
	setShowAllPeerOptions,
}) => {
	// selectedRoom.room?.getPeers();
	return (
		<Frame
			headerText='Options'
			className='message-options'
			body={() => (
				<div className='options'>
					{selectedRoom.room && selectedRoom.room?.getPeers().length > 0 ? (
						<>
							{selectedRoom.room?.getPeers().map((peer) => {
								return (
									<div className='' key={peer}>
										{peer}:
										<input
											type='button'
											value={
												peerStreams?.[peer]?.textBlocked && peerStreams?.[peer]?.audioBlocked && peerStreams?.[peer]?.videoBlocked
													? 'UNBLOCK'
													: 'BLOCK'
											}
											className='button'
											onClick={() => {
												blockPeerTextController(peer, !peerStreams?.[peer]?.textBlocked);
												blockPeerAudioController(peer, !peerStreams?.[peer]?.audioBlocked);
												blockPeerVideoController(peer, !peerStreams?.[peer]?.videoBlocked);
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
