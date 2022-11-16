import { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import { useAccount } from "wagmi";
import { useGetPostLocked } from "../../ContractHooks/useGetPostLocked";
import { useGetReplies } from "../../ContractHooks/useGetReplies";
import { useNewPost } from "../../ContractHooks/useNewPost";
import { useTogglePostLock } from "../../ContractHooks/useTogglePostLock";
import { contractGetRepliesSerializer, contractLockStatusSerializer, ContractPost, ContractReplies } from "../../interfaces/interfaces";
import { PopupContext } from "../../pages/_app";
import { BaseLink } from "../BaseLink";
import { Frame } from "../Frame";
import { MetaMask } from "../Modals/MetaMask";

interface iPostFrame {
    post: ContractPost;
    _post_id: number;
    pageRootPost: number;
}

export const PostFrame: React.FC<iPostFrame> = ({ post, _post_id, pageRootPost }) => {
    const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);
    const [repliesRefetchCounter, setRepliesRefetchCounter] = useState<number>(0);
    const [replies, setReplies] = useState<ContractReplies>();
    const account = useAccount({});

    const [openCreateReply, setOpenCreateReply] = useState<boolean>(false);

    const getReplies = useGetReplies(Number(_post_id), 0, 100);
    const fetchReplies = async () => {
        const { data } = await getReplies.refetch();
        setRepliesRefetchCounter(repliesRefetchCounter + 1);
        // check if all empty
        const _replies: ContractReplies = contractGetRepliesSerializer(data);
        if (_replies.replies[0].title === '') {
            setReplies(undefined);
            const connectErrorMessage = `No replies!`;
            setToastMessage(connectErrorMessage);
            setOpenToast(true);
            setToastType('failure');
        } else {
            setReplies(_replies);
        }
    }

    const fetchPostLocked = async () => {
        const { data } = await getPostLocked.refetch();
        setPostLocked(contractLockStatusSerializer(data));
    }

    const [replyTitle, setReplyTitle] = useState<string>("");
    const [replyBody, setReplyBody] = useState<string>("");
    const newReply = useNewPost(Number(_post_id), replyTitle, replyBody);

    const [postLocked, setPostLocked] = useState<boolean>(false);
    const getPostLocked = useGetPostLocked(Number(_post_id));
    const togglePostLock = useTogglePostLock(Number(_post_id), !postLocked);

    const replyPost = async () => {
        if (newReply.write) {
            newReply.write();
            setReplyTitle("");
            setReplyBody("");
        }
    }

    return (
        post &&
        <>
            <Frame headerText={`${_post_id} / ${post.title} / ${post.blockNumber}`} body={() =>
                <div className="frameBody-padding ">
                    {post.creator}
                    <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm, remarkGemoji]}>{post.body}</ReactMarkdown>
                </div>
            } />


            {_post_id === pageRootPost &&
                <>
                    {account.address === post.creator &&
                        <Frame headerText={"Post Lock Control"} body={() =>
                            <div className="frameBody-padding ">
                                <br></br>
                                <h2>
                                    Post is {postLocked ? "locked" : "unlocked"}.
                                </h2>
                                <br></br>                                <br></br>
                                <input type='button' className="button" value="Fetch post lock status" onClick={() => fetchPostLocked()} />
                                <br></br>                                <br></br>
                                <input type='button' className="button" value={`${(!postLocked ? "Lock" : "Unlock")}  post`} onClick={() => {
                                    if (togglePostLock.write) {
                                        togglePostLock.write();
                                    }
                                }} />
                                <br></br>
                                <br></br>

                            </div>
                        } />
                    }
                    <Frame headerText={"Reply to post"} body={() =>
                        <div className="new-post frameBody-padding ">
                            <input type='button' className="button" value={openCreateReply ? 'CLOSE' : 'REPLY'} onClick={() => setOpenCreateReply(!openCreateReply)} />
                        </div>
                    } />

                    {openCreateReply &&
                        <>
                            {!account.connector?.ready ?
                                (
                                    <MetaMask />
                                )
                                :
                                (
                                    <>
                                        <Frame headerText='Reply' body={() =>
                                            <div className="new-post frameBody-padding">
                                                <input type='text' placeholder='title...' className="text_input terminal-input" value={replyTitle} onChange={(e) => setReplyTitle(e.target.value)} />
                                                <textarea rows={10} placeholder="body..." className="text_input terminal-input" onChange={(e) => setReplyBody(e.target.value)} >{replyBody}</textarea>
                                                <input type='button' value='Reply' className="button" onClick={() => replyPost()} />
                                            </div>
                                        } />

                                    </>
                                )}
                        </>
                    }
                    <Frame headerText={"Replies"} body={() =>
                        <div className="new-post frameBody-padding">
                            <input type='button' value='Fetch Replies' className="button" onClick={() => fetchReplies()} />
                        </div>
                    } />
                </>
            }
            {repliesRefetchCounter > 0 && replies === undefined ?
                (
                    <Frame headerText={"No Replies"} body={() => <div className="frameBody-padding">
                        Try Again Later
                    </div>} />
                )
                :
                (
                    replies && replies.replies.length > 0 &&
                    <>
                        {replies.replies.map((reply, index) => (
                            <>
                                {reply.title != '' &&
                                    <div key={index}>
                                        <PostFrame post={reply} _post_id={reply._id} pageRootPost={_post_id} />
                                        {reply._id !== post.parent &&
                                            <BaseLink href={`/posts/${reply._id}`} as={undefined}>
                                                <a className="button new-post">View</a>
                                            </BaseLink>
                                        }
                                    </div>
                                }
                            </>
                        ))}
                    </>
                )
            }

        </>
    )
}
