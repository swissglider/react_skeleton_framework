/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { MessageBoxList } from '../molecules/skeletonMessageBoxList';
import { useComponentFrameState, ContentFrame } from '../molecules/contentFrame';
import { useMessages } from '../states/messageStates';
import { T_AppComponentStructure } from '../types/frameworkTypes';

const ShowMSGComponent: FC<any> = () => {
    const messageState = useMessages();
    const sfcState = useComponentFrameState();
    const scope = 'ShowMSGComponent';

    useEffect(() => {
        sfcState.setScopeCollapsible(scope, true);
        sfcState.setTitle(scope, 'ShowMSGComponent_new_messages', `${messageState.getNewCount()} New Messages`);
        sfcState.setTitle(
            scope,
            'ShowMSGComponent_readed_messages',
            `${messageState.getReadedCount()} Readed Messages`,
        );
        sfcState.setScopeCollapsible(scope, true);
        sfcState.setCollapsed(scope, 'ShowMSGComponent_new_messages', false);
        sfcState.setCollapsed(scope, 'ShowMSGComponent_readed_messages', true);
        sfcState.setShowBody(scope, 'ShowMSGComponent_new_messages', messageState.getNewCount() === 0 ? false : true);
        sfcState.setShowBody(
            scope,
            'ShowMSGComponent_readed_messages',
            messageState.getReadedCount() === 0 ? false : true,
        );
    }, [messageState.getReadedCount(), messageState.getNewCount()]);

    return (
        <Box gap="large">
            <ContentFrame scope={scope} id="ShowMSGComponent_new_messages">
                <MessageBoxList state="new" />
            </ContentFrame>
            <ContentFrame scope={scope} id="ShowMSGComponent_readed_messages">
                <MessageBoxList state="readed" />
            </ContentFrame>
        </Box>
    );
};

export const ShowMSGComponentStructure: T_AppComponentStructure = {
    menuName: 'ShowMSG',
    component: ShowMSGComponent,
    parameters: {},
    default: true,
    moreMenu: false,
    mainMenu: false,
};
