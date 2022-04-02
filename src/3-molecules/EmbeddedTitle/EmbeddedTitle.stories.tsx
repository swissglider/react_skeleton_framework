import React, { useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmbeddedTitle from './EmbeddedTitle';
import { useAppTitle } from '../../10-addons/states/titleStates';
import { Menu as MenuIcon, Action, CirclePlay, Trophy, Run } from 'grommet-icons';
import { T_AppStructure } from '../../10-addons/types/frameworkTypes';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { useSizeState } from '../../10-addons/states/windowStates';

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
    title: 'Internal/molecules/EmbeddedTitle',
    component: EmbeddedTitle,
    argTypes: {
        title: {
            table: { category: 'storybook', type: { required: false } },
            description: 'embedded Title',
        },
        isLandscape: {
            table: { category: 'storybook', type: { required: false } },
            description: 'is it landscape mode',
        },
        isMobile: {
            table: { category: 'storybook', type: { required: false } },
            description: 'is it mobile',
        },
        size: {
            table: { category: 'storybook', type: { required: false } },
            options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
            control: { type: 'radio' },
            description: 'only for storybook',
        },
    },
    args: {
        title: 'title',
        isLandscape: false,
        isMobile: true,
        size: 'small',
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
                component:
                    '*This* is the Title that is used on Embedded Mode, that means if it is used as subcomponent',
            },
            source: {
                code: `
import { useState } from '@hookstate/core';
import { useAppTitle } from '../../10-addons/states/titleStates';

const Comp = () => {
    const titleState = useAppTitle();
    useEffect(() => {
        titleState.setTitle("I'm a Portrait embedded Title");
    }, []);
    return <SkeletonEmbeddedTitle />;
};
                `,
            },
        },
    },
} as ComponentMeta<typeof EmbeddedTitle>;

const Template: ComponentStory<any> = ({ title, size }) => {
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    const titleState = useAppTitle();
    const sizeState = useSizeState();
    useEffect(() => {
        appState.set(appStructure);
        selectedComponentState.setSelectedComponent('menu1');
    }, []);
    useEffect(() => {
        titleState.setTitle(title);
    }, [title]);
    useEffect(() => {
        sizeState.set(size);
    }, [size]);
    return <EmbeddedTitle />;
};

export const Portrait = Template.bind({});
Portrait.args = {
    title: "I'm a Portrait embedded Title",
    isLandscape: false,
};

export const Landscape = Template.bind({});
Landscape.args = {
    title: "I'm a Landscape embedded Title",
    isLandscape: true,
};
