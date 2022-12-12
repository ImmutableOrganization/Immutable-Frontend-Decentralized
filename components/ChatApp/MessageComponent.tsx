import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useState } from 'react';
import { selfId } from 'trystero';
import { Frame } from '../Frame';
import { RoomWrapper } from './RoomComponent';

interface MessageComponentProps {
	selectedRoom: RoomWrapper;
	messages: React.MutableRefObject<MessageList | undefined>;
	addMessage: (_message: Message, _roomId: string, isLocal: boolean) => void;
	shortenPeerId: boolean;
	dateHidden: boolean;
	timeHidden: boolean;
	setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
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

export const MessageComponent: React.FunctionComponent<MessageComponentProps> = ({
	selectedRoom,
	messages,
	addMessage,
	shortenPeerId,
	dateHidden,
	timeHidden,
	setOpenMessageOptions,
}) => {
	const [message, setMessage] = useState<string>('');

	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		console.log('scrolling to bottom');
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages.current]);
	const messageList = () => {
		return (
			<>
				{messages.current ? (
					<>
						{messages.current[selectedRoom.roomName] ? (
							<div className='messages socketMessages'>
								{messages.current[selectedRoom.roomName].map((message: Message) => (
									<div className={`socketMessage ` + (message.peerId === selfId ? 'localMessage' : '')}>
										{message.peerId === selfId ? (
											<>
												{message.message}
												{'    <'}
												{!timeHidden ? new Date(message.timestamp).toLocaleTimeString() + ' ' : ''}
												{!dateHidden ? new Date(message.timestamp).toLocaleDateString() + ' ' : ''}
												{shortenPeerId ? message.peerId.substring(0, 5) + ' ' : message.peerId + ' '}
											</>
										) : (
											<>
												{shortenPeerId ? message.peerId.substring(0, 5) + ' ' : message.peerId + ' '}
												{!dateHidden ? new Date(message.timestamp).toLocaleDateString() + ' ' : ''}
												{!timeHidden ? new Date(message.timestamp).toLocaleTimeString() + ' ' : ''}
												{'>    '}
												{message.message}
											</>
										)}
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>
						) : (
							<div className='messages socketMessages'>
								<div className='socketMessage'>No messages...</div>
							</div>
						)}
					</>
				) : (
					<div className='messages socketMessages'>
						<div className='socketMessage'>No messages...</div>
					</div>
				)}
			</>
		);
	};

	return (
		<>
			{selectedRoom && selectedRoom.roomName != '' && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
				<Frame
					className='MessageComponent'
					headerText={selectedRoom.roomName + ' Chat'}
					body={() => (
						<>
							<>
								{messageList()}
								<div className='messageControls'>
									<input type={'text'} className='text-input terminal-input' value={message} onChange={(e) => setMessage(e.target.value)} />
									<input
										type='button'
										className='button'
										value='>'
										onClick={() => addMessage({ message: message, timestamp: Date.now(), peerId: selfId }, selectedRoom.roomName, true)}
									/>
								</div>
							</>
						</>
					)}
				/>
			)}
		</>
	);
};
