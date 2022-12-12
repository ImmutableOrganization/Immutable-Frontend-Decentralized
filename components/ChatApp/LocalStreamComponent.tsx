import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { selfId } from 'trystero/torrent';
import { Frame } from '../Frame';

interface LocalStreamComponentProps {
	setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;
	localStream: MediaStream | undefined;
}

export const LocalStreamComponent: React.FunctionComponent<LocalStreamComponentProps> = ({ localStream, setLocalStream }) => {
	const [useAudio, setUseAudio] = useState<boolean>(true);
	const [useVideo, setUseVideo] = useState<boolean>(true);
	const [hideLocalStream, setHideLocalStream] = useState<boolean>(true);

	const fetchStream = async () => {
		const selfStream = await navigator.mediaDevices.getUserMedia({
			audio: useAudio,
			video: useVideo,
		});
		setLocalStream(selfStream);
	};

	const streamConnectionHandler = () => {
		if (!localStream) {
			fetchStream();
		} else {
			disconnectStream();
		}
	};

	const disconnectStream = () => {
		if (localStream) {
			localStream.getTracks().forEach((track) => track.stop());
		}
		setLocalStream(undefined);
	};

	return (
		<div className='localStream'>
			<Frame
				headerText={'User Options'}
				body={() => (
					<div className='options'>
						<>Your id: {selfId}</>
						<br></br>
						<div className='client-options'>
							<label
								className={'checkbox-item ' + (localStream ? 'disabled' : '')}
								onClick={() => {
									if (localStream != undefined) return;
									setUseAudio(!useAudio);
								}}
							>
								Audio
								<FontAwesomeIcon icon={useAudio ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>

							<input
								type='button'
								className='button'
								value={`${!localStream ? 'connect' : 'disconnect'}`}
								onClick={() => streamConnectionHandler()}
							/>
							<label
								className={'checkbox-item ' + (localStream ? 'disabled' : '')}
								onClick={() => {
									if (localStream != undefined) return;
									setUseVideo(!useVideo);
								}}
							>
								Video
								<FontAwesomeIcon icon={useVideo ? faCheckSquare : faSquare}></FontAwesomeIcon>
							</label>
							{localStream && hideLocalStream && (
								<>
									<input type='button' className='button' value='show' onClick={() => setHideLocalStream(false)} />
								</>
							)}
						</div>
						{localStream && !hideLocalStream && (
							<>
								<input type='button' className='button' value='hide' onClick={() => setHideLocalStream(true)} />
								<div className='peerStream'>
									<ReactPlayer width={'100%'} height={'100%'} playing={true} controls={true} url={localStream} />
								</div>
							</>
						)}
					</div>
				)}
			/>
		</div>
	);
};
