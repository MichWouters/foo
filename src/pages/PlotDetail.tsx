import {FunctionComponent} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import {useGetPlotById} from '../api/plotApi'
import DetailLayout from './DetailLayout.tsx'
import {IPlot} from '../models/IPlot.ts'

const PlotDetail: FunctionComponent = () => {
    const {id} = useParams()
    const {data: plot, isFetched} = useGetPlotById(id!)

    if (isFetched && !plot) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <DetailLayout {...plot as IPlot}/>
        </>
    )
}

export default PlotDetail
