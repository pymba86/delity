import {createUseStyles, Styles} from 'react-jss';
import {DelityColorScheme, DelityTheme} from "./types";
import {useMemo} from "react";

export function createMemoStyles<C extends string = string, Props = unknown>(
    styles: Styles<C, Props, DelityTheme>
) {
    const useStyles = createUseStyles<C, Props, DelityTheme>(styles);

    return function useMemoStyles(colorScheme?: DelityColorScheme, args?: Props) {
        const dependencies =
            typeof args === 'object' && args !== null
                ? (Object.keys(args) as Array<keyof Props>)
                    .map(key => args[key])
                : [];

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const stylesProps = useMemo(() => args, [...dependencies, colorScheme]);

        return useStyles(stylesProps);
    }
}