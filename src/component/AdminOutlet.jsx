import {CallComponent} from "./CallComponent.jsx";
import CallPanel from "./CallPanel.jsx";
import {Outlet} from "react-router-dom";
import {memo, useEffect} from "react";
import DialerPanel from "./DialerPanel.jsx";
import CallCommandPanel from "./CallCommandPanel.jsx";
import CallTransferDialog from "./TransferDialog";
import {useAtom} from "jotai";
import {userExtenstionAtom} from "../core/GlobalState.js";
import {getAgentDetails} from "../core/Api.js";
import {debug} from "../core/Log.js";
import {Store} from "../core/AppUtils.js";


const AdminOutlet = memo(() => {
    const tokenDetails = localStorage.getItem("token_details") != null
    const [userExtension, setUserExtension] = useAtom(userExtenstionAtom)
    useEffect(() => {
        if (!tokenDetails) {
            window.location.href = "/login"
            return
        }

        debug(Store.get("user_details")['ITSM_Login'])

        getAgentDetails(Store.get("user_details")['ITSM_Login'])
            .then((res) => {
                debug(res)
                setUserExtension(res)
            }).catch((err) => {
                debug(err)
            })


        //api call to get user details extension
    }, [])

    return (
        <>
            {userExtension && <>
                <CallComponent/>
                <CallPanel/>
                <CallCommandPanel/>
                <DialerPanel/>

            </>}

            <CallTransferDialog/>
            <Outlet/>
        </>
    )
})
export default AdminOutlet