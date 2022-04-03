import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '../..';
import { Home } from 'grommet-icons';

export default {
    title: 'External/Doc/Skeleton/Hooks/useGrommetTheme',
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
                component: 'usage of hook:useGrommetTheme',
            },
        },
        layout: 'fullscreen',
    },
};

const customThemeTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const grommetThemeState = Skeleton.Hooks.useGrommetTheme();

    const title = 'setTitle/useGrommetTheme';

    const HomePage: FC<any> = () => {
        return <div>Custom Theme</div>;
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            menuIcon: Home,
            Component: HomePage,
        },
    };

    const custTheme = {
        global: {
            colors: {
                'dark-1': { dark: '#112342', light: '#ee3452' },
                brand: {
                    dark: '#ff3344',
                    light: '#3f42f3',
                },
            },
        },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle(title);
        grommetThemeState.setGrommetTheme(custTheme);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const customTheme = customThemeTemplate.bind({});
customTheme.args = {};
