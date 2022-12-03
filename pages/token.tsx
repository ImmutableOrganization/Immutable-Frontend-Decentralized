import { NextPage } from 'next';
import Head from 'next/head';
import { company_name, token_name, token_symbol } from '../utils/globals';
import { Frame } from '../components/Frame';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { BaseLink } from '../components/BaseLink';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DynamicDaoBody = dynamic(() => import('../components/Token/DaoBody').then((mod) => mod.DaoBody), { ssr: false });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DynamicBuyBody = dynamic(() => import('../components/Token/BuyBody').then((mod) => mod.BuyBody), { ssr: false });

const Token: NextPage = () => {
	const buyTokenBody = () => {
		return (
			<>
				<br></br>
				<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/token.svg' className='logo' />
				<h1>{token_name}</h1>
				<u>
					<h2>${token_symbol}</h2>
				</u>

				<h3>AVAILABLE ON ARBITRUM</h3>
				<br></br>
			</>
		);
	};

	const detailsBody = () => {
		return (
			<div className=''>
				<ul>
					<h3>Github:</h3>
					<li>The Organization has all of our code available so users can build and run the app locally.</li>
					<li>
						<a href='https://github.com/ImmutableOrganization' target='_blank'>
							Link to the Organization's Github.
						</a>
					</li>
					<li>
						<a href='https://github.com/ImmutableOrganization/Immutable-Frontend-Decentralized/' target='_blank'>
							Link to app's frontend repository.
						</a>
					</li>
				</ul>
				<ul>
					<h3>Frontend:</h3>
					<li>
						The main version of the website can be found at: &#x2800;
						<a target='_blank' href='https://immutable.lol/'>
							immutable.lol.
						</a>
					</li>
					<li>
						The Organization's ENS can be found at: &#x2800;
						<a target='_blank' href='https://app.ens.domains/name/immutableapp.eth'>
							app.ens.domains/name/immutableapp.eth.
						</a>
					</li>
					<li>
						The ENS points to the IPNS version of our app. To access the site via ENS, visit the link: &#x2800;
						<a target='_blank' href='https://immutableapp.eth.link/'>
							immutableapp.eth.link.
						</a>
					</li>
				</ul>
				<ul>
					<h3>WHITEPAPER:</h3>
					<li>
						For an outline of the The Organizations objectives and plans, read our whitepaper at: &#x2800;
						<BaseLink href='/whitepaper' target='_blank' rel='noopener noreferrer' as={undefined}>
							Whitepaper link.
						</BaseLink>
					</li>
				</ul>
			</div>
		);
	};

	const communityBody = () => {
		return (
			<div className='socials'>
				<a className='frameHeader social-icon-container twitter' href='https://twitter.com/ImmutableOrg' target='_blank' rel='noopener noreferrer'>
					<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/twitter-brands.svg' className='icon' />
					<h1>Twitter</h1>
				</a>
			</div>
		);
	};

	const discordBody = () => {
		return (
			<div className='socials'>
				<a className='frameHeader social-icon-container discord' href='https://discord.gg/kCsQUJR7U4' target='_blank' rel='noopener noreferrer'>
					<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/discord.svg' className='icon' />
					<h1>Discord</h1>
				</a>
			</div>
		);
	};

	return (
		<div className='token-page'>
			<Head>
				<title>{company_name}</title>
			</Head>
			<Frame headerText={'TOKEN'} className='token-box' body={buyTokenBody} />
			<Frame headerText={'DETAILS'} className='padding token-box' body={detailsBody} />
			<Suspense fallback={<div>Loading...</div>}>
				<Frame headerText='DAO' className='padding token-box' body={() => <DynamicDaoBody />} />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<Frame className={'padding token-box'} headerText={'BUY IMT'} body={() => <DynamicBuyBody />} />
			</Suspense>
			<Frame className={'contact token-box'} headerText={'TWITTER'} body={communityBody} />
			<Frame className={'contact token-box'} headerText={'DISCORD'} body={discordBody} />
		</div>
	);
};

export default Token;
