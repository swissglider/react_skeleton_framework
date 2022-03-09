import React, { useEffect } from 'react';
import { ComponentStory } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import MainPart from './MainPart';
import { S_landscapeState, useVariantState } from '../../10-addons/states/frameworkStates';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { Box } from 'grommet';
import { Menu as MenuIcon, Action } from 'grommet-icons';
import { T_AppStructure } from '../../10-addons/types/frameworkTypes';
import { useState } from '@hookstate/core';

const appStructure: T_AppStructure = {
    menu1: {
        menuName: 'Menu',
        menuIcon: MenuIcon,
        default: true,
        parameters: { p1: 'Parameter1 ;-)' },
        Component: ({ p1 = 'default' }: any): JSX.Element => (
            <Box pad="xlarge" round="full" border={true} justify="center" alignSelf="center">
                Hallo Menu {p1}
            </Box>
        ),
    },
    action: {
        menuName: 'Action',
        menuIcon: Action,
        isEmbedded: true,
        embeddedLink: 'iframe.html?id=internal-molecules-mainpart--standard&args=&viewMode=story',
    },
};

export default {
    title: 'Internal/molecules/MainPart',
    component: MainPart,
    argTypes: {
        component: { table: { disable: true } },
        variant: { table: { disable: true } },
        isLandscape: { table: { disable: true } },
    },
    args: {
        component: 'menu1',
        variant: 'full',
        isLandscape: false,
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
                component: 'This is Main Part of the Skeletong',
            },
        },
    },
};

const Template: ComponentStory<any> = ({ component, variant, isLandscape }) => {
    const variantState = useVariantState();
    const selectedComponentState = useSelectedComponent();
    const appState = useAppStructure();
    const landscapeState = useState(S_landscapeState);

    useEffect(() => {
        appState.set(appStructure);
    }, []);

    useEffect(() => {
        selectedComponentState.set(component);
    }, [component]);

    useEffect(() => {
        variantState.set(variant);
    }, [variant]);

    useEffect(() => {
        landscapeState.set(isLandscape);
    }, [isLandscape]);

    return (
        <Box height="400px">
            <MainPart />
        </Box>
    );
};
export const Standard = Template.bind({});
Standard.args = { component: 'menu1', variant: 'full', isLandscape: false };

export const Embedded = Template.bind({});
Embedded.args = { component: 'menu1', variant: 'embedded', isLandscape: false };

export const EmbeddedLandscape = Template.bind({});
EmbeddedLandscape.args = { component: 'menu1', variant: 'embedded', isLandscape: true };

export const IFrame = Template.bind({});
IFrame.args = { component: 'action', variant: 'full', isLandscape: false };
