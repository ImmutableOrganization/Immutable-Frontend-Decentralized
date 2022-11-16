import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Frame } from "../../../components/Frame";
import { PostFrame } from "../../../components/Post/PostFrame";
import { WalletHeader } from "../../../components/wallet/WalletHeader";
import { useGetPost } from "../../../ContractHooks/useGetPost";
import { ContractPost, contractPostSerializer } from "../../../interfaces/interfaces";

const Post: NextPage = () => {

    const router = useRouter();
    const { post_id } = router.query;

    const [post, setPost] = useState<ContractPost>();

    const getPost = useGetPost(Number(post_id));


    const callGetPost = async () => {
        const { data } = await getPost.refetch();
        if (data) {
            setPost(contractPostSerializer(data));
        }
    }

    useEffect(() => {
        if (post_id && !post) {
            callGetPost();
        }
    }, [post_id]);

    return (
        <div className="">
            <Head>
                <title>Post {post_id} | Permanent Post</title>
            </Head>
            <WalletHeader />
            {/* {!account.connector?.ready && <MetaMask />} */}
            <>
                {post && post.title != '' && post_id ?
                    (
                        <>
                            <PostFrame post={post} _post_id={Number(post_id)} pageRootPost={Number(post_id)} />
                        </>
                    )
                    :
                    (
                        <Frame headerText={`Post: ${post_id}`} body={() =>
                            <div className="frameBody-padding">
                                Post not found
                            </div>
                        } />
                    )
                }
            </>
        </div >
    );
};
export default Post
