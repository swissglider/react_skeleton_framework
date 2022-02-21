import React, { useEffect } from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonMenuPart from './SkeletonMenuPart';
import { T_AppStructure } from '../../10-addons/types/frameworkTypes';
// import { action } from '@storybook/addon-actions';
import { Menu, Action, CirclePlay, Trophy, Run } from 'grommet-icons';
import { Box } from 'grommet';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

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
    title: 'Internal/organisms/SkeletonMenuPart',
    component: SkeletonMenuPart,
    argTypes: {
        appComonentKey: {
            description: 'AppStructure Key that descipes this AppStructure<br>- <em>Component see Code</em>',
            control: false,
        },
        appComonentValue: {
            description: 'AppStructure Value that descipes this AppStructure<br>- <em>Component see Code</em>',
            control: false,
        },
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
                component: 'This is the View of the Skeleton Menu Part (Icon).',
            },
        },
    },
} as ComponentMeta<typeof SkeletonMenuPart>;

const Template1: ComponentStory<typeof SkeletonMenuPart> = (args) => {
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    useEffect(() => {
        appState.set(appStructure);
        selectedComponentState.set('menu1');
    }, []);
    return (
        <Box>
            <Box direction="row" justify="center" background="light-4">
                <h2>Selected Menu: {selectedComponentState.getMenuName()}</h2>
            </Box>
            <Box background="dark-2" pad="small">
                <Box direction="row" justify="center">
                    <h1>{args.mainMenu ? 'Main Menu' : 'Sub Menu'}</h1>
                </Box>
                <Box
                    direction="row"
                    gap="large"
                    justify="around"
                    border={{ size: 'small', style: 'solid' }}
                    round
                    pad={args.mainMenu ? 'small' : 'xsmall'}
                >
                    {Object.entries(appStructure).map(([key, value]) => (
                        <SkeletonMenuPart key={key} {...args} appComonentKey={key} appComonentValue={value} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export const MainMenu = Template1.bind({});
MainMenu.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuIconBTN1 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_Menu` });
    await userEvent.click(menuIconBTN1);
    const menuIconBTN2 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_Action` });
    await userEvent.click(menuIconBTN2);
    const menuIconBTN3 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_CirclePlay` });
    await userEvent.click(menuIconBTN3);
    const menuIconBTN4 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_Trophy` });
    await userEvent.click(menuIconBTN4);
    const menuIconBTN5 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_Run` });
    await userEvent.click(menuIconBTN5);
    const menuIconBTN6 = await canvas.getByRole('button', { name: `MenuPartBoxBtn_Menu` });
    await userEvent.click(menuIconBTN6);
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

const SuroundBox = ():JSX.Element => {
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    useEffect(() => {
        appState.set(appStructure);
        selectedComponentState.set('menu1');
    }, []);
    return (
        <Box>
            <Box direction="row" justify="center" background="light-4">
                <h2>Selected Menu: {selectedComponentState.getMenuName()}</h2>
            </Box>
            <Box background="dark-2" pad="small">
                <Box direction="row" justify="center">
                    <h1>{args.mainMenu ? 'Main Menu' : 'Sub Menu'}</h1>
                </Box>
                <Box
                    direction="row"
                    gap="large"
                    justify="around"
                    border={{ size: 'small', style: 'solid' }}
                    round
                    pad={args.mainMenu ? 'small' : 'xsmall'}
                >
                    {Object.entries(appStructure).map(([key, value]) => (
                        <SkeletonMenuPart key={key} {...args} appComonentKey={key} appComonentValue={value} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
            `,
        },
    },
};

export const SubMenu = Template1.bind({});
SubMenu.args = { mainMenu: false };
