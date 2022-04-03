import { useEffect, useState } from 'react';
import { Skeleton, Test } from '../..';

export const useResetAll = (): boolean => {
    const [isReset, setIsReset] = useState(false);
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const selectedComponent = Skeleton.Hooks.useSelectedComponent();
    const historyState = Skeleton.Hooks.useComponentHistory();
    const appTypeState = Skeleton.Hooks.useAppType();
    const grommetThemeState = Skeleton.Hooks.useGrommetTheme();
    const messageState = Skeleton.Hooks.useMessages();

    useEffect(() => {
        appStructureState.reset();
        historyState.reset();
        selectedComponent.reset();
        setIsReset(true);
        appTypeState.setAppType('prod');
        grommetThemeState.setGrommetTheme(undefined);
        messageState.deleteAll();
    }, []);
    return isReset;
};
