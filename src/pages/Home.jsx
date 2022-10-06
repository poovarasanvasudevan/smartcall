import NavBar from "../component/NavBar.jsx";
import ControlPanel from "../component/ControlPanel.jsx";
import SearchPanel from "../component/SearchPanel.jsx";
import UserTicketPanel from "../component/UserTicketPanel.jsx";
import {useAtom} from "jotai";
import {userExtenstionAtom} from "../core/GlobalState.js";


const Home = () => {
    const [userExtension] = useAtom(userExtenstionAtom)
    return (
        <div className={'flex flex-col h100'}>
            <NavBar/>
            <div className={'flex flex-col overflow-y-auto h100'}>
                <ControlPanel/>
                <div className={'px-6 py-3'}>
                    <SearchPanel/>
                </div>

                <div className={'px-6 py-1'}>
                    <UserTicketPanel/>
                </div>
            </div>
        </div>
    )
}

export default Home