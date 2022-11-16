import { Frame } from "../Frame";

interface JoinChannelProps {
    channelName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChannelName: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleAddRoomKeyPress: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addChannel: any;

}

export const JoinChannel: React.FunctionComponent<JoinChannelProps> = ({ addChannel, channelName, setChannelName, handleAddRoomKeyPress }) => {

    const joinChannelBody = () => {
        return (
            <div className="channels">
                <br />
                THIS CHAT HAS UNLIMITED CHANNELS, JOIN / CREATE ANY CHANNEL YOU LIKE.
                <br />
                <br />
                DM OTHER USERS BY CLICKING THEIR NAMES OR ADD THEIR FULL CONNECTION ID TO THE LIST.
                <br />
                <br />

                <div className="send-message-form">
                    <input className='text_input terminal-input' type='text' placeholder="Enter channel name..." value={channelName} onKeyDown={handleAddRoomKeyPress} onChange={(e) => setChannelName(e.target.value)} />
                    <input type="button" className="button" value="<" onClick={() => addChannel()} />
                </div>
            </div>
        )
    }

    return (
        <Frame className="join-channel" body={joinChannelBody} headerText="JOIN CHANNEL" />
    )
}