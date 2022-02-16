import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import { S_landscapeState, S_totalHeightState, S_totalWidthState } from '../states/frameworkStates';
import { useState } from '@hookstate/core';
import { StatusInfo } from 'grommet-icons';
import { useSizeState } from '../states/windowStates';
import { useTitleState } from '../states/titleStates';
import { ContentFrameSimple } from '../molecules/contentFrameSimple';
import { T_AppComponentStructure } from '../types/frameworkTypes';

const InfoStateComponent: FC<any> = () => {
    const totalWidthState = useState(S_totalWidthState);
    const totalHeightState = useState(S_totalHeightState);
    const landscapeState = useState(S_landscapeState);
    const sizeState = useSizeState();
    const titleState = useTitleState();

    return (
        <Box gap="small">
            <ContentFrameSimple title="App General infos">
                <Box pad="xlarge" direction="column">
                    <Text>Size: {sizeState.get()}</Text>
                    <Text>totalWidth: {totalWidthState.get()}</Text>
                    <Text>totalHeight: {totalHeightState.get()}</Text>
                    <Text>landscape: {landscapeState.get().toString()}</Text>
                    <Text>appTitle: {titleState.get()}</Text>
                </Box>
            </ContentFrameSimple>
        </Box>
    );
};

export const InfoStateComponentStructure: T_AppComponentStructure = {
    menuName: 'AppInfo',
    component: InfoStateComponent,
    parameters: {},
    default: true,
    menuIcon: StatusInfo,
    moreMenu: false,
};
