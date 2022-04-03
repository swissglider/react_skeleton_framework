import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '../..';
import { Home } from 'grommet-icons';

export default {
    title: 'External/Doc/Skeleton/Hooks/useSelectedComponent',
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
                component: 'usage of hook:useSelectedComponent',
            },
        },
        layout: 'fullscreen',
    },
};

const GetMenuMenustructNameTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const title = 'getMenuName';

    const HomePageComponent: FC<any> = () => {
        const selectedComponent = Skeleton.Hooks.useSelectedComponent();

        return (
            <div>
                <h3>getMenuName</h3>
                <p>Selected Menu Name: {selectedComponent.getMenuName()}</p>
                <h3>getMenuStructName</h3>
                <p>Selected Menu Struct Name: {selectedComponent.getMenuStructName()}</p>
                <hr />
            </div>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage_: {
            menuName: 'HomePage !',
            default: true,
            menuIcon: Home,
            Component: HomePageComponent,
        },
        Page1_: {
            menuName: 'Page1 !',
            Component: HomePageComponent,
        },
        Page2_: {
            menuName: 'Page2 !',
            Component: HomePageComponent,
        },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle(title);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const GetMenuAndMenustructName = GetMenuMenustructNameTemplate.bind({});
GetMenuAndMenustructName.args = {};

const GetComponentTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const selectedComponent = Skeleton.Hooks.useSelectedComponent();
    const Comp = selectedComponent.getComponent().Component;

    const HomePageComponent: FC<any> = () => {
        return (
            <div>
                <h3>{selectedComponent.getMenuName()}</h3>
                <hr />
            </div>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage_: {
            menuName: 'HomePage !',
            default: true,
            menuIcon: Home,
            Component: HomePageComponent,
        },
        Page1_: {
            menuName: 'Page1 !',
            Component: HomePageComponent,
        },
        Page2_: {
            menuName: 'Page2 !',
            Component: HomePageComponent,
        },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
    }, []);

    return (
        <>
            {isReset ? (
                <div style={{ padding: '20px' }}>
                    <div>{Comp ? <Comp /> : <div>Error</div>}</div>
                    <div>
                        {Object.entries(appStructureState.get()).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => selectedComponent.setSelectedComponent(key)}
                                style={
                                    selectedComponent.getComponent().menuName === value.menuName
                                        ? { backgroundColor: 'black', color: 'white' }
                                        : { backgroundColor: 'white', color: 'black' }
                                }
                            >
                                {value.menuName}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <Skeleton.Parts.SkeletonLoader />
            )}
        </>
    );
};

export const GetComponent = GetComponentTemplate.bind({});
GetComponent.args = {};
