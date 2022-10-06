import {formatCallFromSeconds} from "../core/AppUtils.js";
import {useEffect, useState} from "react";


const CallTimeCounter = () => {
    const [callTime, setCallTime] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCallTime(callTime + 1)
        }, 1000)

        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    })

    return (
        <div className={'mt-1'} style={{fontSize: 13}}>{formatCallFromSeconds(callTime)}</div>
    )
}
export default CallTimeCounter