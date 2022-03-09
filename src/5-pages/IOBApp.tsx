import React, { FC, useEffect } from 'react';
import GenericApp from '@iobroker/adapter-react/GenericApp';
import { GenericAppProps, GenericAppSettings } from '@iobroker/adapter-react/types';
import Loader from '@iobroker/adapter-react/Components/Loader';
import { useState } from '@hookstate/core';
import { useIOBGenericAppFull, useIOBLegacyAdapter } from '../10-addons/states/iobAppStates';
import { Skeleton } from './Skeleton/Skeleton';
import { useAppType } from '../10-addons/states/frameworkStates';

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

class IOBApp_ extends GenericApp {
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

export type T_IOBApp_Props = {
    IOBAdapterName: string;
    IOBLegacyAdapterInstanceNumber: string | number;
};

export const IOBApp: FC<T_IOBApp_Props> = ({
    IOBAdapterName,
    IOBLegacyAdapterInstanceNumber,
}: T_IOBApp_Props): JSX.Element => {
    const appTypeState = useAppType();
    const legacyAdapterState = useIOBLegacyAdapter();
    const [newProps, setNewProps] = React.useState<any | undefined>(undefined);

    useEffect(() => {
        setNewProps({ adapterName: IOBAdapterName, socket: { port: window.location.port } });
        legacyAdapterState.instance.set(
            typeof IOBLegacyAdapterInstanceNumber === 'string'
                ? parseInt(IOBLegacyAdapterInstanceNumber)
                : IOBLegacyAdapterInstanceNumber,
        );
    }, []);

    return <>{newProps && appTypeState.isTest() ? <Skeleton {...newProps} /> : <IOBApp_ {...newProps} />}</>;
};
