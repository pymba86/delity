import {createMemoStyles, Theme, ThemeNumberSize} from "../../theme";
import {ThemeColorKeys} from "../../theme/colors";
import {getThemeColor} from "../../utils/theme/getThemeColor";
import {hexToRgba} from "../../utils/theme/hexToRgba";
import {getSizeValue} from "../../utils/theme/getSizeValue";

interface ThemeIconStylesProps {
    theme: Theme;
    color?: ThemeColorKeys;
    size: ThemeNumberSize;
    radius: ThemeNumberSize;
}

export const sizes = {
    xs: 16,
    sm: 20,
    md: 26,
    lg: 32,
    xl: 40
}

export default createMemoStyles({
    light: ({theme, color}: ThemeIconStylesProps) => ({
        color: getThemeColor({
            theme, color,
            shade: theme.colorScheme === 'dark' ? 3 : 9
        }),
        backgroundColor: hexToRgba(
            getThemeColor({
                theme, color,
                shade: theme.colorScheme === 'dark' ? 9 : 1
            }),
            theme.colorScheme === 'dark' ? 0.65 : 1
        )
    }),

    filled: ({theme, color}: ThemeIconStylesProps) => ({
        color: theme.colorScheme == 'dark'
            ? getThemeColor({theme, color, shade: 0}) : theme.white,
        backgroundColor: hexToRgba(
            getThemeColor({theme, color, shade: 7}),
            theme.colorScheme === 'dark' ? 0.65 : 1)
    }),

    themeIcon: ({theme, size, radius}: ThemeIconStylesProps) => {
        const iconSize = getSizeValue({size, sizes});

        return {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            width: iconSize,
            height: iconSize,
            borderRadius: getSizeValue(
                {size: radius, sizes: theme.radius})
        }
    }
})