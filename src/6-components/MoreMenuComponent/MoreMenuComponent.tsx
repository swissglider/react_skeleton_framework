import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { Menu, More } from 'grommet-icons';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MoreMenuEntry from '../../1-atoms/MoreMenuEntry/MoreMenuEntry';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';

const MoreMenuComponent: FC<any> = () => {
    const frameState = useComponentFrameState();
    const scope = 'home';
    const appStructure = useAppStructure();
    const selectedComponentState = useSelectedComponent();

    useEffect(() => {
        frameState.setTitle(scope, 'MoreMenu', 'More Menu Entries');
        frameState.setTitleIcon(scope, 'MoreMenu', Menu);
    }, []);

    return (
        <Box direction="row-responsive" justify="center" align="center" gap="medium">
            {Object.entries(appStructure.get())
                .filter(([, e]) => e.moreMenu && e.moreMenu === true)
                .map(([appComonentKey, appComonentValue]) => (
                    <MoreMenuEntry
                        key={appComonentKey}
                        appComonentKey={appComonentKey}
                        onClick={() => selectedComponentState.setSelectedComponent(appComonentKey)}
                        menuName={appComonentValue.menuName}
                        menuIcon={appComonentValue.menuIcon}
                    />
                ))}
        </Box>
    );
};

export const MoreMenuStruct: T_AppComponentStructure = {
    menuName: 'More',
    Component: MoreMenuComponent,
    menuIcon: More,
    mainMenu: true,
};
