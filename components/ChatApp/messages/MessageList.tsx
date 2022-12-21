import { useEffect } from 'react';
import { selfId } from 'trystero';
import { Room } from '../rooms/room';
import { Messages } from './messages';

interface MessageListProps {
  shortenPeerId: boolean;
  dateHidden: boolean;
  timeHidden: boolean;
  messages: React.MutableRefObject<Messages.MessageList | undefined>;
  selectedRoom: Room.RoomWrapper;
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
}
export const MessagesList: React.FC<MessageListProps> = ({ shortenPeerId, dateHidden, timeHidden, messages, selectedRoom, messagesEndRef }) => {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.current]);

  return (
    <>
      {messages && messages.current ? (
        <>
          {messages.current[selectedRoom.roomName] ? (
            <div className='messages socketMessages'>
              {messages.current[selectedRoom.roomName].map((message: Messages.Message) => (
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
