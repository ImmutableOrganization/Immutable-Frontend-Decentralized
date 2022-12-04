import { useState } from 'react';

interface MessageComponentProps {
	selectedRoom: string | undefined;
}

interface Message {
	message: string;
	timestamp: number;
}
const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (_message: string) => {
		setMessages((prevMessages) => [...prevMessages, { message: _message, timestamp: Date.now() }]);
	};

	return { messages, addMessage };
};

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({ selectedRoom }) => {
	const { messages, addMessage } = useMessages();

	const messageList = () =>
		messages.map((message, index) => {
			return (
				<div key={index}>
					{message.timestamp}:{message.message}
				</div>
			);
		});

	const messageForm = () => {
		const [message, setMessage] = useState<string>('');
		return (
			<>
				<input type={'text'} value={message} onChange={(e) => setMessage(e.target.value)} />
				<input type='button' className='button' value='Send Message' onClick={() => addMessage('test passphrase')} />
			</>
		);
	};
	return (
		<div className='MessageComponent'>
			<h1>MessageComponent</h1>
			{selectedRoom ? (
				<>
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
