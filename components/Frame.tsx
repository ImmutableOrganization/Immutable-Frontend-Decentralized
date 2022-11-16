
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export interface FrameProps {
    headerText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
    className?: string;
}

export const Frame: React.FC<FrameProps> = ({ headerText, body, className }) => {

    const [wasInView, setWasInView] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !wasInView) {
            setWasInView(true);
        }
    }, [inView]);

    return (

        <div ref={ref} className={"frame" + (className ? ` ${className}` : "") +
            (!inView && !wasInView ? ' hidden' : ' show')
        }
        >
            <div className="frameHeader terminalHeader">
                <h2>{headerText}</h2>
            </div>
            <div className="frameBody">
                {body()}
            </div>
        </div>
    )
}