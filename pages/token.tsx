import { NextPage } from "next";
import Head from "next/head";
import { company_name, token_name, token_symbol } from "../utils/globals";

import { Frame } from "../components/Frame";
import { SwapWidget, darkTheme } from "@uniswap/widgets";
import { addTokenArbitrum, addUSDCArbitrum, switchToArbitrum } from "../utils/addTokenToMetaMask";

// import dynamic from 'next/dynamic'
// import { Suspense } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const DynamicDaoBody = dynamic(() =>
//     import('../components/Token/DaoBody').then((mod) => mod.DaoBody),
//     { ssr: false }
// )
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// const DynamicBuyBody = dynamic(() =>
//     import('../components/Token/BuyBody').then((mod) => mod.BuyBody),
//     { ssr: false }
// )

const SWAP_LIST = [
    {
        "name": "USD Coin",
        "address": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        "symbol": "USDC",
        "decimals": 6,
        "chainId": 42161,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
    },
    {
        "name": `${token_name}`,
        "address": "0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1",
        "symbol": `${token_symbol}`,
        "decimals": 18,
        "chainId": 42161,
        "logoURI": "https://www.immutable.lol/token.png"

    }
]
const NATIVE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
const IMT = '0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1';

const Token: NextPage = () => {


    const buyTokenBody = () => {
        return (
            <>
                <br></br>
                <img src="https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/token.svg"
                    className='logo' />
                <h1>{token_name}</h1>
                <u><h2>${token_symbol}</h2></u>

                <h3 >AVAILABLE ON ARBITRUM</h3>
                <br></br>
            </>
        )
    }



    const communityBody = () => {
        return (
            <div className="socials">
                <a className="frameHeader social-icon-container twitter" href="https://twitter.com/ImmutableOrg" target="_blank" rel="noopener noreferrer">
                    <img src="https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/twitter-brands.svg" className='icon' />
                    <h1>Twitter</h1>
                </a>
            </div>
        )
    }

    const discordBody = () => {
        return (
            <div className="socials">
                <a className="frameHeader social-icon-container discord" href="https://discord.gg/kCsQUJR7U4" target="_blank" rel="noopener noreferrer">
                    <img src="https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/discord.svg" className='icon' />
                    <h1>Discord</h1>
                </a>
            </div>
        )
    }


    return (

        <div className="token-page">
            <Head>
                <title>{company_name}</title>
            </Head>
            <Frame headerText={"TOKEN"} className='token-box' body={buyTokenBody} />
            {/* <Frame headerText={"SWAP"} className='padding token-box' body={swapBody} /> */}
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Frame headerText="DAO" className='padding token-box' body={() =>
                <>
                    <ul>
                        <h3>
                            INFO:
                        </h3>
                        <li>
                            Immutable Token is used for governance of the Immutable Organization.
                        </li>
                        <li>
                            All fees collected by smart contracts operated by the Immutable Organization will be distributed proportionally to all token holders.
                        </li>
                    </ul>

                    <ul>
                        <h3>
                            WHITEPAPER:
                        </h3>
                        <li>
                            For an outline of the The Organizations objectives and plans, read our whitepaper.
                        </li>
                        <li>
                            <a href="https://www.immutable.lol/whitepaper" target="_blank" rel="noopener noreferrer">
                                https://www.immutable.lol/whitepaper
                            </a>
                        </li>
                    </ul>

                    <ul>
                        <h3>
                            TOKEN:
                        </h3>
                        <li>
                            ERC 20 Token.
                        </li>
                        <li>
                            TOTAL SUPPLY: 20,000,000.
                            <ul>
                                <li>ORG WALLET: 51%.</li>
                                <li> LIQUIDITY POOL: 49%.</li>
                            </ul>
                        </li>

                        <li>
                            Track IMT on DEXTools: <a target="_blank" href="https://www.dextools.io/app/en/arbitrum/pair-explorer/0x36a524072f8f2ec359428df28e7ec169d3a82807">DEXTools link.</a>
                        </li>
                        <li>
                            Arbitrum: <a target="_blank" href="https://arbiscan.io/token/0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1">0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1</a>
                        </li>
                        <li>
                            Mainnet: <a target="_blank" href="https://etherscan.io/token/0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e">0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e</a>
                        </li>
                    </ul>

                </>
            }
            />
            {/* </Suspense> */}

            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Frame className={"padding token-box"} headerText={"BUY"} body={() =>
                <>
                    <u className="buyText"> <h2 className="left-align buyText">BUY TOKEN: </h2> </u>
                    <br></br>
                    <h3 className="left-align">Token is available on Arbitrum</h3>
                    <br></br>

                    <div className="buy-and-swap">
                        <div className="buy-grid">
                            <div className="buy-grid-item">
                                <h3>
                                    <a href="https://developer.offchainlabs.com/intro" target={"_blank"} rel="noopener noreferrer">
                                        What is Arbitrum?
                                    </a>
                                </h3>

                                <img height="100%" width="100%" loading="lazy" className='icon' src={"https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/arbitrum.svg"} />
                            </div>
                            <div className="buy-grid-item">
                                <img height="100%" width="100%" loading="lazy" className='icon' src={"https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/metamask.svg"} />
                                <a target="_blank" href='https://metamask.io/download/'>
                                    <input type='button' className={`button download`} value='GET MetaMask' />
                                </a>
                            </div>
                            <div className="buy-grid-item">
                                <input type='button' className='button' value='Switch network to Arbitrum' onClick={() => switchToArbitrum()} />
                                <h3 className=""> <a href="https://chainlist.org/chain/42161" target={"_blank"} rel="noreferrer">Click here for instructions to manually connect MetaMask to Arbitrum.</a> </h3>
                            </div>
                            <div className="buy-grid-item">
                                <h3>Buy USDC and transfer it to your wallet.</h3>
                                <img height="100%" width="100%" loading="lazy" className='icon' src={"https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/usdc.svg"} />
                            </div>
                            <div className="buy-grid-item">
                                <span>
                                    <input type='button' className='button' value='Add USDC to MetaMask' onClick={() => addUSDCArbitrum()} />
                                    <h3 className=""> <a href="https://bridge.arbitrum.io/?l2ChainId=42161" target={"_blank"} rel="noreferrer">Link to Arbitrum bridge </a> </h3>
                                </span>
                                <h3>Bridge your USDC to the Arbitrum network to trade IMT</h3>
                            </div>
                            <div className="buy-grid-item">
                                <input type='button' className='button' value='Add IMT to MetaMask' onClick={() => addTokenArbitrum()} />
                                <img height="100%" width="100%" loading="lazy" className='icon' src={"https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/token.svg"} />
                            </div>
                        </div>
                        <>
                            <div className='widget'>
                                <h3 className="left-align">SWAP USDC TO IMT</h3>
                                <br></br>
                                <SwapWidget className="uniswap-container"
                                    tokenList={SWAP_LIST}
                                    defaultInputTokenAddress={NATIVE}
                                    defaultOutputTokenAddress={IMT}
                                    theme={darkTheme} />
                            </div>
                        </>
                    </div>
                </>}
            />
            {/* </Suspense> */}
            <Frame className={"contact token-box"} headerText={"TWITTER"} body={communityBody} />
            <Frame className={"contact token-box"} headerText={"DISCORD"} body={discordBody} />
        </div>
    );
}

export default Token
