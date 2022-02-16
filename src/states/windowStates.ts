import { createState, useState } from '@hookstate/core';
import { T_Size } from '../types/frameworkTypes';

// ************************************************************************************************************
// Size of the Window
// ************************************************************************************************************

const S_sizeState = createState<T_Size>('small');
export const useSizeState = () => useState(S_sizeState);
