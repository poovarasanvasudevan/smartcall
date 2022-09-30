import {BrowserRouter, Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";
import FullScreenProgressBar from "../component/FullScreenProgressBar";
import AdminOutlet from "../component/AdminOutlet.jsx";
import Login from "../pages/Login.jsx";

const Home = lazy(() => import('../pages/Home'))
const CallLogs = lazy(() => import('../pages/CallLogs'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<FullScreenProgressBar/>}>
                <Routes>
                    <Route path={'/'} element={<AdminOutlet/>}>
                        <Route index element={<Home/>}/>
                        <Route path={'/call-logs'} element={<CallLogs/>}/>
                    </Route>
                    <Route path={'/login'} element={<Login />}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
export default AppRouter