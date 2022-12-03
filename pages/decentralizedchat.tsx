import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import * as openpgp from 'openpgp'
import { Frame } from '../components/Frame'

let ranOnce = false

const DecentralizedChat: NextPage = () => {
  // onload check if keys exist
  // if not prompt user to create
  // they can deny

  // display encryption status at top of page
  // display public key top of page with copy button

  const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string>('');
  


  useEffect(() => {
    if (!ranOnce) {
    }
  }, [])

  const encryptionBody = () => {
    return(
      <>

        <h2>Encryption is {encryptionEnabled ? 'enabled' : 'disabled'}</h2>

      </>
    )
  }

  const genKeyPair = async () => {
    // reqs name email comment

    console.log('generating key pair')

    const {
      privateKey,
      publicKey,
      revocationCertificate,
    } = await openpgp.generateKey({
      type: 'ecc', // Type of the key, defaults to ECC
      curve: 'curve25519', // ECC curve name, defaults to curve25519
      userIDs: [{ name: 'Jon Smith', email: 'jon@example.com', comment: '' }], // you can pass multiple user IDs
      passphrase: 'super long and hard to guess secret', // protects the private key
      format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    })

    console.log(privateKey) // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    console.log(publicKey) // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    console.log(revocationCertificate) // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  }

  return (
    <>
      <Frame headerText={'ENCRYPTED'} body={encryptionBody} />
      <input
        type="button"
        className="button"
        onClick={() => genKeyPair()}
        value="genKeyPair"
      />
    </>
  )
}

export default DecentralizedChat;
