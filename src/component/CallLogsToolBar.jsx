import {DatePicker} from "antd";
import {FiArrowLeft} from "react-icons/all";
import {useNavigate} from "react-router-dom";

const CallLogsToolBar = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }

    return (
        <div className={'px-3 py-1 items-center flex bg-white'}>
            <div className={'font-semibold flex items-center cursor-pointer'} onClick={back}>
                <FiArrowLeft size={18}/>
                <div className={'ml-2'}>Call Logs</div>
            </div>
            <div className={'flex-1'}>

            </div>
            <div>
                <DatePicker.RangePicker bordered={false}/>
            </div>
        </div>
    )
}
export default CallLogsToolBar