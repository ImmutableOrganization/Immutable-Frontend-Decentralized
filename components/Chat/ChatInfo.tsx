interface ChatInfoProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setUserWantsSocketOn: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	disconnectSocket: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	socketConnected: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	userCounter: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	socketId: string;
}

export const ChatInfo: React.FunctionComponent<ChatInfoProps> = ({ setUserWantsSocketOn, disconnectSocket, socketConnected, userCounter, socketId }) => {
	return (
		<div className='frame chat-info'>
			<div className='frameHeader terminalHeader'>
				<h2>CHAT INFO</h2>
			</div>
			<div className='frameBody terminalBody'>
				{socketConnected ? (
					<>
						<span>
							CONNECTED TO CHAT SERVER
							<img
								src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/check-solid.svg'
								className='check-icon'
							/>
						</span>
						USERS ONLINE: {userCounter}
						<br></br>
						SOCKET ID: {socketId}
						<input type='button' className='button' value='DISCONNECT' onClick={() => disconnectSocket()} />
					</>
				) : (
					<>
						<span>
							NOT CONNECTED TO CHAT SERVER
							<img
								src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/triangle-exclamation-solid.svg'
								className='exclamation-triangle'
							/>
						</span>
						USERS ONLINE: 0
						<input type='button' className='button' value='CONNECT' onClick={() => setUserWantsSocketOn(true)} />
					</>
				)}
			</div>
		</div>
	);
};
