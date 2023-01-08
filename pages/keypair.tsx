import { useLocalStorage } from 'usehooks-ts';
import { Frame } from '../components/Frame';
import * as openpgp from 'openpgp';
import { useEffect, useState } from 'react';

const useKeyRing = () => {
  const [publicKey, setPublicKey] = useLocalStorage<string>('publicKey', '0x');
  const [privateKey, setPrivateKey] = useLocalStorage<string>('privateKey', '');

  const genKeyPair = async (_passPhrase: string, _properties: openpgp.UserID) => {
    // reqs name email comment

    // validate properties

    // const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
    //   type: 'ecc', // Type of the key, defaults to ECC
    //   curve: 'curve25519', // ECC curve name, defaults to curve25519
    //   userIDs: [_properties], // you can pass multiple user IDs
    //   passphrase: 'super long and hard to guess secret', // protects the private key
    //   format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    // });

    // ask if would like to save to device storage
    // if not it will only last during this browser session
    // import { useCopyToClipboard } from 'usehooks-ts'
    // this hook would be good to use for saving for user to

    setPublicKey('publicKey');
    setPrivateKey('privateKey');
  };

  const getPrivateKey = () => {
    // unimplemented
    console.log(privateKey);
    return '-----BEGIN';
  };

  const deleteKeyPair = () => {
    setPublicKey('');
    setPrivateKey('');
  };

  return { publicKey, getPrivateKey, genKeyPair, deleteKeyPair };
};

const defaultProperties: openpgp.UserID = {
  name: 'Jon Smith',
  email: 'jon@example.com',
  comment: '',
};

const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

const KeyPair = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useLocalStorage<boolean>('encryptionEnabled', false);

  // does this need to be in the component itself
  // or a crypto utils file?

  const { publicKey, genKeyPair, deleteKeyPair } = useKeyRing();
  const isClient = useIsClient();

  // how do i verify user is actually encrypted like has valid keys

  // onload check if keys exist
  // if not prompt user to create
  // they can deny

  // display encryption status at top of page
  // display public key top of page with copy button

  return (
    <>
      <Frame
        headerText={'ENCRYPTED'}
        body={() => (
          <>
            {}
            <input
              type='button'
              className='button'
              onClick={() => setEncryptionEnabled(!encryptionEnabled)}
              value={`${encryptionEnabled ? 'DISABLE' : 'ENABLE'} ENCRYPTION`}
            />
            {isClient ? (
              <>
                {publicKey && publicKey != '' ? (
                  <>
                    Public Key: <textarea value={publicKey} />
                  </>
                ) : (
                  <>No encryption keys</>
                )}

                {encryptionEnabled ? (
                  <div>
                    <p>Encryption Enabled.</p>
                  </div>
                ) : (
                  <div>
                    <p>Encryption Disabled.</p>
                  </div>
                )}
              </>
            ) : (
              <>Needs to be on client to render because keys </>
            )}

            <input type='button' className='button' value='Generate Key Pair' onClick={() => genKeyPair('test passphrase', defaultProperties)} />
            <input type='button' className='button' value='Delete Key Pair' onClick={() => deleteKeyPair()} />
          </>
        )}
      />
    </>
  );
};

export default KeyPair;
