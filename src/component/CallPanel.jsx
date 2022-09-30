import {FiPhoneIncoming, MdCall, MdCallEnd} from "react-icons/all";
import {useAtom} from "jotai";
import {currentCall, currentCallState} from "../core/GlobalState.js";
import {EventBus, formatCallFromSeconds} from "../core/AppUtils.js";
import {ATTEN_CALL, CALL_STATE, END_CALL} from "../core/Config.js";
import {memo, useCallback, useEffect, useState} from "react";
import Draggable from "react-draggable";
import avatar from '../assets/avatar.webp'
import {Avatar} from "antd";


const CallPanel = memo(() => {

    const [call] = useAtom(currentCall)
    const [callTime, setCallTime] = useState(0)
    const [callState] = useAtom(currentCallState)
    let timer = null

    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    }, [call])

    const acceptCall = useCallback(() => {
        EventBus.$dispatch(ATTEN_CALL, {})
    },[callTime])

    const endCall = () => {
        EventBus.$dispatch(END_CALL, {})
        setCallTime(0)
        clearInterval(timer)
    }

    return (
        <>
            {call !== null && (
                <Draggable bounds="parent">
                    <div className={'call-panel'}>
                        <div className={'call-header-panel cursor-pointer'}>
                            <FiPhoneIncoming size={15} color={'#fff'}/>
                            <div className={'flex-1 ml-2'} style={{textAlign: 'start'}}>
                                Incoming Call
                            </div>
                        </div>

                        <div className={'call-panel-body'}>
                            <Avatar size={72} src={avatar} width={200} height={200}/>

                            <div className={'mt-4'} style={{fontSize: 15}}>UnKnown Number</div>
                            {callTime > 0 &&
                                <div className={'mt-1'} style={{fontSize: 13}}>{formatCallFromSeconds(callTime)}</div>}
                        </div>

                        <div className={'call-footer-panel justify-center'}>

                            {callState === CALL_STATE.RINGING && (
                                <button onClick={acceptCall}
                                        className={'flex bg-green-500 px-2 py-1 rounded items-center text-white mx-2'}>
                                    <MdCall/>
                                    &nbsp; &nbsp;Answer
                                </button>
                            )}

                            {callState === CALL_STATE.ACCEPTED && (
                                <button onClick={acceptCall}
                                        className={'flex bg-blue-500 px-2 py-1 rounded items-center text-white mx-2'}>
                                    <MdCall/>
                                    &nbsp; &nbsp;Transfer
                                </button>
                            )}


                            <button onClick={endCall}
                                    className={'flex bg-red-500 px-2 py-1 rounded items-center text-white mx-2'}>
                                <MdCallEnd/>
                                &nbsp; &nbsp;End Call
                            </button>
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    )
})

export default CallPanel