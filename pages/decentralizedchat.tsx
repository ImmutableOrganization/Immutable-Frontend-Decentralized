import { NextPage } from 'next';
import { useEffect, useState } from 'react';
// import * as openpgp from 'openpgp';
import { Frame } from '../components/Frame';
import { useLocalStorage } from 'usehooks-ts';
import { BaseRoomConfig, joinRoom, Room } from 'trystero';
let ranOnce = false;

const DecentralizedChat: NextPage = () => {
	// onload check if keys exist
	// if not prompt user to create
	// they can deny

	// display encryption status at top of page
	// display public key top of page with copy button

	const [publicKey, setPublicKey] = useLocalStorage<string>('publicKey', '');
	const [privateKey, setPrivateKey] = useLocalStorage<string>('privateKey', '');
	const [passphrase, setPassPhrase] = useLocalStorage<string>('passphrase', '');
	const [encryptionEnabled, setEncryptionEnabled] = useLocalStorage<boolean>('encryptionEnabled', false);

	const [sendMessageState, setSendMessageState] = useState<any>();
	const [rooms, setRooms] = useState<Room[]>();

	useEffect(() => {
		if (!ranOnce) {
			// first just do unencrypted chat right lol.

			// make conn
			// THIS MUST BE UNIQUE AND PRIVATE
			const _appId = 'immutable';

			// _roomname - A string to namespace peers and events within a room.
			const _roomName = 'room22213213qsadsad';
			console.log('hi');
			const password = 'public';

			// CONFIG CAN TAKE A PASSWORD TO MASK PEERS TO NOT USERS OF THE APP
			//password, encrypts the SID for peers , session descriptions will be encrypted using AES-CBC
			// really no need i think, guess means only authed users can connect to the chat network.
			// maybe set an env one for the org.

			// other options params we can skip
			const config: BaseRoomConfig = { appId: _appId };
			// const room = joinRoom(config, _roomName);

			if (rooms) {
				// should probably chekc if doesnt exist already
				// setRooms((rooms: any) => [...rooms, room]);
			}

			// room.leave();
			// room.getPeers();
			// room.onPeerJoin((peerId) => console.log(`${peerId} joined`));
			// room.onPeerLeave((peerId) => console.log(`${peerId} left`));

			// const [sendMessage, getMessage, inprogressMessage] = room.makeAction('message');

			// setSendMessageState(sendMessage);

			// getMessage((_msg, peerId: string, metadata: any) => {
			// console.log('hi!');
			// });

			// inprogressMessage((percent, peerId, metadata) => console.log(`${percent * 100}% done receiving  from ${peerId}`));
			ranOnce = true;
		}
	}, []);

	const encryptionBody = () => {
		return (
			<>
				<h2>Encryption is {encryptionEnabled ? 'enabled' : 'disabled'}</h2>
				but you can have the keys and still disable encryption right we would need to check if user has the keys ready
			</>
		);
	};

	const genKeyPair = async () => {
		// reqs name email comment

		console.log('generating key pair');

		// const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
		// 	type: 'ecc', // Type of the key, defaults to ECC
		// 	curve: 'curve25519', // ECC curve name, defaults to curve25519
		// 	userIDs: [
		// 		{
		// 			name: 'Jon Smith',
		// 			email: 'jon@example.com',
		// 			comment: '',
		// 		},
		// 	], // you can pass multiple user IDs
		// 	passphrase: 'super long and hard to guess secret', // protects the private key
		// 	format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
		// });

		// ask if would like to save to device storage
		// if not it will only last during this browser session
		// import { useCopyToClipboard } from 'usehooks-ts'
		// this hook would be good to use for saving for user to

		// console.log(privateKey); // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
		// console.log(publicKey); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
		// console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
	};

	// signing is for authentication, anyone with your public key can decrypt it and verify its you
	// encrypting is for secure messaging, where you require someones public key to write a message to them.
	// =in big pools you can encrypt to many people
	// you would get public key from peers on connection., they send public key etc

	return (
		<>
			<Frame headerText={'ENCRYPTED'} body={encryptionBody} />
			<input
				type='button'
				className='button'
				onClick={() => setEncryptionEnabled(!encryptionEnabled)}
				value={`${encryptionEnabled ? 'DISABLE' : 'ENABLE'} ENCRYPTION`}
			/>
			<input type='button' className='button' onClick={() => sendMessageState()} value='Send Message' />

			<input type='button' className='button' onClick={() => genKeyPair()} value='genKeyPair' />
			{rooms ? (
				<>
					{rooms.map((_room: Room, listIndex: number) => (
						<>
							<p>listIndex : {listIndex}</p>
						</>
					))}
				</>
			) : (
				<>Please join a room.</>
			)}
		</>
	);
};

export default DecentralizedChat;
