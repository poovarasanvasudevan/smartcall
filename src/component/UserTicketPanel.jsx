import {Tabs} from "antd";
import OpenTicketPanel from "./OpenTicketPanel.jsx";


const UserTicketPanel = () => {


    const items = [
        {label: "Open Tickets",key:"item-1",children: <OpenTicketPanel />},
        {label: "Ticket History",key:"item-2",children:<p>Hello2</p>},
        {label: "Email History",key:"item-3",children:<p>Hello2</p>},
        {label: "Call History",key:"item-4",children:<p>Hello3</p>},
    ]

    return (
        <div className={'flex flex-col bg-white border border-gray-100'}>
            <Tabs
                tabBarStyle={{background:'var(--header-color)',color: '#fff',height:"2.2rem"}}
                size={'small'}
                items={items}
            />
        </div>
    )
}

export default UserTicketPanel