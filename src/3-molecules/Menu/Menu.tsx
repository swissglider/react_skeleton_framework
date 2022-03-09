import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_isMobileState } from '../../10-addons/states/frameworkStates';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MenuView from '../../2-pro-atoms/MenuView/MenuView';
import { useSizeState } from '../../10-addons/states/windowStates';
import { MoreMenuStruct } from '../../6-components/MoreMenuComponent/MoreMenuComponent';

export interface I_SkeletonMenu_Props {
    mainMenu: boolean;
}

const MainMenu = ({ mainMenu }: I_SkeletonMenu_Props): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const isMobileState = useState(S_isMobileState);
    const sizeState = useSizeState();
    const appStructure = useAppStructure();
    const selectedComponentState = useSelectedComponent();

    useEffect(() => {
        if (Object.values(appStructure.get()).some((e) => e.moreMenu !== undefined && e.moreMenu === true)) {
            if (appStructure.isMenuAvailable('MoreMenu') === false) appStructure.addNewMenu('MoreMenu', MoreMenuStruct);
        } else {
            if (appStructure.isMenuAvailable('MoreMenu') === true) appStructure.deleteMenu('MoreMenu');
        }
    }, [appStructure]);

    return (
        <MenuView
            mainMenu={mainMenu}
            isLandscape={landscapeState.get()}
            isMobile={isMobileState.get()}
            appStructure={appStructure.get()}
            menuPartClicked={(appComonentKey: string) => selectedComponentState.set(appComonentKey)}
            size={sizeState.get()}
            selectedMenuName={selectedComponentState.getComponent().menuName}
        />
    );
};

export default MainMenu;
