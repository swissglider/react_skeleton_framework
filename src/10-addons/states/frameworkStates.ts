import { createState, useState } from '@hookstate/core';
import { T_AppVariant } from '../types/frameworkTypes';

export const S_totalWidthState = createState<number>(0);
export const S_totalHeightState = createState<number>(0);
export const S_landscapeState = createState<boolean>(false);
export const S_isMobileState = createState<boolean>(false);

const S_appVariantState = createState<T_AppVariant>('full');
export const useVariantState = () => useState(S_appVariantState);
