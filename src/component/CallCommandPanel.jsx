import {DialerButton} from "./DialerButton";
import {BiTransfer, FiMic, FiMicOff, FiMoreVertical, FiPause, FiPlay} from "react-icons/all";
import {Space} from "antd";
import {useAtom} from "jotai";
import {callPropAtom, currentCallState, transferDialogAtom} from "../core/GlobalState.js";
import {EventBus} from "../core/AppUtils.js";
import {CALL_STATE, HOLD_CALL, MUTE_CALL} from "../core/Config.js";

const CallCommandPanel = () => {

    const [callState] = useAtom(currentCallState)
    const [callProp] = useAtom(callPropAtom)
    const [transferPanel, setTransferPanel] = useAtom(transferDialogAtom)

    const onToggleMute = () => {
        EventBus.$dispatch(MUTE_CALL, {})
    }

    const onToggleHold = () => {
        EventBus.$dispatch(HOLD_CALL, {})
    }

    return (
        <>
            {callState === CALL_STATE.ACCEPTED && (
            <Space size={'middle'} className={'px-6 rounded-t py-2 callcommand-panel shadow-sm'}
                   style={{background: '#222d32'}}>
                <DialerButton
                    className={'control-btn-color'}
                    hw={'w-9 h-9'}
                    onClick={onToggleMute}
                    number={callProp.isMuted ? <FiMicOff color={'#fff'} size={14} /> : <FiMic color={'#fff'} size={14}/>}
                />
                <DialerButton
                    className={'control-btn-color'}
                    hw={'w-9 h-9'}
                    onClick={() => setTransferPanel(!transferPanel)}
                    number={<BiTransfer color={'#fff'} size={14}/>}
                />
                <DialerButton
                    className={'control-btn-color'}
                    hw={'w-9 h-9'}
                    onClick={onToggleHold}
                    number={callProp.isHold ? <FiPlay color={'#fff'} size={14} /> : <FiPause color={'#fff'} size={14}/>}
                />
                <DialerButton
                    className={'control-btn-color'}
                    hw={'w-9 h-9'}
                    number={<FiMoreVertical color={'#fff'} size={14}/>}
                />
            </Space>
            )}
        </>
    )
}

export default CallCommandPanel