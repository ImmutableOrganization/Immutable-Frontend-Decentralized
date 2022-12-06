import { faBed } from '@fortawesome/free-solid-svg-icons';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';
import { BaseRoomConfig, joinRoom, Room } from 'trystero';
import { MessageCallback, useRooms } from '../../pages/decentralizedchat';

interface VideoComponentProps {}
export interface RoomWrapper {
	roomName: string;
	_id: string;
	room: Room | undefined;
}

export const VideoComponent: React.FunctionComponent<VideoComponentProps> = ({}) => {
	return (
		<div className='videoComponent'>
			<div id='videos'></div>
		</div>
	);
};
