import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { View, Trash } from 'grommet-icons';
import { MessageBoxList } from '../../3-molecules/MessageBoxList/MessageBoxList';
import { ContentFrame } from '../../3-molecules/ContentFrameComponent/ContentFrame';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import { useMessages } from '../../10-addons/states/messageStates';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';

const ShowMSGComponent: FC<any> = () => {
    const messageState = useMessages();
    const sfcState = useComponentFrameState();
    const scope = 'ShowMSGComponent';

    useEffect(() => {
        sfcState.setTitle(scope, 'ShowMSGComponent_new_messages', `${messageState.getNewCount()} New Messages`);
        sfcState.setTitle(
            scope,
            'ShowMSGComponent_readed_messages',
            `${messageState.getReadedCount()} Readed Messages`,
        );
        sfcState.setShowBody(scope, 'ShowMSGComponent_new_messages', messageState.getNewCount() === 0 ? false : true);
        sfcState.setShowBody(
            scope,
            'ShowMSGComponent_readed_messages',
            messageState.getReadedCount() === 0 ? false : true,
        );

        // to set all as Read
        sfcState.setAdditionalActions(scope, 'ShowMSGComponent_new_messages', [
            {
                Icon: View,
                onClick: () => messageState.setAllReaded(),
            },
        ]);

        // to delete all readed
        sfcState.setAdditionalActions(scope, 'ShowMSGComponent_readed_messages', [
            {
                Icon: Trash,
                onClick: () => messageState.deleteAllReaded(),
            },
        ]);
    }, [messageState.getReadedCount(), messageState.getNewCount()]);

    useEffect(() => {
        sfcState.setScopeCollapsible(scope, true);
        sfcState.setCollapsed(scope, 'ShowMSGComponent_new_messages', false);
        sfcState.setCollapsed(scope, 'ShowMSGComponent_readed_messages', true);
    }, []);

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
    Component: ShowMSGComponent,
};
