import avatar from '../assets/avatar.webp'
import {MdCallEnd} from "react-icons/all.js";
import {useEffect, useState} from "react";
import {DEBUG} from "../core/Config.js";
import JsSIP from "@siwting/jssip";

const OutgoingCall = () => {

    const [endUserSession,setEndUserSession] = useState(null);

    const _onSipConnected = (e) => {}
    const _onSipDisConnected = (e) => {}
    const _onSipRegistered = (e) => {}
    const _onSipUnRegistered = (e) => {}
    const _onSipRegistrationFailed = (e) => {}
    const _onNewSession = (e) => {}

    const connectToSIP = () => {
        if (DEBUG) {
            JsSIP.debug.enable('JsSIP:*');
        } else {
            JsSIP.debug.disable('JsSIP:*');
        }


        let socket = new JsSIP.WebSocketInterface('wss://smartcall-dev.htcinc.com:8089/ws');
        let configuration = {
            sockets: [socket],
            uri: `sip:1004@smartcall-dev.htcinc.com`,
            password: '1004',
            register: true
        };
        let uatemp = new JsSIP.UA(configuration);
        uatemp.on('connected', _onSipConnected);
        uatemp.on('disconnected', _onSipDisConnected);
        uatemp.on('registered', _onSipRegistered);
        uatemp.on('unregistered', _onSipUnRegistered);
        uatemp.on('registrationFailed', _onSipRegistrationFailed);
        uatemp.on('newRTCSession', _onNewSession);

        uatemp.start()


        const eventHandlers = {
            'progress': function(e) {
                console.log('call is in progress');
            },
            'failed': function(e) {
                window.close();
            },
            'ended': function(e) {
                window.close();
            },
            'confirmed': function(e) {
                console.log('call confirmed');
            }
        };

        const options = {
            'eventHandlers'    : eventHandlers,
            'mediaConstraints' : { 'audio': true,'video':true }
        };

        const session = uatemp.call('sip:1000@smartcall-dev.htcinc.com', options);
        setEndUserSession(session);
    }

    const endCall = () => {
        if(endUserSession){
            endUserSession.terminate();
            window.close();
        }
    }

    useEffect(() => {
        connectToSIP()
    },[])


    return (
        <div className={'bg-white h100 w-full flex flex-col'}>
            <div className={'flex-1 flex items-center justify-center flex-col'}>
                <img src={avatar} alt={'Avatar'} style={{borderRadius: '50%'}} width={100} height={100}/>
                <div className={'mt-4'}>
                    <span className={''}>Call to our agent</span>
                </div>
            </div>
            <div className={'p-2 flex'} style={{background:'#f2f2f2'}}>
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