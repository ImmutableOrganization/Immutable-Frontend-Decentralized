import '../styles/App.scss';
import '../styles/Boards.scss';
import '../styles/Chat.scss';
import '../styles/four_o_four.scss';
import '../styles/Header.scss';
import '../styles/Modals.scss';
import '../styles/Nft.scss';
import '../styles/Toast.scss';
import '../styles/Token.scss';
import '../styles/scroll.scss';

import type { AppProps } from 'next/app';
import { chain, Connector, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import React, { useState } from 'react';
import { configureChains, createClient } from 'wagmi';
import { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import { FormError } from '../components/Modals/Error';
import { Loading } from '../components/Modals/Loading';
import { Toast } from '../components/Toast/Toast';
import { useSocket } from '../hooks/useSocket';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export interface ErrorProps {
	formError: FormError;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setFormError: any;
}
export interface LoadingProps {
	isLoading: boolean;
}

const { chains, provider } = configureChains(
	[chain.arbitrum],
	[alchemyProvider({ apiKey: 'E4mZVO8Fc9ZjEIisFEZzQfRW-3iI3K8M', priority: 1 }), publicProvider({ priority: 2 })],
);

const client = createClient({
	autoConnect: true,
	provider,
	connectors: [new InjectedConnector({ chains })],
});

interface PopupContextProps {
	formError: FormError;
	setFormError: React.Dispatch<React.SetStateAction<FormError>>;
	loading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	openToast: boolean;
	setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
	toastMessage: string;
	setToastMessage: React.Dispatch<React.SetStateAction<string>>;
	toastType: string;
	setToastType: React.Dispatch<React.SetStateAction<string>>;
}

interface FormError {
	open: boolean;
	message: string;
}
const defaultError = { open: false, message: '' };

export const PopupContext = React.createContext<PopupContextProps>({
	formError: defaultError,
	loading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setFormError: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsLoading: () => {},
	openToast: false,
	toastMessage: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setToastMessage: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setOpenToast: () => {},
	toastType: 'loading',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setToastType: () => {},
});

PopupContext.displayName = 'PopupContext';

export interface Account {
	address?: string;
	connector?: Connector;
	isConnecting: boolean;
	isReconnecting: boolean;
	isConnected: boolean;
	isDisconnected: boolean;
	status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected';
}

export const defaultAccount: Account = {
	isConnecting: false,
	isReconnecting: false,
	isConnected: false,
	isDisconnected: false,
	status: 'disconnected',
};

// used in dict
export interface ChannelInfo {
	has_unread_messages: boolean;
	user_count: number;
}

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [formError, setFormError] = useState<FormError>(defaultError);
	const [loading, setIsLoading] = useState<boolean>(false);
	const [toastMessage, setToastMessage] = useState<string>('');
	const [openToast, setOpenToast] = useState<boolean>(false);
	const [toastType, setToastType] = useState<string>('loading');
	// const {
	// 	getSocketId,
	// 	setUserWantsSocketOn,
	// 	disconnectSocket,
	// 	userCounter,
	// 	channelsRef,
	// 	socketConnected,
	// 	selectChannel,
	// 	setEnableChannelWhiteList,
	// 	enableChannelWhiteList,
	// 	channelInfo,
	// 	sendChatMessage,
	// 	joinRoom,
	// 	leaveRoom,
	// 	selectedChannel,
	// } = useSocket();

	return (
		<>
			<GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID} />
			<PopupContext.Provider
				value={{ formError, loading, setFormError, setIsLoading, openToast, toastMessage, setToastMessage, setOpenToast, toastType, setToastType }}
			>
				<WagmiConfig client={client}>
					<Header />
					<FormError formError={formError} setFormError={setFormError} />
					<Loading isLoading={loading} />
					<Toast openToast={openToast} message={toastMessage} type={toastType} setOpenToast={setOpenToast} />
					<div key={router.asPath} className={'top-margin ' + (formError.open || loading ? 'blurred' : '')}>
						<Component
							{...pageProps}
							// for chat
							// socketId={getSocketId()}
							// setUserWantsSocketOn={setUserWantsSocketOn}
							// disconnectSocket={disconnectSocket}
							// userCounter={userCounter}
							// channelsRef={channelsRef}
							// socketConnected={socketConnected}
							// selectChannel={selectChannel}
							// setEnableChannelWhiteList={setEnableChannelWhiteList}
							// enableChannelWhiteList={enableChannelWhiteList}
							// channelInfo={channelInfo}
							// sendChatMessage={sendChatMessage}
							// joinRoom={joinRoom}
							// leaveRoom={leaveRoom}
							// selectedChannel={selectedChannel}
						/>
					</div>
				</WagmiConfig>
			</PopupContext.Provider>
		</>
	);
}

export default MyApp;
