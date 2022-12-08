import React from 'react';
import { useState } from 'react';
import { Frame } from '../Frame';
import { RoomWrapper } from './RoomComponent';

interface MessageComponentProps {
	selectedRoom: RoomWrapper;
	messages: React.MutableRefObject<MessageList | undefined>;
	addMessage: (_message: Message, _roomId: string, isLocal: boolean) => void;
}

export interface Message {
	message: string;
	timestamp: number;
}

export interface MessageList {
	[roomId: string]: Message[];
}

// index in Messages is room id
export const useMessages = (_sendMessageCallback: any) => {
	const [messages, setMessages] = useState<MessageList>();

	// we do a ref like this, and the messageHook should use the ref instead of state.
	const messagesRef = React.useRef(messages);
	const setMessagesRef = (data: MessageList) => {
		messagesRef.current = data;
		setMessages(data);
	};

	const addMessage = (_message: Message, _roomName: string, isLocal: boolean) => {
		if (_roomName == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}
		if (isLocal) {
			_sendMessageCallback(_message, _roomName);
		}

		console.log('addMessage: _message = ', _message, ' _roomName = ', _roomName, ' isLocal = ', isLocal);
		if (messagesRef.current) {
			console.log('messages');
			if (messagesRef.current[_roomName]) {
				console.log('messages[_roomName] = ', messagesRef.current[_roomName]);

				setMessagesRef({
					...messages,
					[_roomName]: [...messagesRef.current[_roomName], { message: _message.message, timestamp: _message.timestamp }],
				});
			} else {
				console.log('no for room');
				setMessagesRef({ ...messages, [_roomName]: [{ message: _message.message, timestamp: _message.timestamp }] });
			}
		} else {
			console.log('no messages');

			setMessagesRef({ [_roomName]: [{ message: _message.message, timestamp: _message.timestamp }] });
		}
	};

	return { messagesRef, addMessage };
};

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({ selectedRoom, messages, addMessage }) => {
	const [message, setMessage] = useState<string>('');

	const messageList = () => {
		return (
			<>
				{messages.current ? (
					<>
						{messages.current[selectedRoom.roomName] ? (
							<div className='messages socketMessages'>
								{messages.current[selectedRoom.roomName].map((message: Message) => (
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
					{selectedRoom && selectedRoom.roomName != '' ? (
						<>
							NAME: {selectedRoom.roomName}
							{messageList()}
							<input type={'text'} className='text-input terminal-input' value={message} onChange={(e) => setMessage(e.target.value)} />
							<input
								type='button'
								className='button'
								value='Send Message'
								onClick={() => addMessage({ message: message, timestamp: Date.now() }, selectedRoom.roomName, true)}
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
