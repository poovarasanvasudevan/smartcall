import {Select} from "antd";
import {FiPhoneCall, MdNotes} from "react-icons/all";
import {useAtom} from "jotai";
import {dialpadState} from "../core/GlobalState.js";
import {useNavigate} from "react-router-dom";


const ControlPanel = () => {
    const [dialPad, setDialPad] = useAtom(dialpadState)
    const navigate = useNavigate()

    const callLogs = () => {
        navigate("/call-logs")
    }

    return (

        <div className={'flex px-3 py-2'}>
            <div className={'flex-1'}>
            </div>
            <div className={'flex'}>
                <button className={'flex bg-blue-600 px-2 py-1 items-center text-white mx-2'}
                        onClick={callLogs}>
                    <MdNotes/>
                    &nbsp; &nbsp;Call Logs
                </button>

                <Select defaultValue="lucy" style={{width: 120}}>
                    <Select.Option value="jack">Available</Select.Option>
                    <Select.Option value="lucy">Lunch</Select.Option>
                    <Select.Option value="Yiminghe">Busy</Select.Option>
                </Select>

                <button className={'flex bg-green-600 px-2 py-1 items-center text-white mx-2'}
                        onClick={() => setDialPad(!dialPad)}>
                    <FiPhoneCall/>
                    &nbsp; &nbsp;Call
                </button>
            </div>
        </div>
    )
}

export default ControlPanel