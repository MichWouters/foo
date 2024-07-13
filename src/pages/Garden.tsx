import {FunctionComponent, useState} from 'react'
import {useCreatePlot} from '../api/plotApi'
import {PlotState} from '../models/IPlot.ts'
import PlotList from './PlotList.tsx'

interface GardenProps {

}

const Garden: FunctionComponent<GardenProps> = () => {
    const [plantName, setPlantName] = useState<string>('Plant name')
    const [plantState, setPlantState] = useState<PlotState>('planted')

    const {mutate: addPlot} = useCreatePlot()

    function addPlant(plantName: string, plantState: PlotState) {
        addPlot({plot: {plant: plantName, state: plantState}})
    }

    return (
        <>
            <div className={'plot-form'}>
                <h2>Plots</h2>
                <input type="text" value={plantName}
                       onChange={evt => setPlantName(evt.currentTarget.value)}/>
                <select value={plantState}
                        onChange={evt => setPlantState(evt.currentTarget.value as PlotState)}>
                    <option value={'planted'}>Planted</option>
                    <option value={'trimmed'}>Trimmed</option>
                    <option value={'harvested'}>Harvested</option>
                </select>

                <button onClick={() => addPlant(plantName, plantState)}>
                    + Add
                </button>
            </div>

            <PlotList/>

        </>
    )
}

export default Garden
