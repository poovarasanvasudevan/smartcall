import {Select, Space} from "antd";
import {FiPhoneCall, MdNotes} from "react-icons/all";
import {useAtom} from "jotai";
import {dialpadState, selectedAccountAtom} from "../core/GlobalState.js";
import {useNavigate} from "react-router-dom";


const ControlPanel = () => {
    const [dialPad, setDialPad] = useAtom(dialpadState)
    const [selectedAccount] = useAtom(selectedAccountAtom)
    const navigate = useNavigate()

    const codes = [
        {label: "ACW", value: "ACW"},
        {label: "Meeting", value: "Meeting"},
        {label: "Personal Time", value: "Personal Time"},
        {label: "Special Projects", value: "Special Projects"},
        {label: "Break", value: "Break"},
        {label: "Call Back", value: "Call Back"},
        {label: "Coaching", value: "Coaching"},
        {label: "Hardware Issues", value: "Hardware Issues"},
        {label: "Lunch", value: "Lunch"},
        {label: "Pre Shift", value: "Pre Shift"},
        {label: "Problem Manager", value: "Problem Manager"},
        {label: "Shadowing", value: "Shadowing"},
        {label: "System Startup", value: "System Startup"},
        {label: "Training", value: "Training"},
        {label: "Wrap-up", value: "Wrap-up"}
    ]

    const callLogs = () => {
        navigate("/call-logs")
    }

    const outgoingCall = () => {
        window.open("/call?userid=CTS-PVASUD&client=CTS&ext=1000", 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=300,height=400');
    }

    return (

        <div className={'flex mt-3 mb-1  py-1.5 bg-white mx-6 border border-gray-100'}>
            <div className={'flex-1 pl-4 flex'}>
                {selectedAccount && (
                    <div className={'text-start font-semibold justify-center'}
                         style={{fontSize: 13, lineHeight: 1.8, textAlign: 'start'}}>
                        {selectedAccount.AccountName}
                    </div>
                )}

            </div>
            <Space className={'flex px-4'}>
                <Select defaultValue="Available" className={'border h-6'} style={{width: 180}} bordered={false}
                        size={'small'}
                        options={codes}/>

                <button className={'flex bg-blue-600 px-2 py-1 h-6 items-center text-white'}
                        onClick={callLogs}>
                    <MdNotes/>
                    &nbsp; &nbsp;Call Logs
                </button>


                <button className={'flex bg-green-600 h-6 px-2 py-1 items-center text-white'}
                        onClick={() => setDialPad(!dialPad)}>
                    <FiPhoneCall/>
                    &nbsp; &nbsp;Call
                </button>


                <button className={'flex bg-green-600 h-6 px-2 py-1 items-center text-white'}
                        onClick={outgoingCall}>
                    <FiPhoneCall/>
                    &nbsp; &nbsp;TestCall
                </button>
            </Space>
        </div>
    )
}

export default ControlPanel