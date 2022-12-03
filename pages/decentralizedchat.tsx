import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import * as openpgp from 'openpgp';
import { Frame } from '../components/Frame';
import { useLocalStorage } from 'usehooks-ts';

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

	useEffect(() => {
		if (!ranOnce) {
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

		const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
			type: 'ecc', // Type of the key, defaults to ECC
			curve: 'curve25519', // ECC curve name, defaults to curve25519
			userIDs: [
				{
					name: 'Jon Smith',
					email: 'jon@example.com',
					comment: '',
				},
			], // you can pass multiple user IDs
			passphrase: 'super long and hard to guess secret', // protects the private key
			format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
		});

		// ask if would like to save to device storage
		// if not it will only last during this browser session

		console.log(privateKey); // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
		console.log(publicKey); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
		console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
	};

	// signing is for authentication, anyone with your public key can decrypt it and verify its you
	// encrypting is for secure messaging, where you require someones public key to write a message to them.
	// =in big pools you can encrypt to many people
	// you would get public key from peers on connection., they send public key etc

	return (
		<>
			<Frame headerText={'ENCRYPTED'} body={encryptionBody} />
			<input type='button' className='button' onClick={() => genKeyPair()} value='genKeyPair' />
		</>
	);
};

export default DecentralizedChat;
