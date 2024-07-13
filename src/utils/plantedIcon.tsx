import {FunctionComponent} from 'react'

interface PlantedIconProps {
    color?: string
}

const PlantedIcon: FunctionComponent<PlantedIconProps> = ({color}) => {
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="seedling" style={{width: '1.5rem'}}
             className="svg-inline--fa fa-seedling " role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512">
            <path fill={color ?? 'currentColor'}
                  d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"></path>
        </svg>
    )
}

export default PlantedIcon
