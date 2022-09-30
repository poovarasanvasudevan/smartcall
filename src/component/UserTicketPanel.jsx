import {Tabs} from "antd";


const UserTicketPanel = () => {


    const items = [
        {label: "Open Tickets",key:"item-1",children:<p>Hello1</p>},
        {label: "Ticket History",key:"item-2",children:<p>Hello2</p>},
        {label: "Call History",key:"item-3",children:<p>Hello3</p>},
    ]

    return (
        <div className={'flex flex-col bg-white border border-gray-100'} >
            <Tabs tabBarStyle={{background:'var(--header-color)',color: '#fff'}}  items={items} />

        </div>
    )
}

export default UserTicketPanel