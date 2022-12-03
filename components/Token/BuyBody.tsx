import { SwapWidget, darkTheme } from '@uniswap/widgets';
import { switchToArbitrum, addUSDCArbitrum, addTokenArbitrum } from '../../utils/addTokenToMetaMask';
import { token_name, token_symbol } from '../../utils/globals';

export const BuyBody: React.FC = () => {
	const SWAP_LIST = [
		{
			name: 'USD Coin',
			address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
			symbol: 'USDC',
			decimals: 6,
			chainId: 42161,
			logoURI:
				'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
		},
		{
			name: `${token_name}`,
			address: '0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1',
			symbol: `${token_symbol}`,
			decimals: 18,
			chainId: 42161,
			logoURI: 'https://ipfs.io/ipfs/QmRneeRA2sNoNDvctwahPUNSa4jKetGobzN97YwP1LsvRd?filename=token.png',
		},
	];
	const NATIVE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
	const IMT = '0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1';

	return (
		<>
			<u className='buyText'>
				{' '}
				<h2 className='left-align buyText'>BUY TOKEN: </h2>{' '}
			</u>
			<br></br>
			<h3 className='left-align'>Token is available on Arbitrum</h3>
			<br></br>

			<div className='buy-and-swap'>
				<div className='buy-grid'>
					<div className='buy-grid-item'>
						<h3>
							<a href='https://developer.offchainlabs.com/intro' target={'_blank'} rel='noopener noreferrer'>
								What is Arbitrum?
							</a>
						</h3>

						<img
							height='100%'
							width='100%'
							loading='lazy'
							className='icon'
							src={'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/arbitrum.svg'}
						/>
					</div>
					<div className='buy-grid-item'>
						<img
							height='100%'
							width='100%'
							loading='lazy'
							className='icon'
							src={'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/metamask.svg'}
						/>
						<a target='_blank' href='https://metamask.io/download/'>
							<input type='button' className={`button download`} value='GET MetaMask' />
						</a>
					</div>
					<div className='buy-grid-item'>
						<input type='button' className='button' value='Switch network to Arbitrum' onClick={() => switchToArbitrum()} />
						<h3 className=''>
							{' '}
							<a href='https://chainlist.org/chain/42161' target={'_blank'} rel='noreferrer'>
								Click here for instructions to manually connect MetaMask to Arbitrum.
							</a>{' '}
						</h3>
					</div>
					<div className='buy-grid-item'>
						<h3>Buy USDC and transfer it to your wallet.</h3>
						<img
							height='100%'
							width='100%'
							loading='lazy'
							className='icon'
							src={'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/usdc.svg'}
						/>
					</div>
					<div className='buy-grid-item'>
						<span>
							<input type='button' className='button' value='Add USDC to MetaMask' onClick={() => addUSDCArbitrum()} />
							<h3 className=''>
								{' '}
								<a href='https://bridge.arbitrum.io/?l2ChainId=42161' target={'_blank'} rel='noreferrer'>
									Link to Arbitrum bridge{' '}
								</a>{' '}
							</h3>
						</span>
						<h3>Bridge your USDC to the Arbitrum network to trade IMT</h3>
					</div>
					<div className='buy-grid-item'>
						<input type='button' className='button' value='Add IMT to MetaMask' onClick={() => addTokenArbitrum()} />
						<img
							height='100%'
							width='100%'
							loading='lazy'
							className='icon'
							src={'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/token.svg'}
						/>
					</div>
				</div>
				<>
					<div className='widget'>
						<h3 className='left-align'>SWAP USDC TO IMT</h3>
						<br></br>
						<SwapWidget
							className='uniswap-container'
							tokenList={SWAP_LIST}
							defaultInputTokenAddress={NATIVE}
							defaultOutputTokenAddress={IMT}
							theme={darkTheme}
						/>
					</div>
				</>
			</div>
		</>
	);
};
