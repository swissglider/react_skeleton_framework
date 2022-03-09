import { createState, State, useState } from '@hookstate/core';
import { T_AppType, T_AppVariant } from '../types/frameworkTypes';

export const S_totalWidthState = createState<number>(0);
export const S_totalHeightState = createState<number>(0);
export const S_landscapeState = createState<boolean>(false);
export const S_isMobileState = createState<boolean>(false);

const S_appVariantState = createState<T_AppVariant>('full');
export const useVariantState = () => useState(S_appVariantState);

// ************************************************************************************************************
// if AppType --> if test some Visual Element will point out that this is a TestApp - standard = prod
// ************************************************************************************************************

const S_AppType = createState<T_AppType>('prod');
const wrapS_AppType = (state: State<T_AppType>) => ({
    isTest: () => state.value === 'test',
    isProd: () => state.value === 'prod',
});
export const useAppType = () => wrapS_AppType(useState(S_AppType));
