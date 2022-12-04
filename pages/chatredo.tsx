import { NextPage } from 'next';
import { KeyboardEvent, useContext, useState } from 'react';
import Head from 'next/head';
import { ChatExplanationModal } from '../components/Chat/ChatExplanation';
import { ChatInfo } from '../components/Chat/ChatInfo';
import { PopupContext } from './_app';
import { company_name } from '../utils/globals';
import { Frame } from '../components/Frame';
import { BaseLink } from '../components/BaseLink';
export interface Message {
	sender: string;
	timestamp: number;
	message: string;
}

export interface Channel {
	channel_name: string;
	messages: Message[];
}

interface ChatProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setUserWantsSocketOn: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	disconnectSocket: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	userCounter: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	channelsRef: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	socketConnected: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selectChannel: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setEnableChannelWhiteList: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	enableChannelWhiteList: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	channelInfo: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sendChatMessage: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	joinRoom: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	leaveRoom: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selectedChannel: any;
	socketId: string;
}

const Chat: NextPage<ChatProps> = ({
	socketId,
	setUserWantsSocketOn,
	disconnectSocket,
	userCounter,
	channelsRef,
	socketConnected,
	selectChannel,
	setEnableChannelWhiteList,
	enableChannelWhiteList,
	channelInfo,
	sendChatMessage,
	joinRoom,
	leaveRoom,
	selectedChannel,
}) => {
	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);
	const [separateChatAndChannels, setSeparateChatAndChannels] = useState<boolean>(true);
	const [message, setMessage] = useState<string>('');
	const [channelName, setChannelName] = useState<string>('');
	const [openExplanationModal, setOpenExplanationModal] = useState<boolean>(false);
	const [dateHidden, setDateHidden] = useState<boolean>(true);
	const [timeHidden, setTimeHidden] = useState<boolean>(true);
	const [shortenSocketId, setShortenSocketId] = useState<boolean>(true);

	const handleKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			preSendMessage();
		}
	};

	const communityBody = () => {
		return (
			<div className='socials'>
				<a className='frameHeader social-icon-container twitter' href='https://twitter.com/ImmutableOrg' target='_blank' rel='noopener noreferrer'>
					<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/twitter-brands.svg' className='icon' />
					<h1>Twitter</h1>
				</a>
			</div>
		);
	};
	const discordBody = () => {
		return (
			<div className='socials'>
				<a className='frameHeader social-icon-container discord' href='https://discord.gg/kCsQUJR7U4' target='_blank' rel='noopener noreferrer'>
					<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/discord.svg' className='icon' />
					<h1>Discord</h1>
				</a>
			</div>
		);
	};
	return (
		<>
			<Head>
				<title>{company_name} CHAT</title>
			</Head>
			<div className={'chat ' + (openExplanationModal ? 'blurred' : '')}>
				<>
					<ChatInfo
						socketId={socketId}
						setUserWantsSocketOn={setUserWantsSocketOn}
						disconnectSocket={disconnectSocket}
						socketConnected={socketConnected}
						userCounter={userCounter}
					/>
					<ChatExplanationModal />
					<Frame
						className={'chat-info'}
						headerText={'Twitter'}
						body={() => {
							return communityBody();
						}}
					/>
					<Frame
						className='chat-info'
						headerText={'Discord'}
						body={() => {
							return discordBody();
						}}
					/>
					<Frame
						className='chat-info'
						headerText={'CHAT APP'}
						body={() => (
							<BaseLink href='/decentralizedchat' passHref={true} as={undefined}>
								<a className='button new-post open-app'>OPEN APP</a>
							</BaseLink>
						)}
					/>
				</>
			</div>
		</>
	);
};
export default Chat;
