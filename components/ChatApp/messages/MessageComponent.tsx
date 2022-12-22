import React, { useRef } from 'react';
import { useState } from 'react';
import { selfId } from 'trystero';
import { useLocalStorage } from 'usehooks-ts';
import { Frame } from '../../Frame';
import { Room } from '../rooms/room';
import { MessagesList } from './MessageList';
import { Messages } from './messages';

interface MessageComponentProps {
  selectedRoom: Room.RoomWrapper;
  messages: React.MutableRefObject<Messages.MessageList | undefined>;
  addMessage: (_message: Messages.Message, _roomId: string, isLocal: boolean) => void;
  shortenPeerId: boolean;
  dateHidden: boolean;
  timeHidden: boolean;
}

// index in Messages is room id
export const useMessages = (_sendMessageCallback: any) => {
  const [messages, setMessages] = useLocalStorage<Messages.MessageList>('messages', {} as Messages.MessageList);

  // we do a ref like this, and the messageHook should use the ref instead of state.
  const messagesRef = React.useRef(messages);
  const setMessagesRef = (data: Messages.MessageList) => {
    messagesRef.current = data;
    setMessages(data);
  };

  const addMessage = (_message: Messages.Message, _roomName: string, isLocal: boolean) => {
    if (_roomName == '') {
      return;
      // CALLBACK TO ERROR HANDLER
    }
    if (isLocal) {
      _sendMessageCallback(_message, _roomName);
    }

    if (messagesRef.current) {
      if (messagesRef.current[_roomName]) {
        setMessagesRef({
          ...messages,
          [_roomName]: [...messagesRef.current[_roomName], _message],
        });
      } else {
        setMessagesRef({ ...messages, [_roomName]: [_message] });
      }
    } else {
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
}) => {
  const [message, setMessage] = useState<string>('');

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (message == '') return;
    addMessage({ message: message, timestamp: Date.now(), peerId: selfId }, selectedRoom.roomName, true);
    setMessage('');
  };

  return (
    <>
      {selectedRoom && selectedRoom.roomName != '' && selectedRoom.roomName != '2d9227eb-bdd7-4dda-a1d1-d3a694b4195e' && (
        <Frame
          className='MessageComponent'
          headerText={selectedRoom.roomName + ' Chat'}
          body={() => (
            <>
              <MessagesList
                shortenPeerId={shortenPeerId}
                dateHidden={dateHidden}
                timeHidden={timeHidden}
                messages={messages}
                selectedRoom={selectedRoom}
                messagesEndRef={messagesEndRef}
              />
              <form className='messageControls' onSubmit={handleSubmit}>
                <input type={'text'} className='text-input terminal-input' value={message} onChange={(e) => setMessage(e.target.value)} />
                <input type='submit' className='button' value='>' />
              </form>
            </>
          )}
        />
      )}
    </>
  );
};
