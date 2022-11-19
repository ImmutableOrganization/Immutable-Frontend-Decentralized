import { NextPage } from "next";
import Head from "next/head";
import { company_name, token_name, token_symbol } from "../utils/globals";

import { Frame } from "../components/Frame";

import dynamic from 'next/dynamic'
import { Suspense } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DynamicDaoBody = dynamic(() =>
    import('../components/Token/DaoBody').then((mod) => mod.DaoBody),
    { ssr: false }
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DynamicBuyBody = dynamic(() =>
    import('../components/Token/BuyBody').then((mod) => mod.BuyBody),
    { ssr: false }
)


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
            <Suspense fallback={<div>Loading...</div>}>
                <Frame headerText="DAO" className='padding token-box' body={() =>
                    <DynamicDaoBody />
                }
                />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <Frame className={"padding token-box"} headerText={"BUY"} body={() =>
                    <DynamicBuyBody />
                }
                />
            </Suspense>
            <Frame className={"contact token-box"} headerText={"TWITTER"} body={communityBody} />
            <Frame className={"contact token-box"} headerText={"DISCORD"} body={discordBody} />
        </div>
    );
}

export default Token
