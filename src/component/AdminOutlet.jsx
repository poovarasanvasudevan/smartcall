import {CallComponent} from "./CallComponent.jsx";
import CallPanel from "./CallPanel.jsx";
import {Outlet} from "react-router-dom";
import {memo, useEffect} from "react";
import DialerPanel from "./DialerPanel.jsx";
import CallCommandPanel from "./CallCommandPanel.jsx";
import CallTransferDialog from "./TransferDialog";


const AdminOutlet = memo(() => {
    const tokenDetails = localStorage.getItem("token_details") != null

    useEffect(() => {
        if (!tokenDetails) {
            window.location.href = "/login"
        }
    }, [])

    return (
        <>
            <CallComponent/>
            <CallPanel/>
            <CallCommandPanel/>
            <DialerPanel/>
            <CallTransferDialog />
            <Outlet/>
        </>
    )
})
export default AdminOutlet