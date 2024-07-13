import {FunctionComponent, useContext} from 'react'
import {ThemeContext} from '../context/themeContext.tsx'

interface ColorPickerProps {

}

const ColorPicker: FunctionComponent<ColorPickerProps> = () => {
    const {accentColor, setAccentColor} = useContext(ThemeContext)

    return (
        <div className={'color-picker'}>
            <input type={'color'} value={accentColor} onChange={evt => setAccentColor(evt.target.value)}/>
        </div>
    )
}

export default ColorPicker
