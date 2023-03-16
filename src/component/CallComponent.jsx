import {memo, useEffect, useRef, useState} from "react";
import JsSIP from "@siwting/jssip";
import {useAtom} from "jotai";
import {callPropAtom, currentCall, currentCallState, sipStatus, userExtenstionAtom} from "../core/GlobalState.js";
import {EventBus, Store} from "../core/AppUtils.js";
import callTone from "../assets/incomming_call.mp3";
import {
    ATTEN_CALL,
    CALL_STATE,
    DEBUG,
    END_CALL,
    HOLD_CALL, makeSipUri,
    MUTE_CALL, OUTGOING_CALL,
    SIP_STATUS,
    TRANSFER_CALL, WSS_SERVER
} from "../core/Config.js";
import {debug} from "../core/Log.js";

export const CallComponent = memo(() => {

    const audioRef = useRef(null)
    const callToneAudio = useRef()

    const [status, setSipStatus] = useAtom(sipStatus)
    const [callData, setCurrentCall] = useAtom(currentCall)
    const [callState, setCallState] = useAtom(currentCallState)
    const [callProp, setCallProp] = useAtom(callPropAtom)
    const [userExtension] = useAtom(userExtenstionAtom)

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
    const _onHoldCallEvent = (e) => {
        document.getElementById("holdButton").click();
    }
    const _onMuteCallEvent = (e) => {
        document.getElementById("muteButton").click();
    }

    const _onCallTransferEvent = (e) => {
        document.getElementById("transferCall")
            .setAttribute("data-destination", e.extension);
        document.getElementById("transferCall").click();
    }
    const _onOutgoingCall = (e) => {
        document.getElementById("callOutgoing")
            .setAttribute("data-destination", e.number);
        document.getElementById("callOutgoing").click()
    }

    const subscribeEvents = () => {
        EventBus.$on(ATTEN_CALL, _onAttenCallEvent)
        EventBus.$on(END_CALL, _onEndCallEvent)
        EventBus.$on(MUTE_CALL, _onMuteCallEvent)
        EventBus.$on(HOLD_CALL, _onHoldCallEvent)
        EventBus.$on(TRANSFER_CALL, _onCallTransferEvent)
        EventBus.$on(OUTGOING_CALL, _onOutgoingCall)
    }
    const unSubscribeEvents = () => {
        EventBus.$remove(ATTEN_CALL, _onAttenCallEvent)
        EventBus.$remove(END_CALL, _onEndCallEvent)
        EventBus.$remove(MUTE_CALL, _onMuteCallEvent)
        EventBus.$remove(HOLD_CALL, _onHoldCallEvent)
        EventBus.$remove(TRANSFER_CALL, _onCallTransferEvent)
        EventBus.$remove(OUTGOING_CALL, _onOutgoingCall)
    }


    const onSipConnected = () => {
        setSipStatus(SIP_STATUS.CONNECTED)
    }
    const onSipDisConnected = () => {
        setSipStatus(SIP_STATUS.DISCONNECTED)
    }
    const onSipRegistered = () => {
        setSipStatus(SIP_STATUS.REGISTERED)
    }
    const onSipUnRegistered = () => {
        setSipStatus(SIP_STATUS.UNREGISTERED)
    }
    const onSipRegistrationFailed = () => {
        setSipStatus(SIP_STATUS.REGISTERED_FAILED)
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
        console.log(c)
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
        debug(e)
        if (e.session._direction === "incoming") {
            e.session.on('ended', onIncomingCallEnded)
            e.session.on('accepted', onIncomingCallAccepted)
            e.session.on('failed', onIncomingCallFailed)
            e.session.on('peerconnection', () => {
                e.session.connection.addEventListener('addstream', onAddStream)
            })


            onIncomingCall(e)
        }

        if (e.session._direction === "outgoing") {
            e.session.on('peerconnection', () => {
                console.log("Peer Confirmed")
                e.session.connection.addEventListener('addstream', onAddStream)
            })
            e.session.on('addstream', onAddStream)
        }
    }

    const toggleMute = () => {
        call.session.isMuted().audio ? call.session.unmute({
            audio: true
        }) : call.session.mute({
            audio: true
        })

        setCallProp({...callProp, isMuted: call.session.isMuted().audio})
    }

    const toggleHold = () => {
        call.session.isOnHold().local ? call.session.unhold() : call.session.hold()
        setCallProp({...callProp, isHold: call.session.isOnHold().local})
    }

    const attenCall = () => {
        if (call != null) {
            const callOptions = {
                mediaConstraints: {
                    audio: true, // only audio calls
                    video: false
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

    const transferCall = (e) => {
        let eventHandlers = {
            'failed': (e) => {
                debug("Transfer failed with cause: " + e.cause);
            },
            'progress': (e) => {
                debug("Transfer in progress");
            },
            'accepted': (e) => {
                debug("Transfer accepted");
            },
            'completed': (e) => {
                debug("Transfer completed");
            }
        }
        try {
            const ext = `sip:${e.currentTarget.getAttribute("data-destination")}@asterisk.inditechman.com`
            call.session.refer(ext, {
                eventHandlers: eventHandlers
            });
        } catch (error) {
            debug(error)
        }
    }

    const callOutgoing = (e) => {
        let eventHandlers = {
            'progress': function (e) {
                console.log('call is in progress', e);
            },
            'failed': function (e) {
                console.log('call failed with cause: ', e);
            },
            'ended': function (e) {
                console.log('call ended with cause: ', e);
            },
            'confirmed': function (e) {
                console.log('call confirmed', e);
            },
        };

        const options = {
            'eventHandlers': eventHandlers,
            'mediaConstraints': {'audio': true, 'video': false}
        };
        const ext = makeSipUri(e.currentTarget.getAttribute("data-destination"))
        const session = ua.call(ext, options);
        session.connection.addEventListener('addstream', function (e) {
            onAddStream(e)
        });
    }

    useEffect(() => {
        if (userExtension) {
            if (DEBUG) {
                JsSIP.debug.enable('JsSIP:*');
            } else {
                JsSIP.debug.disable('JsSIP:*');
            }
            subscribeEvents()

            let socket = new JsSIP.WebSocketInterface(WSS_SERVER);
            let configuration = {
                sockets: [socket],
                uri: makeSipUri("1000"),
                password: 1000,
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
        }
        return () => {
            if (userExtension) {
                unSubscribeEvents()
                window.removeEventListener("beforeunload", unloadCallback);
            }
        }
    }, [userExtension])

    const unloadCallback = (event) => {
        if (Store.contains("CurrentCall")) {
            event.preventDefault();
            event.returnValue = "";
            return "";
        }
    };

    return (
        <div className={'hidden'}>
            <audio ref={callToneAudio}
                   src={callTone}
                   loop={true}
                   id="calltone"
                   preload="auto"/>
            <audio ref={audioRef} id={'userAudio'} autoPlay={true}/>
            <button id={'attendCall'} onClick={attenCall}>Atten</button>
            <button id={'endButton'} onClick={endCall}>End</button>

            <button id={'muteButton'} onClick={toggleMute}>Mute/unmute</button>
            <button id={'holdButton'} onClick={toggleHold}>Hold/Unhold</button>
            <button id={'transferCall'} onClick={transferCall}>Hold/Unhold</button>
            <button id={'callOutgoing'} onClick={callOutgoing}>outoingCall</button>

        </div>
    )
})