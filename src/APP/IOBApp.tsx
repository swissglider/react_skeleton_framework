/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import GenericApp from '@iobroker/adapter-react/GenericApp';
import { GenericAppProps, GenericAppSettings } from '@iobroker/adapter-react/types';
import Loader from '@iobroker/adapter-react/Components/Loader';
import { useState } from '@hookstate/core';
import { useIOBGenericAppFull } from '../states/iobAppStates';
import { Skeleton } from '../organisms/skeleton'

const IOBStack = ({ genericApp }: { genericApp: GenericApp }): JSX.Element => {
    const genericAppState = useIOBGenericAppFull();
    const loadedState = useState<boolean>(false);

    useEffect(() => {
        genericAppState.adapterName.set(genericApp.adapterName);
        genericAppState.instance.set(genericApp.instance);
        genericAppState.instanceName.set(`${genericApp.adapterName}.${genericApp.instance}`);
    }, []);

    useEffect(() => {
        loadedState.set(genericApp.state.loaded);
    }, [genericApp.state.loaded]);

    useEffect(() => {
        if (genericApp.socket.connected) {
            genericAppState.socket.set(genericApp.socket);
        }
    }, [genericApp.socket.connected]);

    return <>{loadedState.get() ? <Skeleton /> : <Loader />}</>;
};

export class IOBApp extends GenericApp {
    constructor(props: GenericAppProps) {
        const extendedProps: GenericAppSettings = {
            ...props,
            bottomButtons: false,
            encryptedFields: [],
        };
        super(props, extendedProps);
        this.onSave = this.onSave.bind(this);
        this.onLoadConfig = this.onLoadConfig.bind(this);
    }

    render(): JSX.Element {
        return <IOBStack genericApp={this} />;
    }
}
