import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Frame } from '../components/Frame';
import { company_name, token_name } from '../utils/globals';

const Whitepaper: NextPage = () => {
	return (
		<div className='whitepaper'>
			<Head>
				<title>Whitepaper</title>
			</Head>

			<Frame
				headerText={'WHITEPAPER'}
				body={() => (
					<div className='align-center'>
						<br></br>
						<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/token.svg' className='logo' />
						<br></br>
						<br></br>
						<h1>On the immutability and accessibility of information.</h1>
						<br></br>
						<h3>By the {company_name}.</h3>
						<ul>
							Table of contents:
							<li>
								{' '}
								<a href='#background'>Background.</a>
							</li>
							<li>
								{' '}
								<a href='#objective'>Objective.</a>
							</li>
							<li>
								{' '}
								<a href='#risks'>Risks and Analysis.</a>
							</li>
							<li>
								{' '}
								<a href='#posts'>Posts.</a>
							</li>
							<li>
								{' '}
								<a href='#chat'>Chat.</a>
							</li>
							<li>
								{' '}
								<a href='#decentralization'>Decentralization.</a>
							</li>
							<li>
								{' '}
								<a href='#token'>Token.</a>
							</li>
						</ul>
					</div>
				)}
			/>

			<Frame
				headerText={'Background'}
				body={() => (
					<div id='background'>
						<br></br>
						<p>
							&emsp;The majority of content on the internet is on a corporation-owned server. A user on the web can create, share and access
							content on a website, given that they abide by rules set by the company that manages that website, the company hosting the server,
							and any governing bodies that influence these companies. Content on websites does get removed, often for a good reason, as specific
							posts may be harmful to other users, such as something immoral or obscene. There are times when this removal of content is
							unjustified, for example, the removal of a post that disagrees with the actions of a person, company, or government. Most companies
							have complete control over what is hosted on their website. Users must agree to the company's rules and do not have control over
							whether the company removes its content. The only way to avoid censorship is to avoid platforms that manage through a centralized
							body or can be influenced by one.
						</p>
						<br></br>
						<p>
							&emsp;In a centralized organization, authority over decisions is in the hands of executives. In a decentralized organization, all
							participants of the organization have power. Centralized organizations are popular because they can be more efficient with one or a
							few persons making decisions. These individuals command the direction of the organization. A decentralized autonomous organization
							(DAO) is a member-owned community without centralized leadership. The DAO's actions are proposed by and voted on by its members and
							autonomously executed by a computer program. Its smart contract governs the rules of the DAO. The blockchain guarantees complete
							transparency for all actions the DAO takes and the flow of its funds.
						</p>
						<br></br>
						<p>
							&emsp;A ledger is a document that consists of a collection of accounts where all transactions are recorded. A blockchain is a
							distributed ledger of transactions in a network. A block in a blockchain is a set of transactions. Validators on a blockchain are
							network nodes that validate and process transactions. A validator bundles transactions into a block and these blocks are sent to be
							included in the network's blockchain. A blockchain is immutable, and users can trust the records in the ledger as long as it is
							sufficiently decentralized and distributed. There are centralized blockchains where the only validators are those run by the
							organization that owns that blockchain. This centralization is unacceptable for a DAO. The DAO must exist on a blockchain that is
							decentralized, distributed, and requires no third party to operate.
						</p>
						<br></br>
						<p>
							&emsp;Ethereum is a decentralized blockchain. Instead of a ledger of transactions, Ethereum's blockchain is a deterministic state
							machine powered by the Turing complete Ethereum Virtual Machine (EVM). The deterministic property of the EVM means that anyone that
							computes a specific transaction at a particular block will receive the same output. A smart contract is a computer program stored
							and executed on the blockchain. All code inside a smart contract is visible to the public. The deterministic nature of the EVM
							allows the Ethereum network to have decentralized programs that participants can trust. As of September 2022, Ethereum has 422,000
							validators on its network. This number will only grow, and it grants confidence in the integrity of the immutability and
							decentralization of the blockchain. A gas fee is sent with a transaction to encourage validators to process and add it to the next
							block. This gas fee is in ETH, the token required for the Ethereum network.
						</p>
						<br></br>
						<p>
							&emsp;Arbitrum is a layer 2, which is a scaling solution built on top of the Ethereum blockchain. It increases transaction speeds
							and decreases gas fees while maintaining the security of the Ethereum main chain. Unlike other Layer 2 solutions, Arbitrum is
							secured by the Ethereum base layer and does not have a token. Gas fees on Arbitrum are in ETH. A transaction on arbitrum gets
							processed by the Arbitrum sequencer, whose job is to execute and post transaction data to the Ethereum mainnet. Since the
							computations are not performed on the mainnet, Optimistic Rollups are used to prove the validity of transactions. Optimistic rollups
							assume transactions computed off-chain are valid (optimistic) and post them to the mainnet. Once data is posted, there is a
							challenge period where anyone can challenge this rollup transaction. This challenge is called a fraud-proof, where they provide
							proof that when the transaction is executed, they receive a different result. Validators on Arbitrum must put up a stake before
							posting a transaction. If the validator loses a fraud challenge, they have their stake removed. Ethereum can handle approximately 16
							transactions per second (TPS), while Arbitrum can manage more than 40,000 TPS. The low amount of TPS on Ethereum means that users
							have to compete with each other by including higher gas fees to incentivize validators to include their transactions over another in
							the block they are building.
						</p>
						<br></br>
						<p>
							&emsp;Not all content is meant to be permanent; many sites are based on temporary posts that are meant to expire. When permanence
							and autonomy over a post is desired, there are few, if any, solutions. This is due to the fact that no company has the incentive to
							host content they have no control over and don't receive any benefit. Suppose a company is hosting your information for free. In
							that case, the revenue is generated from your data or is gained from interaction with the site, such as selling data to advertisers
							or displaying ads to users. A company that does this is beholden to external companies and their demands for content restrictions,
							or else they risk termination of any partnership.
						</p>
						<br></br>
						<p>
							&emsp;With Ethereum and other blockchains, data immutability can be achieved while avoiding centralized entities. There can exist an
							organization where users own the content they create and whose sole purpose is to maintain the integrity and immutability of the
							data. Such an organization should have no power to remove anything. In this organization, the functionality to delete would not be
							implemented in the code, making this action impossible.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Objective'}
				body={() => (
					<div id='objective'>
						<br></br>
						<p>
							&emsp;The Immutable Organization is a decentralized autonomous organization (DAO). The objective of this Organization is to build
							and manage a platform to store information permanently. A single entity will not control this organization; The DAO contract will
							decentralize its ownership, and its token holders will decide every action the organization takes.
						</p>
						<br></br>
						<p>
							&emsp;The Organization will aim to make posts as permanent as the integrity of the Ethereum blockchain and to always have all
							content on this platform accessible. The platform will also include a decentralized chat application enabling users to communicate
							with each other. The Immutable Organization will own these two products. Nothing is permanent in a long enough timeframe, but we can
							get close.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Risks and Analysis'}
				body={() => (
					<div id='risks'>
						<br></br>
						<p>
							&emsp; There are a few risks to the Organization and its permanent posts. The first risk is on the blockchain layer, where posts are
							stored. Ethereum / Arbitrum validators can agree to reject all transactions to the app’s contracts, all transactions for the DAO’s
							votes, and all token transactions. This type of attack would render the application useless, and the DAO would be unable to
							function.
						</p>
						<br></br>
						<p>
							&emsp; Proxy contracts will defend the application at the blockchain layer; The Organization will deploy these proxy contracts to
							serve as a middleman for all contract calls. If the Post contract gets blacklisted, another can take its place on the site while the
							previous one remains supported. The proxy defense is the same for the DAO token; we can wrap the token with another contract to
							maintain the functionality of the DAO. This is a cat-and-mouse game that no one can win, but we can never be truly stopped here.
						</p>
						<br></br>
						<p>
							&emsp; A web3 provider is a server that runs one or many Ethereum nodes to communicate with the blockchain. Communication with the
							blockchain requires a node, and it is inaccessible by HTTP requests in the browser. Metamask is a web3 provider, and it sends
							requests from a website such as https://www.immutable.lol/ to read and write to the blockchain. Metamask has stated publicly that
							they have blocked websites and that if this happened to the Posts app, it would make content inaccessible.
						</p>
						<br></br>
						<p>
							&emsp; If web3 providers such as Metamask or Infura restrict access to the site and the Organization’s contracts, the first step to
							avoid this restriction would be to accept more API providers. If this fails, the Organization must create its own provider and
							manage it. A decentralized solution to this would align with our goals.
						</p>
						<br></br>
						<p>
							&emsp; When ownership of the Organization is transferred to the DAO, the integrity of the application is at risk from the actions of
							DAO members and how they choose to vote on proposals. Infighting and bad actors can pose a significant threat to our objectives.
						</p>
						<br></br>
						<p>
							&emsp; In order to minimize risks from inside the Organization, control over data posted by users would be little to none. There
							will never be a “delete” option for posts; it will never be built into any of the Organization’s smart contracts or app code.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Posts'}
				body={() => (
					<div id='posts'>
						<br></br>
						<p>
							&emsp; The post-app store’s users’ post data in a smart contract. Instead of a traditional web server to host content, posts can be
							read and written on-chain, which decentralizes access to the content. This approach was chosen because once there have been 35
							confirmations of a transaction on the Ethereum mainnet, the data will be immutable for the chain’s lifespan.
						</p>
						<br></br>
						<p>
							&emsp; Traditionally a web company pays the cost of hosting a post; however, this method shifts the costs to the user. Write
							transactions sent to a smart contract require a one-time gas fee so that a block validator will execute the smart contract code and
							process the transaction. Arbitrum significantly lowers this fee and makes writes on the application more accessible. Data is posted
							publicly on the blockchain, so reading transactions require no fee. Storing all types of information in a contract is not possible
							or efficient. A system is currently being developed to store content that is not text.
						</p>
						<br></br>
						<p>
							&emsp; The post application supports posts and replies to them as well. Any user can create a post, and any post can be a reply to
							any post. The post-contract was designed to be general and permanent. This generalizability in the design allows for low gas fees
							per post and high flexibility for the organization of posts on the site. Posts are stored in the post smart contract. The data
							stored in a post is the title, body, creator, timestamp of block creation, its id in the array of posts, and the id of its parent.
						</p>
						<br></br>
						<div className='picandexplanation'>
							<div className='divider'>
								&emsp;When a post is created, it is inserted into an array of posts stored in the contract. The post id is mapped to the post’s
								data, allowing O(1) time to fetch a post.
							</div>
							<img className='divider' src='https://ipfs.io/ipfs/QmbU6UvtGEPTUG9PAEX3HpgDQfZi8HXLAKrGanzeNeQ9KD?filename=id_to_post.png' />
							<div className='divider'>
								&emsp;When replying to a post, each post id is mapped to an array of reply ids. These mappings are stored in the contract as
								well. When a new post is created as a reply to an existing post, the id of this new post is stored into the mapping of reply
								id’s for that post.
							</div>
							<img className='divider' src='https://ipfs.io/ipfs/QmXc5zAx5ERZDwqkJ7gApax9ikh5o7tM8U6SGjooHkmC2x?filename=new_reply.png' />
							<div className='divider'>
								&emsp;To fetch the replies for a post using its post id, for example we are fetching replies for post 1. The mapping of reply
								id’s for post 1 will be accessed. Each reply id r, then will be used to fetch its associated post by using r as post id in the
								mapping of post id's to post data. Iterating over all elements in the set of reply id’s will build the list of replies to the
								post.
							</div>
							<img className='divider' src='https://ipfs.io/ipfs/QmQXpqWWRRyrU3agtqPAyV9urk8Rk4MNW7avyHS2rVBKtN?filename=get_reply.png' />
							<div className='divider'>
								&emsp;The posts and replies form a post tree. This structure allows us to recursively fetch all post replies with only the
								parent post id. All replies can be fetched until there are no more nodes that exist with replies to go over.
							</div>
							<img className='divider' src='https://ipfs.io/ipfs/QmTAYXBq42EQdjTA6K3sLJXjyzkMxkg88VRwsnQt5ThS1W?filename=post_tree.png' />
						</div>
						<br></br>
						<p>
							&emsp; The post and replies allow for posts to be organized into subsets of posts, which is a branch in the tree of post nodes. On
							the posts app, navigation through a post subset can be achieved by traversing through this branch, where each page is a post. The
							parent field in the post data type allows for bottom-up traversal of the posts tree, starting from a reply node. Therefore we have
							created a structure that will enable the bidirectional traversal of all posts in the contract by only knowing one post id.
						</p>
						<br></br>
						<br></br>
						<p>
							&emsp; The creator of a post has the option to lock a post anytime. If a post is locked, users cannot create a new post to reply to
							this locked post. Existing replies to this locked post are unaffected because they are immutable. The lock allows the post creator
							to lock a branch of posts in the tree to their own set of posts. This system allows anyone to organize posts in a branch with the
							purpose of representing any arbitrary section of content.
						</p>
						<br></br>
						<br></br>
						<p>
							&emsp; Helper contracts can implement all feature upgrades to the posts in the app. Deploying helper contracts instead of upgrading
							and re-deploying the main post contract will maintain its immutability. An example of a possible proposed feature is updating posts.
							Instead of upgrading the post-contract, the Organization will deploy an update contract. This update contract would store the post
							updates and pointers to the original post; then, on the app, the user would choose whether to fetch the original posts or the
							updated version.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Chat'}
				body={() => (
					<div id='chat'>
						<br></br>
						<p>
							&emsp; The Chat app is an anonymous real-time socket server where users can send messages to any group or user and create any group
							for users to message in. It is hosted on a single server, and all connections are handled through that server. It is stateless,
							meaning that nothing is saved. In the future, there will be an identity option where users can verify themselves and send verified
							messages. Ultimately this chat app will be decentralized and peer-to-peer. It will not be hosted on any central server, which would
							let users always access the app and message each other.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Decentralization'}
				body={() => (
					<div id='decentralization'>
						<br></br>
						<p>
							&emsp; There are a few steps to decentralize the post app. The first is to handle the front end, where users access the app from
							their browser. To decentralize the front end of the website, we will upload it to the IPFS network and pin it. We will also provide
							a local build so anyone can access the front end from their machine. The InterPlanetary File System (IPFS) is a decentralized
							distributed network of nodes. Nodes in this network can store files, and copies of these files are cached on other nodes' computers.
							IPFS implements content-based addressing, where a file can be found by its contents instead of its name or location. When a file is
							requested, a node fetches and returns the file. Files stored on IPFS are immutable, so users are guaranteed the selected version of
							the application. Nodes on IPFS might only want to host our website for a while, and when the nodes in the network want to clear up
							space for new files by emptying their cache, nodes will remove the website. Pinning on IPFS is an action a node can take to signal
							to the node/network that nodes should not remove this file from their cache. When the posts app is uploaded to IPFS, the
							Organization will pin it, ensuring immutability and permanence. The Organization plans to operate its own IPFS node in the network
							to ensure the site remains pinned and available. This will make the application's front end available for all users, even if taken
							down from the primary hosting provider on the centralized web.
						</p>
						<br></br>
						<p>
							&emsp; The Ethereum Naming Service (ENS) is the blockchain equivalent of the Domain Name System (DNS). DNS maps human-readable
							addresses such as https://www.immutable.lol/ to the IP address of the website. The DAO owns the ENS name immutableapp.eth. The ENS
							will be an entry point for users to access the application outside web2. This ENS will point to our front end that exists on IPFS.
							The only backend for this application is the posts contract, which is already decentralized. Combining these, the application's
							lifespan and resilience to takedowns have increased significantly.
						</p>
						<br></br>
						<p>
							&emsp; The Organization will take a similar but different approach to decentralize the chat application. The front end will be
							hosted to IPFS, like the posts app, to guarantee access to the chat client. Each client that connects to the chat app will join the
							chat network. Clients in this chat network will be called nodes. A gossip protocol is a set of communication rules for clients in a
							peer-to-peer network. It allows nodes to share information about themselves with other nodes they know on the network in order to
							reach a synchronized list of nodes on the network. Each node will maintain its list of other nodes it knows of in the network. Nodes
							will periodically send and receive messages from nodes consisting of the list of nodes they know of in the network. When a message
							is received, a node will update its list accordingly and connect to any new nodes. After enough messages are sent back and forth,
							the nodes will reach a synchronized state of clients.
						</p>
						<br></br>
						<p>
							&emsp; The chat app will be decentralized; each user will connect to the chat network and discover the rest of the clients on the
							network. Each chat client will build its own list of users in the app. A node can only send and receive messages from nodes they are
							connected to. For chat clients to discover each other, they need a connection to an initial node that will always be online to
							gossip with other peers in the network. This initial node will be identical to all others and have no special privileges.
						</p>
						<br></br>
						<div className='picandexplanation'>
							<img src='https://ipfs.io/ipfs/QmZAAPQgyt8DEKyorrfaNqYwnAnWJafhL7PPBo8AjJLQyP?filename=gossip_initial_conenction.png' />
							&emsp;* Node n requesting to join the network. Node n will broadcast a request to join the network, the initial node will reply with
							its list of peers and the communications will begin.
						</div>
						<br></br>
						<p>
							&emsp; After this initial connection, the chat node will receive a list (could be partial) of all of the nodes in the network. This
							initial peer will first be one node managed by the organization (and run forever). This initial node is necessary when clients are
							unsure what node to connect to join the network. Users can connect to any node. However, they must know which nodes exist to
							connect.
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'Token'}
				body={() => (
					<div id='token'>
						<br></br>
						<p>
							&emsp; Immutable Token is used for governance of the Immutable Organization. It is an ERC 20 Token minted on the Ethereum
							blockchain. It has a fixed supply of 20,000,000 tokens. This token grants ownership of the DAO to its holders. This ownership grants
							token holders the power to propose and vote on actions the organization will take autonomously.
						</p>
						<br></br>
						<p>
							&emsp; The Immutable Token grants dividends to its holders. A smart contract will distribute all revenue collected by any smart
							contracts operated by the Immutable Organization proportionally to all token holders.
						</p>
						<br></br>
						<p>
							&emsp; Immutable Token is distributed as follows, 49% of IMT is publicly available to trade in the Liquidity Pool. 20% of IMT will
							go to the Organization's founders. 11% of the IMT tokens will sit in the Organization treasury.
							<br></br>
						</p>
						<br></br>
						<p>
							&emsp; The remaining 20% will be under the control of the Organization until further progress has been made for phase 1.0. As phase
							1.0 comes near completion, it will be decided if this remaining amount will be burned or added to the liquidity pool. The goal for
							this remaining 20% is an equitable and fair distribution.
							<br></br>
						</p>
						<br></br>
						<p>
							<sub>**percentages are of the total token supply.</sub>
							<br></br>
						</p>
						<br></br>

						<p>
							IMT chart:{' '}
							<a target='_blank' href='https://www.dextools.io/app/en/arbitrum/pair-explorer/0x36a524072f8f2ec359428df28e7ec169d3a82807'>
								DEXTools link.
							</a>
						</p>
						<br></br>

						<p>
							The contract is verified on the Ethereum mainnet{' '}
							<a target='_blank' href='https://etherscan.io/token/0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e'>
								0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e
							</a>
						</p>
						<br></br>
						<p>
							Bridged to Arbitrum at{' '}
							<a target='_blank' href='https://arbiscan.io/token/0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1'>
								0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1
							</a>
						</p>
						<br></br>
					</div>
				)}
			/>

			<Frame
				headerText={'INFO'}
				body={() => (
					<>
						This document will be updated as the organization progresses through Phase 1.0 and beyond.
						<br></br>
						<br></br>
						<a target='_blank' href='https://www.immutable.lol/token'>
							<h1>Click here to buy {token_name}</h1>
						</a>
						<br></br>
						<div className='socials'>
							<a className='social-icon-container twitter' href='https://twitter.com/ImmutableOrg' target='_blank' rel='noopener noreferrer'>
								<img
									src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/twitter-brands.svg'
									className='icon'
								/>
								<h1>Twitter</h1>
							</a>
							<a className='social-icon-container discord' href='https://discord.gg/kCsQUJR7U4' target='_blank' rel='noopener noreferrer'>
								<img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/discord.svg' className='icon' />
								<h1>Discord</h1>
							</a>
						</div>
					</>
				)}
			/>
		</div>
	);
};
export default Whitepaper;
