import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { selfId } from 'trystero';
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
	peerId: string;
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
					[_roomName]: [...messagesRef.current[_roomName], _message],
				});
			} else {
				console.log('no for room');
				setMessagesRef({ ...messages, [_roomName]: [_message] });
			}
		} else {
			console.log('no messages');

			setMessagesRef({ [_roomName]: [_message] });
		}
	};

	return { messagesRef, addMessage };
};

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({ selectedRoom, messages, addMessage }) => {
	const [message, setMessage] = useState<string>('');
	const [dateHidden, setDateHidden] = useState<boolean>(true);
	const [timeHidden, setTimeHidden] = useState<boolean>(true);
	const [shortenPeerId, setShortenPeerId] = useState<boolean>(true);

	const messageList = () => {
		return (
			<>
				{messages.current ? (
					<>
						{messages.current[selectedRoom.roomName] ? (
							<div className='messages socketMessages'>
								{messages.current[selectedRoom.roomName].map((message: Message) => (
									<div className='socketMessage'>
										{shortenPeerId ? message.peerId.substring(0, 5) + ' ' : message.peerId + ' '}
										{!dateHidden ? new Date(message.timestamp).toLocaleDateString() + ' ' : ''}
										{!timeHidden ? new Date(message.timestamp).toLocaleTimeString() + ' ' : ''}
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
							<div className='options'>
								{/* <u>MESSAGE OPTIONS:</u> */}
								<label onClick={() => setDateHidden(!dateHidden)}>
									HIDE DATE
									<FontAwesomeIcon icon={dateHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
								</label>
								<label onClick={() => setTimeHidden(!timeHidden)}>
									HIDE TIME
									<FontAwesomeIcon icon={timeHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
								</label>
								<label onClick={() => setShortenPeerId(!shortenPeerId)}>
									SHORTEN ID's
									<FontAwesomeIcon icon={shortenPeerId ? faCheckSquare : faSquare}></FontAwesomeIcon>
								</label>
							</div>
							{messageList()}
							<input type={'text'} className='text-input terminal-input' value={message} onChange={(e) => setMessage(e.target.value)} />
							<input
								type='button'
								className='button'
								value='Send Message'
								onClick={() => addMessage({ message: message, timestamp: Date.now(), peerId: selfId }, selectedRoom.roomName, true)}
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
