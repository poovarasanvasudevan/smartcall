import NavBar from "../component/NavBar.jsx";
import ControlPanel from "../component/ControlPanel.jsx";
import SearchPanel from "../component/SearchPanel.jsx";
import UserTicketPanel from "../component/UserTicketPanel.jsx";


const Home = () => {
    return (
        <div className={'flex flex-col'}>
            <NavBar/>
            <ControlPanel/>
            <div className={'px-6 py-1'}>
                <SearchPanel/>
            </div>

            <div className={'px-6 py-1'}>
                <UserTicketPanel />
            </div>
        </div>
    )
}

export default Home