import * as trystero from 'trystero';

export namespace Room {
	export interface RoomWrapper {
		roomName: string;
		password: string;
		allowStreams: boolean;
		room: trystero.Room | undefined;
	}

	export interface SavedRoom {
		roomName: string;
		password: string;
	}

	export interface Peer {
		mediaStream: MediaStream | undefined;
		videoBlocked: boolean;
		audioBlocked: boolean;
		textBlocked: boolean;
	}

	export interface PeerStream {
		[peerid: string]: Peer;
	}

	export const emptyRoom: RoomWrapper = {
		roomName: '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e',
		room: undefined,
		password: '',
		allowStreams: false,
	};
}
