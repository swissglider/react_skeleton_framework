import React from 'react';
import { useState } from '@hookstate/core';
import { S_landscapeState } from '../../10-addons/states/frameworkStates';
import { useTitleState } from '../../10-addons/states/titleStates';
import EmbeddedTitleView from '../../2-pro-atoms/EmbeddedTitleView/EmbeddedTitleView';
import MainMenu from '../Menu/Menu';

const SkeletonEmbeddedTitle = (): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const titleState = useTitleState();
    return (
        <EmbeddedTitleView title={titleState.get()} isLandscape={landscapeState.get()}>
            <MainMenu mainMenu={false} />
        </EmbeddedTitleView>
    );
};

export default SkeletonEmbeddedTitle;
