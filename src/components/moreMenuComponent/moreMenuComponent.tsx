import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { Menu } from 'grommet-icons';
import { ContentFrame, useComponentFrameState } from '../../3-molecules/ContentFrameComponent';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MoreMenuEntry from '../../1-atoms/MoreMenuEntry/MoreMenuEntry';

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
        <ContentFrame scope={scope} id="MoreMenu">
            <Box direction="row-responsive" justify="center" align="center" pad="xlarge" gap="medium">
                {Object.entries(appStructure.get())
                    .filter(([, e]) => e.moreMenu && e.moreMenu === true)
                    .map(([appComonentKey, appComonentValue]) => (
                        <MoreMenuEntry
                            key={appComonentKey}
                            appComonentKey={appComonentKey}
                            onClick={() => selectedComponentState.set(appComonentKey)}
                            menuName={appComonentValue.menuName}
                        />
                    ))}
            </Box>
        </ContentFrame>
    );
};

export default MoreMenuComponent;
