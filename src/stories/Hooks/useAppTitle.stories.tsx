import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton } from '../..';
import { Home } from 'grommet-icons';
import { Test } from '../../Test';

export default {
    title: 'External/Doc/Skeleton/Hooks/useAppTitle',
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
                component: 'usage of hook:useAppTitle',
            },
        },
        layout: 'fullscreen',
    },
};

const SetTitleTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const title = 'setTitle/getTitle';

    const HomePageComponent: FC<any> = () => {
        const titleState1 = Skeleton.Hooks.useAppTitle();

        const resetTitle = (): void => {
            titleState.setTitle(title);
        };

        return (
            <div>
                <h3>useAppTitle</h3>
                <p>Title: {titleState1.getTitle()}</p>
                <hr />
                <input
                    type="text"
                    id="fname"
                    name="title"
                    onChange={(e) => titleState.setTitle(e.target.value)}
                    value={titleState1.getTitle()}
                />
                <br />
                <button onClick={() => resetTitle()}>ResetTitle</button>
            </div>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            menuIcon: Home,
            Component: HomePageComponent,
        },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle(title);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const useAppTitle = SetTitleTemplate.bind({});
useAppTitle.args = {};
