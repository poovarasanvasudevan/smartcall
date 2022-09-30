import {DialerButton} from "./DialerButton";
import {BiTransfer, FiMicOff, FiMoreVertical, FiPause} from "react-icons/all";
import {Space} from "antd";
import {useAtom} from "jotai";
import {currentCallState} from "../core/GlobalState.js";
import {CALL_STATE} from "../core/Config.js";

const CallCommandPanel = () => {

    const [callState] = useAtom(currentCallState)

    return (
        <>
            {callState === CALL_STATE.ACCEPTED && (
                <Space size={'middle'} className={'px-6 rounded-t py-2 callcommand-panel shadow-sm'}
                       style={{background: '#222d32'}}>
                    <DialerButton
                        className={'control-btn-color'}
                        hw={'w-9 h-9'}
                        number={<FiMicOff color={'#fff'} size={14}/>}
                    />
                    <DialerButton
                        className={'control-btn-color'}
                        hw={'w-9 h-9'}
                        number={<BiTransfer color={'#fff'} size={14}/>}
                    />
                    <DialerButton
                        className={'control-btn-color'}
                        hw={'w-9 h-9'}
                        number={<FiPause color={'#fff'} size={14}/>}
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