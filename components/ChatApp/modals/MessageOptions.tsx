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
  dateHidden: boolean;
  timeHidden: boolean;
  shortenPeerId: boolean;
  showChatFeed: boolean;
  showVideoFeed: boolean;
}

export const MessageOptionsModal: React.FC<MessageOptionsModalProps> = ({
  setDateHidden,
  setTimeHidden,
  setShortenPeerId,
  setShowChatFeed,
  setShowVideoFeed,
  setOpenMessageOptions,
  dateHidden,
  timeHidden,
  shortenPeerId,
  showChatFeed,
  showVideoFeed,
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
            <input type='button' className='button' value='CLOSE' onClick={() => setOpenMessageOptions(false)} />
          </div>
        </>
      )}
    />
  );
};
