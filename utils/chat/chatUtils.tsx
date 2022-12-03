import { Channel } from '../../pages/chat';

// if we dont have this channel in our and whitelist is on then we dont add it.
export const whiteListCheck = (match: number, enableChannelWhiteList: boolean): boolean => {
	if (match === -1 && enableChannelWhiteList) {
		return false;
	} else {
		return true;
	}
};

export const whatChannelMessageRoutesTo = (eventName: string, channels: Channel[]): number => {
	let match: number = -1;
	for (let i = 0; i < channels.length; i++) {
		if (channels[i].channel_name === eventName) {
			match = i;
			return match;
		}
	}
	return match;
};
