import {FiBell} from "react-icons/all";
import {Avatar} from 'antd'
import {memo, useEffect} from "react";
import {Link} from "react-router-dom";
import {Store} from "../core/AppUtils.js";

const NavBar = memo(() => {

    useEffect(() => {

    }, [])

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
                <Avatar style={{backgroundColor: '#87d068'}}>JB</Avatar>
                <div className={'flex flex-col ml-2 items-start'}>
                    <div className={'font-bold'}>{Store.get("user_details").FullName}</div>
                    <div className={''} style={{fontSize: '11px'}}>ID: {Store.get("user_details").NetworkLogin}</div>
                </div>
            </div>
        </div>
    )
});
export default NavBar