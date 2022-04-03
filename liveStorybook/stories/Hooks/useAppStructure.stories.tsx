import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';
import { Home, NewWindow, ChapterAdd, Network } from 'grommet-icons';

export default {
    title: 'Doc/Skeleton/Hooks/useAppStructure',
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
                component: 'usage of hook:useAppStructure',
            },
        },
        layout: 'fullscreen',
    },
};

const SetTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const HomePageComponent: FC<any> = () => {
        return <div>Home Page</div>;
    };

    const SecondPageComponent: FC<any> = ({ name = 'Not set' }: any) => {
        return (
            <div>
                <h3>Second Page</h3>
                <hr />
                <p>Parameter:Name = {name}</p>
            </div>
        );
    };

    const MorePage1: FC<any> = () => {
        return <div>More Page 1</div>;
    };

    const MorePage2: FC<any> = () => {
        return <div>More Page 2</div>;
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            mainMenu: true,
            moreMenu: false,
            menuIcon: Home,
            isEmbedded: false,
            Component: HomePageComponent,
        },
        SecondPageComponent: {
            menuName: 'SecondPageComponent',
            default: false,
            menuIcon: NewWindow,
            isEmbedded: false,
            Component: SecondPageComponent,
            parameters: { name: 'Second Page 😀' },
        },
        MorePage1: {
            menuName: 'MorePage1',
            default: false,
            mainMenu: false,
            moreMenu: true,
            menuIcon: ChapterAdd,
            isEmbedded: false,
            Component: MorePage1,
        },
        MorePage2: {
            menuName: 'MorePage2',
            mainMenu: false,
            moreMenu: true,
            Component: MorePage2,
        },
    };

    useEffect(() => {
        titleState.setTitle('set');
        appStructureState.set(AppStructure);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const Set = SetTemplate.bind({});
Set.args = {};

const AddNewMenuTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const MorePage1: FC<any> = () => {
        return <div>Added More Page 1</div>;
    };

    const AddMenu: FC<any> = () => {
        return <div>Added Menu</div>;
    };

    const HomePageComponent: FC<any> = () => {
        const appStructureState1 = Skeleton.Hooks.useAppStructure();
        const addNewMenu = () => {
            appStructureState1.addNewMenu('MorePage1', {
                menuName: 'MorePage1',
                mainMenu: false,
                moreMenu: true,
                Component: MorePage1,
            });
            appStructureState1.addNewMenu('AddMenu', {
                menuName: 'AddMenu',
                mainMenu: true,
                moreMenu: false,
                Component: AddMenu,
                menuIcon: ChapterAdd,
            });
        };
        return (
            <div>
                <h3>Add New Menu</h3>
                <p>AddMenu available: {appStructureState1.isMenuAvailable('AddMenu').toString()}</p>
                <hr />
                <button onClick={() => addNewMenu()}>AddNewMenu</button>
            </div>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            mainMenu: true,
            moreMenu: false,
            menuIcon: Home,
            isEmbedded: false,
            Component: HomePageComponent,
        },
    };

    useEffect(() => {
        titleState.setTitle('addNewMenu');
        appStructureState.set(AppStructure);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const AddNewMenu = AddNewMenuTemplate.bind({});
AddNewMenu.args = {};

const DeleteMenuTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const MoreMenuToDelete: FC<any> = () => {
        return <div>More Menu to delete</div>;
    };

    const MenuToDelete: FC<any> = () => {
        return <div>Menu to delete</div>;
    };

    const HomePageComponent: FC<any> = () => {
        const appStructureState1 = Skeleton.Hooks.useAppStructure();
        const deleteMenu = () => {
            appStructureState1.deleteMenu('MoreMenuToDelete');
            appStructureState1.deleteMenu('MenuToDelete');
        };
        return (
            <div>
                <h3>Delte Menu</h3>
                <p>MenuToDelete available: {appStructureState1.isMenuAvailable('MenuToDelete').toString()}</p>
                <hr />
                <button onClick={() => deleteMenu()}>DeleteMenu</button>
            </div>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            mainMenu: true,
            moreMenu: false,
            menuIcon: Home,
            isEmbedded: false,
            Component: HomePageComponent,
        },
        MoreMenuToDelete: {
            menuName: 'MoreMenuToDelete',
            mainMenu: false,
            moreMenu: true,
            Component: MoreMenuToDelete,
        },
        MenuToDelete: {
            menuName: 'MenuToDelete',
            mainMenu: true,
            moreMenu: false,
            Component: MenuToDelete,
            menuIcon: ChapterAdd,
        },
    };

    useEffect(() => {
        titleState.setTitle('deleteMenu');
        appStructureState.set(AppStructure);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const DeleteNewMenu = DeleteMenuTemplate.bind({});
DeleteNewMenu.args = {};

const EmbeddedMenuTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();

    const Page1: FC<any> = () => {
        return <div>I'm Page1</div>;
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        Embedded1: {
            menuName: 'Embedded1',
            default: true,
            menuIcon: Network,
            isEmbedded: true,
            embeddedLink:
                '/react_skeleton_framework/iframe.html?id=doc-app-skeleton--standard&globals=backgrounds.grid:false&viewMode=story',
        },
        Page1: {
            menuName: 'Page1',
            Component: Page1,
            menuIcon: ChapterAdd,
        },
    };

    useEffect(() => {
        titleState.setTitle('embedded');
        appStructureState.set(AppStructure);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};
export const EmbeddedMenu = EmbeddedMenuTemplate.bind();
EmbeddedMenu.args = {};
