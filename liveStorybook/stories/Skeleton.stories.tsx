import React, { useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';

export default {
    title: 'Doc/App/Skeleton',
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
                component: 'Simple Skeleton usage',
            },
        },
        layout: 'fullscreen',
    },
};

const Template: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const AppStructure: Skeleton.Types.T_AppStructure = {
        MenuTest: { ...{ default: true, mainMenu: true }, ...Test.Components.TestMenuComponentStructure },
        AppInfo: { ...{ mainMenu: true }, ...Skeleton.Components.DummyInfoStateComponentStructure },
        Test1: Test.Components.Test1Structure,
        Test2: Test.Components.Test2Structure,
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle('First Skeleton App');
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const Standard = Template.bind({});
Standard.args = {};
