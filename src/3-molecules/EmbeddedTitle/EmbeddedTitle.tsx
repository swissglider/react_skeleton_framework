import React from 'react';
import { useAppTitle } from '../../10-addons/states/titleStates';
import EmbeddedTitleView from '../../2-pro-atoms/EmbeddedTitleView/EmbeddedTitleView';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';
import MainMenu from '../Menu/Menu';

const SkeletonEmbeddedTitle = (): JSX.Element => {
    const titleState = useAppTitle();
    const { isLandscape } = useWindowSize();
    return (
        <EmbeddedTitleView title={titleState.getTitle()} isLandscape={isLandscape}>
            <MainMenu mainMenu={false} />
        </EmbeddedTitleView>
    );
};

export default SkeletonEmbeddedTitle;
