import React, { FC } from 'react';
import { Box, Header } from 'grommet';
import { FormClose } from 'grommet-icons';
import { T_AppMessage, T_AppSeverity } from '../../10-addons/types/frameworkTypes';

const colorMap: Record<T_AppSeverity, string> = {
    info: 'status-unknown',
    success: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical',
    error: 'status-error',
};

type T_MessageBoxViewNotAvailable_Props = {
    msg: T_AppMessage;
    size?: string;
};

const MessageBoxViewNotAvailable: FC<T_MessageBoxViewNotAvailable_Props> = ({
    msg,
    size = 'small',
}: T_MessageBoxViewNotAvailable_Props) => {
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <>
            {open && (
                <Box
                    border={{ color: 'light-1' }}
                    key={msg.time}
                    gap="xsmall"
                    margin={{ bottom: size === 'small' ? '' : 'small' }}
                    flex={false}
                >
                    <Header pad="xsmall" background={colorMap['critical']}>
                        {msg.msgTitle}
                        <div>NOT AVAILABLE !!!</div>
                        <Box
                            onClick={() => setOpen(false)}
                            role="button"
                            aria-label={`MessageBoxDeleteBtn_${msg.time}`}
                        >
                            <FormClose />
                        </Box>
                    </Header>
                </Box>
            )}
        </>
    );
};

export default MessageBoxViewNotAvailable;
