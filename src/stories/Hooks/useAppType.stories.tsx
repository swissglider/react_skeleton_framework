import React, { useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

import { Skeleton, Test } from '../..';

export default {
    title: 'External/Doc/Skeleton/Hooks/useAppType',
    component: Skeleton,
    argTypes: {},
    args: {},
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: {
            page: () => {
                return (
                    <>
                        <Title />
                        <Subtitle />
                        <Description />
                        <Primary />
                        <ArgsTable story={PRIMARY_STORY} />
                    </>
                );
            },
            description: {
                component: 'usage of hook:useAppType',
            },
        },
        layout: 'fullscreen',
    },
};

const Template: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const appTypeState = Skeleton.Hooks.useAppType();

    const title = 'setTitle/useAppType';

    const AppStructure: Skeleton.Types.T_AppStructure = {
        AppInfo: { ...{ default: true, mainMenu: true }, ...Skeleton.Components.DummyInfoStateComponentStructure },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle(title);
        appTypeState.setAppType('test');
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const UseAppType = Template.bind({});
UseAppType.args = {};
