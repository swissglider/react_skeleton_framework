import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { S_SFC_State, T_SFCs, T_SFC_IDs, useComponentFrameState } from './componentStates';
import ContentFrameView from '../../2-pro-atoms/ContentFrameView/ContentFrameView';

export interface I_ContentFrame_Props {
    scope: string; // for example pageName --> all Frames can be collapsed or closed togehter etc...
    id: string; // unique
    children: React.ReactNode;
    pad?: any;
    margin?: any;
    flex?: boolean;
    height?: any;
}

export const ContentFrame = ({
    scope,
    id,
    children,
    pad = 'none',
    margin = 'none',
    flex = false,
}: I_ContentFrame_Props): JSX.Element => {
    const sfcOrgState = useState(S_SFC_State);
    const frameState = useComponentFrameState();

    useEffect(() => {
        const initSRCS: T_SFCs = {
            scope,
            id,
            title: id,
            collapsible: false,
            collapsed: false,
            closable: false,
            closed: false,
            showBody: true,
            badgeNumbe: undefined,
        };
        const initSFCID: T_SFC_IDs = {};
        initSFCID[id] = initSRCS;
        sfcOrgState[scope].merge(initSFCID);
    }, []);

    return (
        <ContentFrameView
            title={frameState.getTitle(scope, id)}
            scope={scope}
            id={id}
            pad={pad}
            margin={margin}
            flex={flex}
            titleIcon={frameState.getTitleIcon(scope, id)}
            isCollapsible={frameState.isCollapsible(scope, id)}
            isCollapsed={frameState.isCollapsed(scope, id)}
            isClosable={frameState.isClosable(scope, id)}
            isClosed={frameState.isClosed(scope, id)}
            isShowBody={frameState.isShowBody(scope, id)}
            toggleCollapsed={(scope: string, id: string) => frameState.toggleCollapsed(scope, id)}
            toggleClosed={(scope: string, id: string) => frameState.toggleClosed(scope, id)}
        >
            {children}
        </ContentFrameView>
    );
};

export default ContentFrame;
