import NavBar from "../component/NavBar.jsx";
import CallLogsToolBar from "../component/CallLogsToolBar.jsx";
import {
    BiAlarm,
    FiCheckCircle,
    FiClock,
    FiPercent,
    FiPhoneCall,
    FiPhoneMissed,
    MdPhoneInTalk,
    MdPhoneMissed
} from "react-icons/all";
import DashboardTile from "../component/DashboardTile.jsx";
import CallsGrid from "../component/CallsGrid.jsx";


const CallLogs = () => {

    const callMetrics = [
        {
            label: "Total Calls",
            value: 56,
            icon: <FiPhoneCall size={22} color={'#fff'}/>,
            color: '#00cfbc'
        },
        {
            label: "Answered",
            value: 30,
            icon: <FiPhoneCall size={22} color={'#fff'}/>,
            color: '#605d9a'
        },
        {
            label: "Abandoned",
            value: 56,
            icon: <FiPhoneMissed size={22} color={'#fff'}/>,
            color: '#ffcc00'
        }, {
            label: "Missed",
            value: 56,
            icon: <FiPhoneMissed size={22} color={'#fff'}/>,
            color: '#ef5242'
        }, {
            label: "FLR",
            value: 56,
            icon: <FiCheckCircle size={22} color={'#fff'}/>,
            color: '#00e676'
        }, {
            label: "Idle Time (Min.)",
            value: 56,
            icon: <FiClock size={22} color={'#fff'}/>,
            color: '#a5a5a5'
        }, {
            label: "Talk Time (Min.)",
            value: 56,
            icon: <MdPhoneInTalk size={22} color={'#fff'}/>,
            color: '#0e8fb8'
        },
        {
            label: "Scheduled Hrs",
            value: 56,
            icon: <BiAlarm size={22} color={'#fff'}/>,
            color: '#6e8b74'
        },
        {
            label: "Within SLA %",
            value: 56,
            icon: <FiPercent size={22} color={'#fff'}/>,
            color: '#64cffc'
        },
        {
            label: "Missed SLA",
            value: 56,
            icon: <MdPhoneMissed size={22} color={'#fff'}/>,
            color: '#202c33'
        },
    ]

    return (
        <div className={'flex flex-col'}>
            <NavBar/>
            <div className={'flex-1 px-6 py-3'}>
                <CallLogsToolBar/>

                <div className={'mt-2 flex flex-wrap'}>
                    {callMetrics.map(x => (
                        <div key={x.label} className={'pr-3 py-1'}>
                            <DashboardTile  {...x}/>
                        </div>
                    ))}
                </div>

                <div className={'mt-2'}>
                    <CallsGrid/>
                </div>
            </div>
        </div>
    )
}
export default CallLogs