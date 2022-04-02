import { createState, State, useState } from '@hookstate/core';

// ************************************************************************************************************
// Titel Shown --> should be set on App.tsx
// ************************************************************************************************************

const S_appTitleState = createState<string>('');
const wrapS_appTitleState = (state: State<string>) => ({
    getTitle: () => state.value,
    setTitle: (title: string) => state.set(title),
});
export const useAppTitle = () => wrapS_appTitleState(useState(S_appTitleState));
