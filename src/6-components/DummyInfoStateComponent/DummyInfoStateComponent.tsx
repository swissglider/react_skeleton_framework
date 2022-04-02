import React, { FC, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { StatusInfo } from 'grommet-icons';
import { useSizeState } from '../../10-addons/states/windowStates';
import { useAppTitle } from '../../10-addons/states/titleStates';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import ContentFrame from '../../3-molecules/ContentFrameComponent/ContentFrame';

const DummyInfoStateComponent: FC<any> = () => {
    const sizeState = useSizeState();
    const titleState = useAppTitle();
    const { totalWidth, totalHeight, isLandscape } = useWindowSize();
    const sfcState = useComponentFrameState();
    const scope = 'scope';
    const id = 'id';

    useEffect(() => {
        sfcState.setTitle(scope, id, `App General infos`);
    }, []);

    return (
        <Box gap="small">
            <ContentFrame id={id} scope={scope}>
                <Box direction="column">
                    <Text>Size: {sizeState.get()}</Text>
                    <Text>totalWidth: {totalWidth}</Text>
                    <Text>totalHeight: {totalHeight}</Text>
                    <Text>landscape: {isLandscape.toString()}</Text>
                    <Text>appTitle: {titleState.getTitle()}</Text>
                </Box>
            </ContentFrame>
        </Box>
    );
};

export const DummyInfoStateComponentStructure: T_AppComponentStructure = {
    menuName: 'DummyAppInfo',
    Component: DummyInfoStateComponent,
    parameters: {},
    menuIcon: StatusInfo,
};
