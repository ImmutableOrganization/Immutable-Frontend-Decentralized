import { LoadingProps } from "../../pages/_app"
import { Frame } from "../Frame"

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {

    const loadingBody = () => {
        return (
            <>
                Loading...
                <img src="https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/spinner-solid.svg" className="spinner" />
            </>
        )
    }
    return (
        <>
            {isLoading &&
                <Frame className="loading" headerText="Loading" body={loadingBody} />
            }
        </>
    )
}