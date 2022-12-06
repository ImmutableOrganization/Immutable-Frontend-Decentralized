import { useState } from 'react';
import { RoomWrapper } from './RoomComponent';

interface MessageComponentProps {
	selectedRoom: RoomWrapper;
	messages: any;
	addMessage: (_message: Message, _roomId: string) => void;
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

	const addMessage = (_message: Message, _roomId: string) => {
		if (_roomId == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}
		_sendMessageCallback(_message, _roomId);

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
							<div className='messages'>
								{messages[selectedRoom._id].map((message: Message) => (
									<>
										<ul key={message.timestamp}>
											{selectedRoom.roomName} : {selectedRoom._id}
											<li>{message.message}</li>
											<li>{message.timestamp}</li>
										</ul>
									</>
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

	const messageForm = () => {
		return (
			<>
				<input type={'text'} value={message} onChange={(e) => setMessage(e.target.value)} />
				<input
					type='button'
					className='button'
					value='Send Message'
					onClick={() => addMessage({ message: 'test passphrase', timestamp: Date.now() }, selectedRoom._id)}
				/>
			</>
		);
	};

	return (
		<div className='MessageComponent'>
			<h1>MessageComponent</h1>
			{selectedRoom && selectedRoom._id != '' ? (
				<>
					{selectedRoom._id} : NAME: {selectedRoom.roomName}
					{messageForm()}
					{messageList()}
				</>
			) : (
				<div>
					<div>No room selected</div>
				</div>
			)}
		</div>
	);
};
