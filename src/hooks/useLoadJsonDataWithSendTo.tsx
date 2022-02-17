/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from '@hookstate/core';
import Connection from '@iobroker/adapter-react/Connection';
import { useEffect } from 'react';
import { SocketHelper } from '../helper/socketHelper';
import { useIOBAppTest, useIOBGenericApp } from '../states/iobAppStates';
import { useMessages } from '../states/messageStates';

export const useLoadJsonDataWithSendTo = (
    useJsonDataMethod: any,
    sendToCommand: string,
    sendToParams: any,
    timeOut: number,
    testJsonData?: any,
): any[] => {
    const iobTestState = useIOBAppTest();
    const genericAppState = useIOBGenericApp();
    const messageState = useMessages();
    const dataState = useJsonDataMethod();

    const loadedData = useState<boolean>(false);

    const refresh = () => {
        loadedData.set(false);
        if (iobTestState.get() === true && testJsonData) {
            dataState.set(JSON.parse(JSON.stringify(testJsonData)));
            loadedData.set(true);
        } else {
            if (genericAppState.isSocketOK() && genericAppState.getSocket()) {
                SocketHelper.sendTo(
                    genericAppState.getSocket() as Connection,
                    genericAppState.getInstanceName(),
                    sendToCommand,
                    sendToParams,
                    timeOut,
                )
                    .then((ha: any) => {
                        if (ha.error) {
                            if (ha.error.errorType === 'timeout') {
                                messageState.addCritical(
                                    `TimoutError - check if Adapter is running and refresh`,
                                    ha.error.errorInfo,
                                    true,
                                );
                            } else {
                                messageState.addCritical(
                                    `Error while getting the Data - ${ha.error.errorType} - check Admin Config`,
                                    ha.error.errorInfo,
                                    true,
                                );
                            }
                        } else {
                            dataState.set(ha.result);
                        }
                    })
                    .catch((e: Error) => {
                        const error = typeof e === 'string' ? new Error(e) : e;
                        console.error(error);
                        messageState.addError(error.name, error.message, error, true);
                    })
                    .finally(() => {
                        loadedData.set(true);
                    });
            }
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return [loadedData, refresh];
};
