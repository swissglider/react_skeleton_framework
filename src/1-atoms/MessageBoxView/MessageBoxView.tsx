import React, { FC } from 'react';
import { Box, Header, Main, Text } from 'grommet';
import { View, Trash } from 'grommet-icons';
import { T_AppMessage, T_AppSeverity } from '../../10-addons/types/frameworkTypes';

const colorMap: Record<T_AppSeverity, string> = {
    info: 'status-unknown',
    success: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical',
    error: 'status-error',
};

type T_MessageBoxView_Props = {
    msg: T_AppMessage;
    setAsReaded: (msgTime: number) => void;
    deleteMsg: (msgTime: number) => void;
    size?: string;
};

const MessageBoxView: FC<T_MessageBoxView_Props> = ({
    msg,
    setAsReaded,
    size = 'small',
    deleteMsg,
}: T_MessageBoxView_Props) => {
    return (
        <Box
            border={{ color: 'light-1' }}
            key={msg.time}
            gap="xsmall"
            margin={{ bottom: size === 'small' ? '' : 'small' }}
            flex={false}
        >
            <Header pad="xsmall" background={colorMap[msg.severity]}>
                {msg.msgTitle}
                {msg.new ? (
                    <Box
                        onClick={() => setAsReaded(msg.time)}
                        role="button"
                        aria-label={`MessageBoxViewBtn_${msg.time}`}
                    >
                        <View />
                    </Box>
                ) : (
                    <Box
                        onClick={() => deleteMsg(msg.time)}
                        role="button"
                        aria-label={`MessageBoxDeleteBtn_${msg.time}`}
                    >
                        <Trash />
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
    );
};

export default MessageBoxView;
