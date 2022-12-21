import { faCheckSquare, faInfoCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface JoinRoomProps {
  addRoom: (roomName: string, password: string) => void;
}
export const JoinRoom: React.FC<JoinRoomProps> = ({ addRoom }) => {
  const [roomName, setRoomName] = useState<string>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addRoom(roomName, password);
    setRoomName('');
  };

  const [passwordReq, setPasswordReq] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordTooltip, setPasswordTooltip] = useState<boolean>(false);

  return (
    <div className='options'>
      <h2 className='options'>Add Room</h2>
      <label
        className={'checkbox-item'}
        onClick={(e: any) => {
          if (e.target.closest('#password')) {
            setPasswordReq(!passwordReq);
            setPassword('');
          } else {
            setPasswordTooltip(!passwordTooltip);
          }
        }}
      >
        <div id='password'>Password:</div>
        <span>
          <FontAwesomeIcon id='password' icon={passwordReq ? faCheckSquare : faSquare}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faInfoCircle} />
        </span>
      </label>
      {passwordTooltip && <>When you use a password with a room, connections will be made only to peers in that room with the same password.</>}
      <form className='addRoom' onSubmit={handleSubmit}>
        <input type='text' className='text_input terminal-input' placeholder='Enter room name' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        {passwordReq && (
          <input
            title='Password'
            type='text'
            className='text_input terminal-input'
            placeholder='Password (Optional)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <input type='submit' className='button' value='add' />
      </form>
    </div>
  );
};
