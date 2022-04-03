import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';
import { Home } from 'grommet-icons';

export default {
    title: 'Doc/Skeleton/Hooks/useComponentHistory',
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
                component: 'usage of hook:useComponentHistory',
            },
        },
        layout: 'fullscreen',
    },
};
const UseComponentHistoryTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const selectedComponent = Skeleton.Hooks.useSelectedComponent();
    const historyState = Skeleton.Hooks.useComponentHistory();
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
                    <div>
                        <button disabled={!historyState.hasBack()} onClick={() => historyState.back()}>
                            {'<'}
                        </button>
                        <button disabled={!historyState.hasForward()} onClick={() => historyState.forward()}>
                            {'>'}
                        </button>
                    </div>
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

export const UseComponentHistory = UseComponentHistoryTemplate.bind({});
UseComponentHistory.args = {};
