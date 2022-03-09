import React, { FC } from 'react';
import { Box, Header, Main, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { T_AppMessage, T_AppSeverity } from '../../10-addons/types/frameworkTypes';
import { useSizeState } from '../../10-addons/states/windowStates';
import { useMessages } from '../../10-addons/states/messageStates';
import MessageBoxView from '../../1-atoms/MessageBoxView/MessageBoxView';

const colorMap: Record<T_AppSeverity, string> = {
    info: 'status-unknown',
    success: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical',
    error: 'status-error',
};

type T_MessageBox_Props = {
    msg: T_AppMessage;
};

export const MessageBox: FC<T_MessageBox_Props> = ({ msg }: T_MessageBox_Props) => {
    const sizeState = useSizeState();
    const messageState = useMessages();
    return (
        <>
            <Box
                border={{ color: 'light-1' }}
                key={msg.time}
                gap="xsmall"
                margin={{ bottom: sizeState.get() === 'small' ? '' : 'small' }}
            >
                <Header pad="xsmall" background={colorMap[msg.severity]}>
                    {msg.msgTitle}
                    {msg.new && (
                        <Box onClick={() => messageState.setAsReaded(msg.time)}>
                            <Checkmark />
                        </Box>
                    )}
                </Header>
                <Main pad="xsmall">
                    <Box gap="xsmall">
                        <Text size="xsmall">Severity: {msg.severity}</Text>
                        <Text size="xsmall">
                            Time:{' '}
                            {`${new Date(msg.time).toLocaleTimeString()} : ${new Date(msg.time).toLocaleDateString()}`}
                        </Text>
                    </Box>
                    <Text size="small">{msg.msgMessage}</Text>
                </Main>
            </Box>
            <MessageBoxView
                key={msg.time}
                msg={msg}
                setAsReaded={(msgTime: number) => messageState.setAsReaded(msgTime)}
                deleteMsg={(msgTime: number) => messageState.deleteMsg(msgTime)}
            />
        </>
    );
};
