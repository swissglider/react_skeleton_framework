import React, { FC } from 'react';
import { Box } from 'grommet';
import { T_AppMessage } from '../../10-addons/types/frameworkTypes';
import MessageBoxView from '../../1-atoms/MessageBoxView/MessageBoxView';
import getRandomString from '../../10-addons/helper/getRandomKey';

export type T_MessageBoxListView_Props = {
    msgs: T_AppMessage[];
    size: string;
    setAsReaded: (msgTime: number) => void;
    deleteMsg: (msgTime: number) => void;
};

export const MessageBoxListView: FC<T_MessageBoxListView_Props> = ({
    msgs,
    size = 'small',
    setAsReaded,
    deleteMsg,
}: T_MessageBoxListView_Props) => {
    return (
        <Box direction={['xsmall', 'small'].includes(size) ? 'column' : 'row'} gap="small" wrap>
            {msgs.map((msg) => (
                <MessageBoxView key={getRandomString()} msg={msg} setAsReaded={setAsReaded} deleteMsg={deleteMsg} />
            ))}
        </Box>
    );
};
