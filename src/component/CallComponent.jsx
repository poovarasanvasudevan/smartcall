import {memo, useCallback, useEffect, useRef, useState} from "react";
import JsSIP from "@siwting/jssip";
import {useAtom} from "jotai";
import {currentCall, currentCallState, sipStatus} from "../core/GlobalState.js";
import {EventBus, Store} from "../core/AppUtils.js";
import calltone from "../assets/incomming_call.mp3";
import {ATTEN_CALL, CALL_STATE, END_CALL} from "../core/Config.js";

export const CallComponent = memo(() => {

    const audioRef = useRef(null)
    const callToneAudio = useRef()

    const [status, setSipStatus] = useAtom(sipStatus)
    const [callData, setCurrentCall] = useAtom(currentCall)
    const [callState,setCallState] = useAtom(currentCallState)


    const [call, setLocalCallState] = useState(null)
    const [ua, setUa] = useState(null)

    const _toggleAudio = (type) => {
        if (type === 0) {
            callToneAudio.current.muted = true
            callToneAudio.current.pause()
        } else {
            callToneAudio.current.muted = false
            callToneAudio.current.play()
        }
    }

    const _onAttenCallEvent = (e) => {
        document.getElementById("attendCall").click();
    }
    const _onEndCallEvent = (e) => {
        document.getElementById("endButton").click();
    }
    const subscribeEvents = () => {
        EventBus.$on(ATTEN_CALL, _onAttenCallEvent)
        EventBus.$on(END_CALL, _onEndCallEvent)
    }
    const unSubscribeEvents = () => {
        EventBus.$remove(ATTEN_CALL, _onAttenCallEvent)
        EventBus.$remove(END_CALL, _onEndCallEvent)
    }

    const onSipConnected = () => {
        setSipStatus("Connected")
    }
    const onSipDisConnected = () => {
        setSipStatus("Disconnected")
    }
    const onSipRegistered = () => {
        setSipStatus("Registered")
    }
    const onSipUnRegistered = () => {
        setSipStatus("UnRegistered")
    }
    const onSipRegistrationFailed = () => {
        setSipStatus("RegistrationFailed")
    }

    const onIncomingCallEnded = (e) => {
        setCurrentCall(null)
        setLocalCallState(null)

        audioRef.current.srcObject = null
        _toggleAudio(0)
        EventBus.$dispatch("EndCall", {})
        Store.remove("CurrentCall")
        setCallState(CALL_STATE.ENDED)
    }

    const onIncomingCallAccepted = (e) => {
        setCallState(CALL_STATE.ACCEPTED)
        _toggleAudio(0)
    }
    const onIncomingCallFailed = (e) => {
        _toggleAudio(0)
        onIncomingCallEnded()
        setCallState(CALL_STATE.FAILED)
    }

    const onIncomingCall = (e) => {
        let c = {
            callId: e.request.call_id,
            ...e.request.from
        }
        Store.set("CurrentCall", c)
        setCurrentCall(c)
        setLocalCallState(e)
        setCallState(CALL_STATE.RINGING)
        _toggleAudio(1)
    }

    const onAddStream = (e) => {
        audioRef.current.srcObject = e.stream
        audioRef.current.play();
    }

    const onNewSession = (e) => {
        if (e.session._direction === "incoming") {
            e.session.on('ended', onIncomingCallEnded)
            e.session.on('accepted', onIncomingCallAccepted)
            e.session.on('failed', onIncomingCallFailed)
            e.session.on('addstream', onAddStream)

            onIncomingCall(e)
        }
    }

    const attenCall = () => {
        if (call != null) {
            const callOptions = {
                mediaConstraints: {
                    audio: true, // only audio calls
                    video: false
                },
                pcConfig: {
                    iceTransportPolicy: "all",
                    rtcpMuxPolicy: "negotiate"
                }
            }

            _toggleAudio(0)
            call.session.answer(callOptions)
            setCallState(CALL_STATE.ACCEPTED)
        }
    }


    const endCall = () => {
        if (call != null) {
            call.session.terminate()
            onIncomingCallEnded()
        }
    }

    useEffect(() => {
        JsSIP.debug.disable('JsSIP:*');
        subscribeEvents()

        let socket = new JsSIP.WebSocketInterface('wss://smartcall-dev.htcinc.com:8089/ws');
        let configuration = {
            sockets: [socket],
            uri: 'sip:1000@smartcall-dev.htcinc.com',
            password: '1000',
            register: true
        };
        let uatemp = new JsSIP.UA(configuration);
        uatemp.on('connected', onSipConnected);
        uatemp.on('disconnected', onSipDisConnected);
        uatemp.on('registered', onSipRegistered);
        uatemp.on('unregistered', onSipUnRegistered);
        uatemp.on('registrationFailed', onSipRegistrationFailed);
        uatemp.on('newRTCSession', onNewSession);

        uatemp.start()
        uatemp.register()

        setUa(uatemp)

        window.addEventListener("beforeunload", unloadCallback);

        return () => {
            unSubscribeEvents()
            window.removeEventListener("beforeunload", unloadCallback);
        }
    }, [])

    const unloadCallback = (event) => {
        if(Store.contains("CurrentCall")) {
            event.preventDefault();
            event.returnValue = "";
            return "";
        }
    };

    return (
        <div className={'hidden'}>
            <audio ref={callToneAudio}
                   src={calltone}
                   loop={true} id="calltone"
                   muted={true}
                   preload="auto"/>
            <audio ref={audioRef} id={'userAudio'} autoPlay={true}/>
            <button id={'attendCall'} onClick={attenCall}>Atten</button>
            <button id={'endButton'} onClick={endCall}>End</button>
        </div>
    )
})