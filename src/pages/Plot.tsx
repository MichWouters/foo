import {FunctionComponent, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import HarvestedIcon from '../utils/harvestedIcon.tsx'
import TrimmedIcon from '../utils/trimmedIcon.tsx'
import PlantedIcon from '../utils/plantedIcon.tsx'
import {IPlot} from '../models/IPlot.ts'
import {useDeletePlot} from '../api/plotApi.ts'
import LoadingPart from '../utils/loadingPart.tsx'
import {ThemeContext} from '../context/themeContext.tsx'

const PlotContainer = styled.div`
    /* CSS voor een div container rond elke individuele Plot component. */
    width: 25% !important;
    padding: 1em;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 5px;
    margin: .5em;
`

interface PlotProps extends IPlot {

}

const Plot: FunctionComponent<PlotProps> = ({id, state, plant}) => {
    const {mutate: deletePlot, isLoading} = useDeletePlot()
    const {accentColor} = useContext(ThemeContext)

    return (
        <PlotContainer>
            {state == 'planted' && <PlantedIcon color={accentColor}/>}
            {state == 'trimmed' && <TrimmedIcon color={accentColor}/>}
            {state == 'harvested' && <HarvestedIcon color={accentColor}/>}
            &nbsp;
            Plot with {plant}
            &nbsp;
            <div>
                <NavLink to={'plot/' + id}>View</NavLink>
                &nbsp;|&nbsp;
                <span className={'link'}
                      onClick={() => deletePlot({id: id as string})}>Delete</span>
            </div>
            <div>
                {isLoading && <LoadingPart/>}
            </div>
        </PlotContainer>
    )
}

export default Plot
