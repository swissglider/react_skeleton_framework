import React from 'react';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MenuView from '../../2-pro-atoms/MenuView/MenuView';
import { useSizeState } from '../../10-addons/states/windowStates';
import { isMobile } from 'react-device-detect';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';

export interface I_SkeletonMenu_Props {
    mainMenu: boolean;
}

const MainMenu = ({ mainMenu }: I_SkeletonMenu_Props): JSX.Element => {
    const sizeState = useSizeState();
    const appStructure = useAppStructure();
    const selectedComponentState = useSelectedComponent();
    const { isLandscape } = useWindowSize();

    return (
        <MenuView
            mainMenu={mainMenu}
            isLandscape={isLandscape}
            isMobile={isMobile}
            appStructure={appStructure.get()}
            menuPartClicked={(appComonentKey: string) => selectedComponentState.setSelectedComponent(appComonentKey)}
            size={sizeState.get()}
            selectedMenuName={selectedComponentState.getComponent().menuName}
        />
    );
};

export default MainMenu;
