import { ErrorProps } from "../../pages/_app"

export const FormError: React.FC<ErrorProps> = ({ formError, setFormError }) => {


    return (
        <>
            {formError.open &&
                <div className="frame error">
                    <div className="frameHeader"><h2>ERROR</h2>
                    </div>
                    <div className="frameBody">
                        <div className="error_grid">
                            <h2>{formError.message}</h2>
                            <img src="https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/triangle-exclamation-solid.svg" />
                        </div>
                        <input type='button' className="button" value='CLOSE' onClick={() => (setFormError({ open: false, message: '' }))} />

                    </div>
                </div>
            }
        </>
    )
}