import { useState } from 'react';
import { RoomWrapper } from './RoomComponent';

interface MessageComponentProps {
	selectedRoom: RoomWrapper;
}

interface Message {
	message: string;
	timestamp: number;
}

interface MessageList {
	[roomId: string]: Message[];
}

// index in Messages is room id
const useMessages = () => {
	const [messages, setMessages] = useState<MessageList>();

	const addMessage = (_message: string, _roomId: string) => {
		if (_roomId == '') {
			return;
			// CALLBACK TO ERROR HANDLER
		}
		if (messages) {
			if (messages[_roomId]) {
				setMessages({
					...messages,
					[_roomId]: [...messages[_roomId], { message: _message, timestamp: Date.now() }],
				});
			} else {
				setMessages({ ...messages, [_roomId]: [{ message: _message, timestamp: Date.now() }] });
			}
		} else {
			setMessages({ [_roomId]: [{ message: _message, timestamp: Date.now() }] });
		}
	};

	return { messages, addMessage };
};

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({ selectedRoom }) => {
	const { messages, addMessage } = useMessages();

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
		const [message, setMessage] = useState<string>('');
		return (
			<>
				<input type={'text'} value={message} onChange={(e) => setMessage(e.target.value)} />
				<input type='button' className='button' value='Send Message' onClick={() => addMessage('test passphrase', selectedRoom._id)} />
			</>
		);
	};

	return (
		<div className='MessageComponent'>
			<h1>MessageComponent</h1>
			{selectedRoom && selectedRoom._id != '' ? (
				<>
					{selectedRoom._id}
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
