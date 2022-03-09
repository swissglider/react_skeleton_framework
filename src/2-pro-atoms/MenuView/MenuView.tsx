import React from 'react';
import { Footer } from 'grommet';
import { T_AppStructure } from '../../10-addons/types/frameworkTypes';
import MenuItem from '../../1-atoms/MenuItem/MenuItem';

export interface I_MenuView_Props {
    mainMenu?: boolean;
    isLandscape?: boolean;
    isMobile?: boolean;
    size?: string;
    appStructure: T_AppStructure;
    menuPartClicked: (appComonentKey: string) => void;
    selectedMenuName: string;
}

const MenuView = ({
    mainMenu = true,
    isLandscape = false,
    isMobile = true,
    size = 'small',
    appStructure,
    menuPartClicked,
    selectedMenuName,
}: I_MenuView_Props): JSX.Element => {
    return (
        <Footer
            pad={
                mainMenu
                    ? { horizontal: 'medium', vertical: 'small' }
                    : !isLandscape
                    ? { horizontal: 'small', vertical: 'xsmall' }
                    : { right: 'small' }
            }
            background={!isLandscape && !mainMenu ? 'dark-2' : ''}
            round={!isLandscape && !mainMenu ? 'small' : ''}
            margin={!isLandscape && !mainMenu ? { bottom: 'small' } : { horizontal: 'none', vertical: 'none' }}
            justify={!mainMenu && isLandscape && isMobile ? 'end' : 'around'}
        >
            {Object.entries(appStructure)
                .filter(([, e]) => e.mainMenu === undefined || e.mainMenu === true)
                .map(([appComonentKey, appComonentValue]) => (
                    <MenuItem
                        key={appComonentValue.menuName}
                        menuPartName={appComonentValue.menuName}
                        menuPartClicked={() => menuPartClicked(appComonentKey)}
                        MenuPartIcon={appComonentValue.menuIcon}
                        isMobile={isMobile}
                        isLandscape={isLandscape}
                        isMainMenu={mainMenu}
                        size={size}
                        isSelected={appComonentValue.menuName === selectedMenuName}
                    />
                ))}
        </Footer>
    );
};

export default MenuView;
