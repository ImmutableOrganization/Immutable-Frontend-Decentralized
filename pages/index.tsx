import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { BaseLink } from "../components/BaseLink";
import { Frame } from "../components/Frame";
import { MetaMask } from "../components/Modals/MetaMask";
import { WalletHeader } from "../components/wallet/WalletHeader";
import { useNewPost } from "../ContractHooks/useNewPost";
import { chainID_from_chain_name, contracts, contract_exists_on_chain, default_chain } from "../utils/contract_data";
import { company_name } from "../utils/globals";


const Boards: NextPage = () => {

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const router = useRouter();
    const account = useAccount({})

    const newPost = useNewPost(0, title, body);

    const [postToViewId, setPostToViewId] = useState<string>('');
    const [openNewPost, setOpenNewPost] = useState<boolean>(false);

    const { connect, connectors } = useConnect();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = router.query
        if (account.isConnected) {
            if (params.chain) {
                if (contract_exists_on_chain(params.chain)) {
                    const chainID = chainID_from_chain_name(params.chain)
                    if (chainID) {
                        connect({ connector: connectors[0], chainId: chainID })
                    }
                } else {
                    window.location.assign(window.location.href.replace(`?chain=${params.chain}`, ""))
                }
            }
        } else {
            connect({ connector: connectors[0], chainId: default_chain().id })
        }
    }, [router.asPath])

    const createNewPost = () => {
        if (newPost.write) {
            newPost.write();
            setTitle("");
            setBody("");
        }
    };

    return (
        <div>
            <Head>
                <title>{company_name} POST</title>
            </Head>
            <WalletHeader />
            {/* {!account.connector?.ready && <MetaMask />} */}

            <div className={`boards`}>

                <div className="controls">
                    {/* {account.connector?.ready && account.address && */}
                    <>
                        <Frame headerText={"CONTRACT"} body={() =>
                            <div className="new-post">
                                <h2>Posts are available on {contracts.PostContract.chain}.</h2>
                                <br></br>
                                <h3>Post contract: <a target="_blank" href={contracts.PostContract.blockExplorer}>{contracts.PostContract.address}.</a></h3>
                            </div>
                        } />
                        <Frame headerText={"Index"} body={() =>
                            <BaseLink href={`/post?post_id=0`} as={undefined}>
                                <a className="button initial">Go to homepage</a>
                            </BaseLink>
                        } />
                        <Frame headerText={"View Post"} body={() =>
                            <div className="new-post">
                                <input type='number' placeholder='post id...' className="text_input terminal-input" value={postToViewId} onChange={(e) => setPostToViewId(e.target.value)} />
                                <BaseLink href={`/post?post_id=${postToViewId}`} as={undefined}>
                                    <a className="button">Navigate to post {postToViewId}</a>
                                </BaseLink>
                            </div>
                        } />
                        <Frame headerText={"New Post"} body={() =>
                            <div className="new-post">
                                <input type='button' className="button" value={openNewPost ? "Close" : "POST"} onClick={() => setOpenNewPost(!openNewPost)} />
                            </div>
                        } />
                        {openNewPost &&
                            <>
                                {!account.connector?.ready ?
                                    (
                                        <MetaMask />
                                    )
                                    :
                                    (
                                        <>
                                            <Frame headerText={"New Post"} body={() =>
                                                <div className="new-post">
                                                    <input type='text' placeholder='title...' className="text_input terminal-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <textarea placeholder="body..." className="text_input terminal-input" rows={10} onChange={(e) => setBody(e.target.value)} >{body}</textarea>
                                                    <input type='button' className="button" value={"NEW POST"} onClick={() => createNewPost()} />
                                                </div>
                                            } />
                                        </>
                                    )}
                            </>
                        }
                    </>
                </div>
            </div>
        </div>
    );
};



export default Boards