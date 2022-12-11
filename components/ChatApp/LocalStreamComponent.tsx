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
				headerText={'Stream Controls'}
				body={() => (
					<>
						<>Your id: {selfId}</>
						<br></br>
						<label>
							{/* {`audio: ${useAudio ? 'on' : 'off'}`} */}
							{`audio: `}
							<input disabled={localStream != undefined} type='checkbox' checked={useAudio} onChange={(e) => setUseAudio(!useAudio)} />
						</label>
						<label>
							{/* {`video: ${useVideo ? 'on' : 'off'}`} */}
							{`video: `}
							<input disabled={localStream != undefined} type='checkbox' checked={useVideo} onChange={(e) => setUseVideo(!useVideo)} />
						</label>
						<input
							type='button'
							className='button'
							value={`${!localStream ? 'connect' : 'disconnect'} stream`}
							onClick={() => streamConnectionHandler()}
						/>

						{/* local stream preview */}
						{localStream && !hideLocalStream ? (
							<>
								<input type='button' className='button' value='hide local stream' onClick={() => setHideLocalStream(true)} />
								<div>
									<ReactPlayer width={'100%'} playing={true} controls={true} url={localStream} />
								</div>
							</>
						) : localStream && hideLocalStream ? (
							<>
								<input type='button' className='button' value='show local stream' onClick={() => setHideLocalStream(false)} />
							</>
						) : null}
					</>
				)}
			/>
		</div>
	);
};
