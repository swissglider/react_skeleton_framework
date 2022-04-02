import React, { FC } from 'react';
import { T_AppMessage } from '../../10-addons/types/frameworkTypes';
import { useMessages } from '../../10-addons/states/messageStates';
import MessageBoxView from '../../1-atoms/MessageBoxView/MessageBoxView';
import MessageBoxViewNotAvailable from '../../1-atoms/MessageBoxViewNotAvailable/MessageBoxViewNotAvailable';

type T_MessageBox_Props = {
    msg: T_AppMessage;
};

/**
 * only works with registered Messages
 */
export const MessageBox: FC<T_MessageBox_Props> = ({ msg }: T_MessageBox_Props) => {
    const messageState = useMessages();
    console.log(msg);

    return (
        <>
            {msg &&
                (messageState.isMessageAvailable(msg.time) ? (
                    <MessageBoxView
                        key={msg.time}
                        msg={msg}
                        setAsReaded={(msgTime: number) => messageState.setAsReaded(msgTime)}
                        deleteMsg={(msgTime: number) => messageState.deleteMsg(msgTime)}
                    />
                ) : (
                    <MessageBoxViewNotAvailable msg={msg} />
                ))}
        </>
    );
};
