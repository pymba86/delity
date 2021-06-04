import React, {createContext} from "react";
import {ThemeProvider, useTheme} from "../../theme";
import {useLocalStorageValue} from "../../hooks/useLocalStorageValue";
import useStyles from './AppTheme.styles';

export type AppColorScheme = 'light' | 'dark';

interface AppThemeContextProps {
    colorScheme: AppColorScheme;
    setColorScheme: (colorScheme: AppColorScheme) => void;
}

export const AppThemeContext = createContext<AppThemeContextProps>({
    colorScheme: 'light',
    setColorScheme: () => undefined
})

interface AppThemeProviderProps {
    children?: React.ReactNode;
}

const THEME_KEY = 'AppTheme.ColorScheme';

export const AppThemeProvider: React.FC<AppThemeProviderProps> = (
    {
        children
    }) => {

    const [colorScheme, setColorScheme]
        = useLocalStorageValue<AppColorScheme>(THEME_KEY, 'light');

    const theme = useTheme(colorScheme, true);

    useStyles(colorScheme, {theme});

    return (
        <AppThemeContext.Provider value={{colorScheme, setColorScheme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}