import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'

interface ThemeContext {
    accentColor: string
    setAccentColor: (newAccentColor: string) => void
}

export const ThemeContext = createContext<ThemeContext>({
    accentColor: '#FFFFFF',
    setAccentColor: () => {
        console.warn('setAccentColor not implemented, please provide an implementation.')
    }
})

const ThemeContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [accentColor, setAccentColor] = useState<string>('#ffffff')

    return (
        <>
            <ThemeContext.Provider value={{accentColor, setAccentColor}}>
                {children}
            </ThemeContext.Provider>
        </>
    )

}

export default ThemeContextProvider
