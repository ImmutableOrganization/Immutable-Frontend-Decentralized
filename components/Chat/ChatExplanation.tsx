import { Frame } from "../Frame"

export const ChatExplanationModal: React.FunctionComponent = () => {

    const chatExplanationBody = () => {
        return (
            <div className="explanation">
                <br />
                <h1>STATELESS AND ANONYMOUS CHAT. </h1>
                <br />
                <br />
            </div>
        )
    }

    return (
        <Frame className={"chat-explanation chat-info"} headerText="Explanation" body={chatExplanationBody} />
    )
}