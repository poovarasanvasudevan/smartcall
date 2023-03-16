import avatar from '../assets/avatar.webp'
import {MdCallEnd} from "react-icons/all.js";
import {useEffect, useRef, useState} from "react";
import {CALL_STATE, DEBUG, makeSipUri, WSS_SERVER} from "../core/Config.js";
import JsSIP from "@siwting/jssip";
import {useSearchParams} from "react-router-dom";
import {useStateWithRef} from "../core/hooks.js";

const OutgoingCall = () => {

    const [endUserSession, setEndUserSession] = useStateWithRef(null);
    const [callStatus, setCallStatus] = useStateWithRef(CALL_STATE.CALLING);
    const audioRef = useRef(null)
    const [params, setParams] = useSearchParams();

    const onAddStream = (e) => {
        console.log("Stream Added")
        audioRef.current.srcObject = e.stream
        audioRef.current.play();
    }
    const _onSipConnected = (e) => {
        console.log("SIP Connected")
    }
    const _onSipDisConnected = (e) => {
        console.log("SIP Dis Connected")
    }
    const _onSipRegistered = (userAgent, ext) => {
        console.log("SIP Registered")
        callUser(userAgent, ext)
    }
    const _onSipUnRegistered = (e) => {

        console.log("SIP UnRegistered")
    }
    const _onSipRegistrationFailed = (e) => {
        console.log("SIP Registered Failed")
    }
    const _onNewSession = (e) => {
        if (e.session._direction === "outgoing") {
            e.session.on('peerconnection', () => {
                e.session.connection.addEventListener('addstream', onAddStream)
            })
            e.session.on('addstream', onAddStream)
        }
    }
    const closeWindow = () => {
        // setTimeout(() => {
        //     window.close()
        // }, 3000);
    }
    const connectToSIP = (ext) => {
        if (DEBUG) {
            JsSIP.debug.enable('JsSIP:*');
        } else {
            JsSIP.debug.disable('JsSIP:*');
        }

        let socket = new JsSIP.WebSocketInterface(WSS_SERVER);
        let configuration = {
            sockets: [socket],
            uri: makeSipUri(1001),
            password: '1001',
            register: true,
            display_name: params.get("username")
        };
        let uatemp = new JsSIP.UA(configuration);
        uatemp.on('connected', _onSipConnected);
        uatemp.on('disconnected', _onSipDisConnected);
        uatemp.on('registered', () => _onSipRegistered(uatemp, ext));
        uatemp.on('unregistered', _onSipUnRegistered);
        uatemp.on('registrationFailed', _onSipRegistrationFailed);
        uatemp.on('newRTCSession', _onNewSession);

        uatemp.start()

    }
    const callUser = (userAgent, ext) => {

        const eventHandlers = {
            'progress': function (e) {
                setCallStatus(CALL_STATE.CALLING)
            },
            'failed': function (e) {
                setCallStatus(CALL_STATE.FAILED)
                closeWindow()
            },
            'ended': function (e) {
                setCallStatus(CALL_STATE.ENDED)
                closeWindow()
            },
            'confirmed': function (e) {
                setCallStatus(CALL_STATE.ACCEPTED)
                console.log('call confirmed');
            }
        };

        const options = {
            'eventHandlers': eventHandlers,
            'mediaConstraints': {'audio': true, 'video': false}
        };

        const session = userAgent.call(makeSipUri(ext), options);

        session
            .connection
            .addEventListener('addstream', function (e) {
                onAddStream(e)
            });
        setEndUserSession(session);
    }
    const endCall = () => {
        if (endUserSession) {
            endUserSession.terminate();
            closeWindow();
        }
    }
    const unloadCallback = (e) => {
        e.preventDefault();
        endCall();
        return e.returnValue = 'Are you sure you want to close?';
    }

    useEffect(() => {
        connectToSIP(params.get('ext'))
        window.addEventListener("unload", unloadCallback);

        return () => {
            endCall();
            return window.removeEventListener("unload", unloadCallback);
        }
    }, [])

    const callStateDescription = (callStatus) => {
        switch (callStatus) {
            case CALL_STATE.CALLING:
                return "Calling Agent..."
            case CALL_STATE.ACCEPTED:
                return "Call Connected to Agent..."
            case CALL_STATE.ENDED:
                return "Call Ended..."
            case CALL_STATE.FAILED:
                return "Failed to Connect..."
            default:
                return "Connecting..."
        }
    }


    return (
        <div className={'bg-white h100 w-full flex flex-col'}>
            <audio ref={audioRef} id={'userAudio'} className={'hidden'} autoPlay={true}/>
            <div className={'flex-1 flex items-center justify-center flex-col'}>
                <img src={avatar} alt={'Avatar'} style={{borderRadius: '50%'}} width={100} height={100}/>
                <div className={'mt-4 flex flex-col'}>
                    <div className={''}>Call to our agent</div>
                    <div className={'font-semibold'}>{callStateDescription(callStatus)}</div>
                </div>
            </div>
            <div className={'p-2 flex'} style={{background: '#f2f2f2'}}>
                <div className={'flex-1'}></div>
                <button
                    onClick={endCall}
                    className={'flex bg-red-500 px-2 py-1 rounded items-center text-white mx-2'}>
                    <MdCallEnd/>
                    &nbsp; &nbsp;End Call
                </button>
            </div>
        </div>
    )
}

export default OutgoingCall