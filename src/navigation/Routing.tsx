import {FunctionComponent, Suspense} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import PlotDetail from '../pages/PlotDetail'
import LoadingPage from '../utils/loadingPage.tsx'
import Garden from '../pages/Garden.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path={'/'} element={<Outlet/>}>
                    <Route index element={<Garden/>}/>
                    <Route path={'plot/:id'} element={<PlotDetail/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default Routing
