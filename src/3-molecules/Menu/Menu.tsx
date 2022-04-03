import React, { useEffect, useState } from 'react';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MenuView from '../../2-pro-atoms/MenuView/MenuView';
import { useSizeState } from '../../10-addons/states/windowStates';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';

export interface I_SkeletonMenu_Props {
    mainMenu: boolean;
}

const MainMenu = ({ mainMenu }: I_SkeletonMenu_Props): JSX.Element => {
    const sizeState = useSizeState();
    const appStructure = useAppStructure();
    const selectedComponentState = useSelectedComponent();
    const { isLandscape } = useWindowSize();
    const [isMobile, setIsMobile] = useState<boolean>(true);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

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
