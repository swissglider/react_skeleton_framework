import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MoreMenuEntry from './MoreMenuEntry';
import { Announce } from 'grommet-icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/atoms/MoreMenuEntry',
    component: MoreMenuEntry,
    argTypes: {
        onClick: { table: { disable: true } },
        menuIcon: { table: { disable: true } },
    },
    args: {
        onClick: action('MoreMenuEntry Pressed: '),
    },
} as ComponentMeta<typeof MoreMenuEntry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MoreMenuEntry> = (args) => <MoreMenuEntry {...args} />;

export const WithStandardIcon = Template.bind({});
WithStandardIcon.args = { appComonentKey: 'WithStandardIcon', menuName: 'WithStandardIcon' };

export const WithIcon = Template.bind({});
WithIcon.args = { appComonentKey: 'WithIcon', menuName: 'WithIcon', menuIcon: Announce };
