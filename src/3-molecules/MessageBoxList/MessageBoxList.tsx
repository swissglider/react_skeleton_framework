import React, { FC } from 'react';
import { useMessages } from '../../10-addons/states/messageStates';
import { useSizeState } from '../../10-addons/states/windowStates';
import { T_AppMessage } from '../../10-addons/types/frameworkTypes';
import { MessageBoxListView } from '../../2-pro-atoms/MessageBoxListView/MessageBoxListView';

export const MessageBoxList: FC<any> = ({ state }: { state: string }) => {
    const messageState = useMessages();
    const sizeState = useSizeState();

    const states: Record<string, T_AppMessage[]> = {
        new: messageState.getNew(),
        readed: messageState.getReaded(),
    };

    return (
        <MessageBoxListView
            msgs={states[state]}
            setAsReaded={(msgTime: number) => messageState.setAsReaded(msgTime)}
            deleteMsg={(msgTime: number) => messageState.deleteMsg(msgTime)}
            size={sizeState.get()}
        />
    );
};
