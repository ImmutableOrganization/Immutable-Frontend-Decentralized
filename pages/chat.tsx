import { NextPage } from 'next';
import { KeyboardEvent, useContext, useState } from 'react';
import Head from 'next/head';
import { ChatExplanationModal } from '../components/Chat/ChatExplanation';
import { ChatInfo } from '../components/Chat/ChatInfo';
import { ChatOptions } from '../components/Chat/ChatOptions';
import { JoinChannel } from '../components/Chat/JoinChannel';

import { useMediaQuery } from 'react-responsive';
import { whatChannelMessageRoutesTo } from '../utils/chat/chatUtils';
import { PopupContext } from './_app';
import { company_name } from '../utils/globals';
import { Frame } from '../components/Frame';
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

	const handleAddRoomKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			addChannel();
		}
	};

	const addChannel = async () => {
		if (channelName) {
			// check if channel exists
			const match = whatChannelMessageRoutesTo(channelName, channelsRef.current);
			if (match !== -1) {
				return;
			}
			joinRoom(channelName);
		}
	};

	const preSendMessage = async () => {
		if (typeof selectedChannel !== 'undefined' && channelsRef.current[selectedChannel]) {
			if (message !== '') {
				sendChatMessage(channelsRef.current[selectedChannel].channel_name, message);
			}
		} else {
			setToastMessage('Must select a channel to chat!');
			setOpenToast(true);
			setToastType('failure');
		}
		setMessage('');
	};

	const smallScreen = useMediaQuery({ query: '(max-width: 659px)' });
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

					{channelsRef.current.length > 0 && socketConnected && (
						<>
							<div className='chat-footer'>
								<ChatOptions
									dateHidden={dateHidden}
									setDateHidden={setDateHidden}
									timeHidden={timeHidden}
									setTimeHidden={setTimeHidden}
									shortenSocketId={shortenSocketId}
									setShortenSocketId={setShortenSocketId}
									enableChannelWhiteListRef={enableChannelWhiteList}
									setEnableChannelWhiteListState={setEnableChannelWhiteList}
									separateChatAndChannels={separateChatAndChannels}
									setSeparateChatAndChannels={setSeparateChatAndChannels}
									openExplanationModal={openExplanationModal}
									setOpenExplanationModal={setOpenExplanationModal}
								/>
								<JoinChannel
									addChannel={addChannel}
									channelName={channelName}
									setChannelName={setChannelName}
									handleAddRoomKeyPress={handleAddRoomKeyPress}
								/>
							</div>
							<div className='frame messages'>
								<div className='frameHeader terminalHeader'>
									<h2>Channels</h2>
								</div>
								<div className='terminal' style={{ flexDirection: separateChatAndChannels ? 'column' : 'row' }}>
									<div
										className={'frame chat-channels ' + (!smallScreen && !separateChatAndChannels && 'onechannel')}
										style={{ width: '100%', height: separateChatAndChannels ? '25vh' : '50vh' }}
									>
										{channelsRef.current.map((_channel: Channel, index: number) => (
											<div
												key={index}
												className={
													'button with-x ' +
													`${
														selectedChannel !== undefined &&
														channelsRef.current[selectedChannel] &&
														_channel.channel_name === channelsRef.current[selectedChannel].channel_name &&
														'selected'
													}`
												}
												onClick={() => selectChannel(_channel.channel_name)}
											>
												<div className='channel-title' key={_channel.channel_name}>
													{_channel.channel_name}
												</div>
												<span>
													{channelInfo[_channel.channel_name] &&
														channelInfo[_channel.channel_name].has_unread_messages &&
														index !== selectedChannel && (
															<button type='button' className='button'>
																{' '}
																<img
																	src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/triangle-exclamation-solid.svg'
																	className='icon'
																/>{' '}
															</button>
														)}
													<button
														type='button'
														className='button leaveChannel'
														onClick={(event) => leaveRoom(event, _channel.channel_name)}
													>
														<img
															src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/xmark-solid.svg'
															className='icon'
														/>
													</button>
												</span>
											</div>
										))}
									</div>
									<div className='chat-pane'>
										{selectedChannel === undefined ? (
											<div>You must select a channel to chat.</div>
										) : (
											<>
												{channelsRef.current.map((_channel: Channel, index: number) => (
													<div key={index}>
														{index === selectedChannel && (
															<div key={index}>
																<div className='frameHeader terminalHeader'>
																	<h2>{_channel.channel_name}</h2>
																</div>
																<div className='socketMessages'>
																	{_channel.messages.slice(0).map((_messages: Message, _msgIndex: number) => (
																		<div key={`${index}:${_msgIndex}`}>
																			{_messages.sender !== 'Server' ? (
																				<u onClick={() => selectChannel(_messages.sender)}>
																					{!shortenSocketId ? _messages.sender : _messages.sender.substring(0, 8)}
																				</u>
																			) : (
																				<>{!shortenSocketId ? _messages.sender : _messages.sender.substring(0, 8)}</>
																			)}
																			@{!dateHidden ? new Date(_messages.timestamp).toLocaleDateString() : ''}
																			{!timeHidden ? new Date(_messages.timestamp).toLocaleTimeString() : ''}
																			{'>'} <span className='message-content'>{_messages.message}</span>
																		</div>
																	))}
																</div>
															</div>
														)}
													</div>
												))}
												<div className='send-message-form'>
													<input
														className='text_input terminal-input'
														type='text'
														onKeyDown={(e) => handleKeypress(e)}
														placeholder='Enter message...'
														value={message}
														onChange={(e) => setMessage(e.target.value)}
													/>
													<input className='button no-padding' type='button' onClick={() => preSendMessage()} value='<' />
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</>
			</div>
		</>
	);
};
export default Chat;
