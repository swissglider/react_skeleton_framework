/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ************************************************************************************************************
// sets the grommetTheme
// ************************************************************************************************************

import { createState, State, useState } from '@hookstate/core';
import { grommet, ThemeType } from 'grommet';

const S_AppGrommetTheme = createState<ThemeType | undefined>(undefined);
const wrapS_AppGrommetTheme = (state: State<ThemeType | undefined>) => ({
    getGrommetTheme: (): ThemeType => state.value ?? grommet,
    setGrommetTheme: (theme: ThemeType | undefined) => state.set(theme),
});
export const useGrommetTheme = () => wrapS_AppGrommetTheme(useState(S_AppGrommetTheme));
