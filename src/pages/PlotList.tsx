import {FunctionComponent, useContext, useState} from 'react'
import {useGetAllPlots} from '../api/plotApi.ts'
import PlantedIcon from '../utils/plantedIcon.tsx'
import TrimmedIcon from '../utils/trimmedIcon.tsx'
import HarvestedIcon from '../utils/harvestedIcon.tsx'
import Plot from './Plot.tsx'
import {ThemeContext} from '../context/themeContext.tsx'

interface PlotListProps {

}

const PlotList: FunctionComponent<PlotListProps> = () => {
    const {data: plots} = useGetAllPlots()
    const [showPlanted, setShowPlanted] = useState<boolean>(true)
    const [showTrimmed, setShowTrimmed] = useState<boolean>(true)
    const [showHarvested, setShowHarvested] = useState<boolean>(true)
    const {accentColor} = useContext(ThemeContext)

    return (
        <>
            <div className={'filters'}>
                <div>
                    <label htmlFor={'plantedFilter'}><PlantedIcon color={accentColor}/></label>
                    <input type={'checkbox'} checked={showPlanted} id={'plantedFilter'}
                           onChange={() => setShowPlanted(x => !x)}/>
                </div>

                <div>
                    <label htmlFor={'trimmedFilter'}><TrimmedIcon color={accentColor}/></label>
                    <input type={'checkbox'} checked={showTrimmed} id={'trimmedFilter'}
                           onChange={() => setShowTrimmed(x => !x)}/>
                </div>

                <div>
                    <label htmlFor={'harvestedFilter'}><HarvestedIcon color={accentColor}/></label>
                    <input type={'checkbox'} checked={showHarvested} id={'harvestedFilter'}
                           onChange={() => setShowHarvested(x => !x)}/>
                </div>
            </div>

            <div className={'plots'}>
                {plots?.filter(p =>
                    showPlanted && p.state === 'planted' ||
                    showHarvested && p.state === 'harvested' ||
                    showTrimmed && p.state === 'trimmed'
                ).map(plot => <Plot key={plot.id} {...plot}/>)}
            </div>
        </>
    )
}

export default PlotList
