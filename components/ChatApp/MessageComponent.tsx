import { useState } from 'react';
import { Frame } from '../Frame';
import { RoomWrapper } from './RoomComponent';

interface MessageComponentProps {
	selectedRoom: RoomWrapper;
	messages: any;
	addMessage: (_message: Message, _roomId: string, isLocal: boolean) => void;
}

export interface Message {
	message: string;
	timestamp: number;
}

interface MessageList {
	[roomId: string]: Message[];
}

// index in Messages is room id
export const useMessages = (_sendMessageCallback: any) => {
	const [messages, setMessages] = useState<MessageList>();

	const addMessage = (_message: Message, _roomId: string, isLocal: boolean) => {
		if (_roomId == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}
		if (isLocal) {
			_sendMessageCallback(_message, _roomId);
		}
		if (messages) {
			if (messages[_roomId]) {
				setMessages({
					...messages,
					[_roomId]: [...messages[_roomId], { message: _message.message, timestamp: _message.timestamp }],
				});
			} else {
				setMessages({ ...messages, [_roomId]: [{ message: _message.message, timestamp: _message.timestamp }] });
			}
		} else {
			setMessages({ [_roomId]: [{ message: _message.message, timestamp: _message.timestamp }] });
		}
	};

	return { messages, addMessage };
};

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({ selectedRoom, messages, addMessage }) => {
	const [message, setMessage] = useState<string>('');

	const messageList = () => {
		return (
			<>
				{messages ? (
					<>
						{messages[selectedRoom._id] ? (
							<div className='messages socketMessages'>
								{messages[selectedRoom._id].map((message: Message) => (
									<div className='socketMessage'>
										{new Date(message.timestamp).toLocaleDateString() + ' ' + new Date(message.timestamp).toLocaleTimeString()}:{' '}
										{message.message}
									</div>
								))}
							</div>
						) : (
							<p>no messages</p>
						)}
					</>
				) : (
					<p>no messages</p>
				)}
			</>
		);
	};

	return (
		<Frame
			className='MessageComponent'
			headerText={'Messages'}
			body={() => (
				<>
					{selectedRoom && selectedRoom._id != '' ? (
						<>
							{selectedRoom._id}: NAME: {selectedRoom.roomName}
							{messageList()}
							<input type={'text'} className='text-input terminal-input' value={message} onChange={(e) => setMessage(e.target.value)} />
							<input
								type='button'
								className='button'
								value='Send Message'
								onClick={() => addMessage({ message: message, timestamp: Date.now() }, selectedRoom._id, true)}
							/>
						</>
					) : (
						<div>
							<div>No room selected</div>
						</div>
					)}
				</>
			)}
		/>
	);
};
