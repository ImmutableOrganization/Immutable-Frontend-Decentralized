import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import { Frame } from '../../Frame';

interface MessageOptionsModalProps {
  setDateHidden: Dispatch<SetStateAction<boolean>>;
  setTimeHidden: Dispatch<SetStateAction<boolean>>;
  setShortenPeerId: Dispatch<SetStateAction<boolean>>;
  setShowChatFeed: Dispatch<SetStateAction<boolean>>;
  setShowVideoFeed: Dispatch<SetStateAction<boolean>>;
  setOpenMessageOptions: Dispatch<SetStateAction<boolean>>;
  setMaxMessageSize: Dispatch<SetStateAction<number>>;
  setBlockMessagesWithProfanity: Dispatch<SetStateAction<boolean>>;
  setCenscorMessagesWithProfanity: Dispatch<SetStateAction<boolean>>;
  setPeerMessageInterval: Dispatch<SetStateAction<number>>;
  dateHidden: boolean;
  timeHidden: boolean;
  shortenPeerId: boolean;
  showChatFeed: boolean;
  showVideoFeed: boolean;
  maxMessageSize: number;
  blockMessagesWithProfanity: boolean;
  censcorMessagesWithProfanity: boolean;
  peerMessageInterval: number;
}

export const MessageOptionsModal: React.FC<MessageOptionsModalProps> = ({
  setDateHidden,
  setTimeHidden,
  setShortenPeerId,
  setShowChatFeed,
  setShowVideoFeed,
  setOpenMessageOptions,
  setMaxMessageSize,
  setBlockMessagesWithProfanity,
  setCenscorMessagesWithProfanity,
  setPeerMessageInterval,
  dateHidden,
  timeHidden,
  shortenPeerId,
  showChatFeed,
  showVideoFeed,
  maxMessageSize,
  blockMessagesWithProfanity,
  censcorMessagesWithProfanity,
  peerMessageInterval,
}) => {
  return (
    <Frame
      headerText='Options'
      className='message-options'
      body={() => (
        <>
          <div className='options'>
            <label className='chat-option-item' onClick={() => setDateHidden(!dateHidden)}>
              HIDE DATE
              <FontAwesomeIcon icon={dateHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item' onClick={() => setTimeHidden(!timeHidden)}>
              HIDE TIME
              <FontAwesomeIcon icon={timeHidden ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item' onClick={() => setShortenPeerId(!shortenPeerId)}>
              SHORTEN ID's
              <FontAwesomeIcon icon={shortenPeerId ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item' onClick={() => setShowChatFeed(!showChatFeed)}>
              Show Chat
              <FontAwesomeIcon icon={showChatFeed ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item' onClick={() => setShowVideoFeed(!showVideoFeed)}>
              Show Video
              <FontAwesomeIcon icon={showVideoFeed ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item'>
              MAX MESSAGE SIZE: <input type='number' value={maxMessageSize} onChange={(e) => setMaxMessageSize(parseInt(e.target.value))} />
            </label>
            <label className='chat-option-item'>
              PEER MESSAGE INTERVAL: <input type='number' value={peerMessageInterval} onChange={(e) => setPeerMessageInterval(parseInt(e.target.value))} />
            </label>
            <label className='chat-option-item' onClick={() => setBlockMessagesWithProfanity(!blockMessagesWithProfanity)}>
              BLOCK MESSAGES WITH PROFANITY
              <FontAwesomeIcon icon={blockMessagesWithProfanity ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>
            <label className='chat-option-item' onClick={() => setCenscorMessagesWithProfanity(!censcorMessagesWithProfanity)}>
              CENSORE MESSAGES WITH PROFANITY
              <FontAwesomeIcon icon={censcorMessagesWithProfanity ? faCheckSquare : faSquare}></FontAwesomeIcon>
            </label>

            <input type='button' className='button' value='CLOSE' onClick={() => setOpenMessageOptions(false)} />
          </div>
        </>
      )}
    />
  );
};
