import {FiBell} from "react-icons/fi";
import {Avatar} from 'antd'
import {memo} from "react";
import {Link} from "react-router-dom";
import {extractInitials, sipStatusColor, Store} from "../core/AppUtils.js";
import {useAtom} from "jotai";
import {sipStatus} from "../core/GlobalState.js";

const NavBar = memo(() => {

    const [sipStatus2] = useAtom(sipStatus)

    return (
        <div className={'navbar'}>
            <Link to={'/'}>
                <img
                    src={'https://servicefocus2-sbox.ctsmartdesk.com/static/images/brand/sf-logo.png?294207020821'}
                    alt={'logo'}
                    id={'navBar'}
                    width={120} height={30}
                />
            </Link>
            <div className={'flex-1'}></div>
            <div className={'navbar-controls'}>
                <div className={'mx-6'}>
                    <FiBell className={'cursor-pointer hover:text-green-700'} size={17}/>
                </div>
                <div className={'flex items-center cursor-pointer hover:bg-gray-100'}>

                    <Avatar
                        style={{backgroundColor: sipStatusColor(sipStatus2)}}>{extractInitials(Store.get("user_details").FullName)}</Avatar>

                    <div className={'flex flex-col ml-2 items-start justify-center'}>
                        <div className={'font-bold mb-0.5'}
                             style={{lineHeight: 1}}>{Store.get("user_details").FullName}</div>
                        <div className={'mt-0.5'} style={{
                            fontSize: '11px',
                            lineHeight: 1
                        }}>ID: {Store.get("user_details").NetworkLogin}</div>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default NavBar