import React, { FC } from 'react';
import { Box } from 'grommet';
import { MessageBox } from '../atoms/skeletonMessageBox';
import { useMessages } from '../states/messageStates';
import { useSizeState } from '../states/windowStates';
import { T_AppMessage } from '../types/frameworkTypes';

export const MessageBoxList: FC<any> = ({ state }: { state: string }) => {
    const messageState = useMessages();
    const sizeState = useSizeState();

    const getMsg = (): T_AppMessage[] => {
        if (state === 'new') {
            return messageState.getNew();
        }
        if (state === 'readed') {
            return messageState.getReaded();
        }
        return messageState.get();
    };

    return (
        <Box direction={sizeState.get() === 'small' ? 'column' : 'row'} gap="small" wrap>
            {getMsg().map((msg) => (
                <MessageBox key={msg.time} msg={msg} />
            ))}
        </Box>
    );
};
