import {BrowserRouter, Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";
import FullScreenProgressBar from "../component/FullScreenProgressBar";

const Home = lazy(() => import('../pages/Home'))


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<FullScreenProgressBar/>}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRouter