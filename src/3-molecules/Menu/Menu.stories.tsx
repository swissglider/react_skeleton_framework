import React, { useEffect } from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './Menu';
import { T_AppStructure } from '../../10-addons/types/frameworkTypes';
// import { action } from '@storybook/addon-actions';
import { Menu as MenuIcon, Action, CirclePlay, Trophy, Run } from 'grommet-icons';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

const appStructure: T_AppStructure = {
    menu1: {
        menuName: 'Menu',
        menuIcon: MenuIcon,
        default: true,
    },
    action: {
        menuName: 'Action',
        menuIcon: Action,
    },
    circlePlay: {
        menuName: 'CirclePlay',
        menuIcon: CirclePlay,
    },
    trophy: {
        menuName: 'Trophy',
        menuIcon: Trophy,
    },
    run: {
        menuName: 'Run',
        menuIcon: Run,
    },
};

export default {
    title: 'Internal/molecules/Menu',
    component: Menu,
    argTypes: {
        mainMenu: {
            description:
                'Show it as Main Menu or Sub Menu<br>:: Sub Menu is used i.e. if Skeleton is used in a iFrame as embedded',
        },
    },
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
                component: 'This is the Menu (can be Sub or Main Menu).',
            },
        },
    },
} as ComponentMeta<typeof Menu>;

const Template1: ComponentStory<typeof Menu> = ({ mainMenu }) => {
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    useEffect(() => {
        appState.set(appStructure);
        selectedComponentState.set('menu1');
    }, []);
    return <Menu mainMenu={mainMenu} />;
};

export const MainMenu = Template1.bind({});
MainMenu.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    buttons.filter((e) => e.ariaLabel.startsWith('MenuPartBoxBtn_')).forEach((w) => userEvent.click(w));
};
MainMenu.args = { mainMenu: true };
MainMenu.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
import SkeletonMenuPart from './SkeletonMenuPart';
import { T_AppStructure } from '../../types/frameworkTypes';
import { useAppStructure, useSelectedComponent } from '../../states/appStructureStates';

const appStructure: T_AppStructure = {
    menu1: {
        menuName: 'Menu',
        menuIcon: Menu,
        default: true,
    },
    action: {
        menuName: 'Action',
        menuIcon: Action,
    },
    ...
};

const SuroundBox = ({mainMenu}):JSX.Element => {
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    useEffect(() => {
        appState.set(appStructure);
        selectedComponentState.set('menu1');
    }, []);
    return <Menu mainMenu={mainMenu} />;
}
            `,
        },
    },
};

export const SubMenu = Template1.bind({});
SubMenu.args = { mainMenu: false };
