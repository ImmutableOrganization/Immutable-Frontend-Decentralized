import React, { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Channel, Message } from '../pages/chat';
import { ChannelInfo, PopupContext } from '../pages/_app';
import { whatChannelMessageRoutesTo, whiteListCheck } from '../utils/chat/chatUtils';

export const useSocket = (): {
	setUserWantsSocketOn: Dispatch<SetStateAction<boolean>>;
	selectChannel: (_name: string) => Promise<void>;
	getSocketId: () => string;
	enableChannelWhiteList: boolean;
	setEnableChannelWhiteList: Dispatch<SetStateAction<boolean>>;
	channelInfo: {
		[channel_name: string]: ChannelInfo;
	};
	userCounter: number | undefined;
	sendChatMessage: (channel_name: string, message: string) => Promise<void>;
	joinRoom: (channel_name: string) => Promise<void>;
	disconnectSocket: () => void;
	leaveRoom: (e: any, channel_name: string) => Promise<void>;
	channelsRef: MutableRefObject<Channel[]>;
	socketConnected: boolean;
	selectedChannel: number | undefined;
} => {
	const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(undefined);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [userCounter, setUserCounter] = useState<number>();
	const [selectedChannel, setSelectedChannel] = useState<number>();
	const [channelInfo, setChannelInfo] = useState<{ [channel_name: string]: ChannelInfo }>({});
	const [userWantsSocketOn, setUserWantsSocketOn] = useState<boolean>(true);
	const [enableChannelWhiteList, setEnableChannelWhiteList] = useState<boolean>(false);
	const [channels, setChannels] = useState<Channel[]>([]);
	const [socketInitialized, setSocketInitialized] = useState<boolean>(false);
	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

	const channelsRef = React.useRef(channels);
	const setChannelsRef = (data: Channel[]) => {
		channelsRef.current = data;
		setChannels(data);
	};

	useEffect(() => {
		if (!socketConnected) {
			setToastMessage(`Connecting to chat server...`);
			setOpenToast(true);
			setToastType('failure');
		} else {
			setToastMessage(`Connected to chat server!`);
			setOpenToast(true);
			setToastType('success');
		}
	}, [socketConnected]);

	const sendChatMessage = async (channel_name: string, message: string) => {
		if (socket) {
			socket.emit(channel_name, message);
		}
	};

	const joinRoom = async (channel_name: string) => {
		if (socket) {
			socket.emit('join_room', channel_name);
		}
	};
	const leaveRoom = async (e: any, channel_name: string) => {
		e.stopPropagation();

		if (socket) {
			socket.emit('leave_room', channel_name);
			for (let i = 0; i < channelsRef.current.length; i++) {
				if (channelsRef.current[i].channel_name === channel_name) {
					setChannelsRef(channelsRef.current.slice(0, i).concat(channelsRef.current.slice(i + 1)));
					break;
				}
			}
		}
	};

	const selectChannel = async (_name: string) => {
		if (!socket) {
			return;
		}
		setChannelInfo({ ...channelInfo, [_name]: { has_unread_messages: false, user_count: 0 } });

		const channel_match = channelsRef.current.findIndex((channel: Channel) => channel.channel_name === _name);
		if (channel_match !== -1) {
			setSelectedChannel(channel_match);
		} else {
			const copy = [...channelsRef.current];

			copy.push({ channel_name: _name, messages: [] });
			setChannelsRef(copy);
			socket.emit('join_room', _name);
		}
	};

	// const refetchUserCount = async () => {
	// if (socket) {
	// socket.emit('users_count', '');
	// }
	// }

	const disconnectSocket = () => {
		if (socket) {
			socket.disconnect();
		}
		setSocket(undefined);
		setSocketInitialized(false);
		setUserWantsSocketOn(false);
	};

	useEffect(() => {
		if (socket) {
			if (socket.connected) {
				setSocketConnected(true);
				setSocketInitialized(true);
			} else {
				setSocketConnected(false);
			}
		}
	}, [socket]);

	let socketLoading = false;
	useEffect(() => {
		if (!socketInitialized && userWantsSocketOn) {
			if (!socket) {
				if (!socketLoading) {
					const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'localhost:3000');
					socketLoading = true;
					setSocket(newSocket);
				}
			} else {
				socket.on('disconnect', () => {
					setSocketConnected(false);
				});

				socket.on('connect', () => {
					setSocketConnected(true);
					if (socket) {
						socket.emit('join_room', 'general');
					}
				});

				socket.on('a user connected', () => {
					console.log('a user connected');
				});

				socket.on('disconnect', () => {
					console.log('disconnect');
				});

				socket.onAny((eventName: string, _message: string) => {
					if (eventName === 'users_count') {
						setUserCounter(Number(_message));
					} else if (eventName === 'user_count') {
						const message = JSON.parse(_message);
						setChannelInfo({ ...channelInfo, [message.channel_name]: { ...channelInfo[message.channel_name], user_count: message.user_count } });
					} else if (eventName === 'join_room') {
					} else {
						receiveChatMessage(eventName, _message, socket.id);
					}
				});
			}
		}
	}, [socket, userWantsSocketOn, socketInitialized]);

	const getSocketId = (): string => {
		if (socket) {
			return socket.id;
		} else {
			return '';
		}
	};

	const receiveChatMessage = async (_eventName: string, _message: string, _sender: string) => {
		const match = whatChannelMessageRoutesTo(_eventName, channelsRef.current);

		if (!whiteListCheck(match, enableChannelWhiteList)) {
			return;
		}

		if (selectedChannel !== undefined && channelsRef.current[selectedChannel] && _eventName !== channelsRef.current[selectedChannel].channel_name) {
			setChannelInfo({ ...channelInfo, [_eventName]: { has_unread_messages: true, user_count: 0 } });
		}

		const parsedMessage: Message = JSON.parse(_message);

		const message: Message = { sender: parsedMessage.sender, message: parsedMessage.message, timestamp: parsedMessage.timestamp };

		if (match === -1) {
			// need to add channel
			const new_channel: Channel = { channel_name: _eventName, messages: [message] };
			if (channelsRef.current.length <= 0) {
				setChannelsRef([new_channel]);
				setSelectedChannel(0);
			} else {
				setChannelsRef([...channelsRef.current, new_channel]);
			}
		} else {
			const copy = [...channelsRef.current];
			copy[match].messages.push(message);
			setChannelsRef(copy);
		}
	};

	return {
		setUserWantsSocketOn,
		channelsRef,
		getSocketId,
		enableChannelWhiteList,
		selectChannel,
		setEnableChannelWhiteList,
		channelInfo,
		userCounter,
		sendChatMessage,
		joinRoom,
		disconnectSocket,
		socketConnected,
		leaveRoom,
		selectedChannel,
	};
};
