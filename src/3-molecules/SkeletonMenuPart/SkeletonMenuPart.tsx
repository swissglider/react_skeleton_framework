import React from 'react';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_isMobileState } from '../../10-addons/states/frameworkStates';
import { useSizeState } from '../../10-addons/states/windowStates';
import { useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';
import SkeletonMenuPartView from '../../1-atoms/SkeletonMenuPartView/SkeletonMenuPartView';

const SkeletonMenuPart = ({
    appComonentKey,
    appComonentValue,
    mainMenu,
}: {
    appComonentKey: string;
    appComonentValue: T_AppComponentStructure;
    mainMenu: boolean;
}): JSX.Element => {
    const selectedComponentState = useSelectedComponent();
    const landscapeState = useState(S_landscapeState);
    const isMobileState = useState(S_isMobileState);
    const sizeState = useSizeState();
    return (
        <SkeletonMenuPartView
            menuPartName={appComonentValue.menuName}
            menuPartClicked={() => selectedComponentState.set(appComonentKey)}
            MenuPartIcon={appComonentValue.menuIcon}
            isMobile={isMobileState.get()}
            isLandscape={landscapeState.get()}
            isMainMenu={mainMenu}
            size={sizeState.get()}
            isSelected={appComonentValue.menuName === selectedComponentState.getComponent().menuName}
        />
    );
};

export default SkeletonMenuPart;
