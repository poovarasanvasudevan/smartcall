import {FiPhoneIncoming, MdCall, MdCallEnd} from "react-icons/all";
import {useAtom} from "jotai";
import {currentCall, currentCallState} from "../core/GlobalState.js";
import {EventBus, formatCallFromSeconds} from "../core/AppUtils.js";
import {ATTEN_CALL, CALL_STATE, END_CALL} from "../core/Config.js";
import {memo, useCallback, useEffect, useState} from "react";
import Draggable from "react-draggable";
import avatar from '../assets/avatar.webp'
import {Avatar} from "antd";
import CallTimeCounter from "./CallTimeCounter.jsx";


const CallPanel = memo(() => {

    const [call] = useAtom(currentCall)
    const [callState] = useAtom(currentCallState)


    const acceptCall = () => {
        EventBus.$dispatch(ATTEN_CALL, {})
    }

    const endCall = () => {
        EventBus.$dispatch(END_CALL, {})
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

                            <div className={'mt-4'} style={{fontSize: 15}}>UnKnown Number ({call._display_name})</div>
                            <div className={'text-gray-700'} style={{fontSize: 13}}>{call._display_name}</div>
                            {callState === CALL_STATE.ACCEPTED && <CallTimeCounter/>}
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