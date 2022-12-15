import { useState } from 'react';

interface JoinRoomProps {
	addRoom: (roomName: string) => void;
}
export const JoinRoom: React.FC<JoinRoomProps> = ({ addRoom }) => {
	const [roomName, setRoomName] = useState<string>('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		addRoom(roomName);
		setRoomName('');
	};

	return (
		<>
			<h2 className='options'>Add Room</h2>
			<form className='addRoom' onSubmit={handleSubmit}>
				<input
					type='text'
					className='text_input terminal-input'
					placeholder='Enter room name'
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
				/>
				<input type='submit' className='button' value='add' />
			</form>
		</>
	);
};
