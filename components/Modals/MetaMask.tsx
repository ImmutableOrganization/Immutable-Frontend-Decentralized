import { Frame } from '../Frame';

export const MetaMask: React.FC = () => {
  const noMetaMaskBody = () => {
    return (
      <>
        To access this part of the site Metamask is required. Please install Metamask and refresh the page.
        <div className='icon_button'>
          <img className='icon' src={'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/metamask.svg'} />
          <a target='_blank' href='https://metamask.io/download/'>
            <input type='button' className={`button download`} value='GET MetaMask' />
          </a>
        </div>
        If you already have Metamask, then connect your wallet to this website.
      </>
    );
  };

  const metamaskExplanationBody = () => {
    return <>MetaMask is a connector for the Ethereum blockchain. It allows you to interact with the Ethereum blockchain from your browser.</>;
  };
  return (
    <div className='metamask'>
      <Frame headerText={'No Web3 Connector Detected'} body={noMetaMaskBody} />
      <Frame headerText='Why do I need MetaMask?' body={metamaskExplanationBody} />
    </div>
  );
};
