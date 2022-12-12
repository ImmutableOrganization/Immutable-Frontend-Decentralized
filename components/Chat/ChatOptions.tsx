import { useMediaQuery } from 'react-responsive';
import { Frame } from '../Frame';

interface ChatOptionsProps {
	dateHidden: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setDateHidden: any;
	timeHidden: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setTimeHidden: any;
	shortenSocketId: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setShortenSocketId: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	enableChannelWhiteListRef: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setEnableChannelWhiteListState: any;
	separateChatAndChannels: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setSeparateChatAndChannels: any;
	openExplanationModal: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setOpenExplanationModal: any;
}

import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChatOptions: React.FunctionComponent<ChatOptionsProps> = ({
	dateHidden,
	setDateHidden,
	timeHidden,
	setTimeHidden,
	shortenSocketId,
	setShortenSocketId,
	enableChannelWhiteListRef,
	setEnableChannelWhiteListState,
	separateChatAndChannels,
	setSeparateChatAndChannels,
}) => {
	const smallScreen = useMediaQuery({ query: '(max-width: 659px)' });

	const chatOptionsBody = () => {
		return (
			<>
				<div className='chat-options'>
					{/* <u>MESSAGE OPTIONS:</u> */}
					<label onClick={() => setDateHidden(!dateHidden)}>
						HIDE DATE
						<FontAwesomeIcon icon={dateHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
					</label>
					<label onClick={() => setTimeHidden(!timeHidden)}>
						HIDE TIME
						<FontAwesomeIcon icon={timeHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
					</label>
					<label onClick={() => setShortenSocketId(!shortenSocketId)}>
						SHORTEN CONNECTION ID
						<FontAwesomeIcon icon={shortenSocketId ? faCheckSquare : faSquare}></FontAwesomeIcon>
					</label>
					<label onClick={() => setEnableChannelWhiteListState(!enableChannelWhiteListRef.current)}>
						CHANNEL WHITELIST
						<FontAwesomeIcon icon={enableChannelWhiteListRef.current ? faCheckSquare : faSquare}></FontAwesomeIcon>
					</label>
					{!smallScreen && (
						<label onClick={() => setSeparateChatAndChannels(!separateChatAndChannels)}>
							SEPARATE CHAT AND CHANNELS
							<FontAwesomeIcon icon={separateChatAndChannels ? faCheckSquare : faSquare}></FontAwesomeIcon>
						</label>
					)}
				</div>
			</>
		);
	};

	return <Frame className='chat-options' body={chatOptionsBody} headerText='OPTIONS' />;
};
