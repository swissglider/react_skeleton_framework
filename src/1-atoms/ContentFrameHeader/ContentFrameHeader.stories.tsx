import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContentFrameHeader from './ContentFrameHeader';
import { Home } from 'grommet-icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/atoms/ContentFrameHeader',
    component: ContentFrameHeader,
    argTypes: {
        toggleCollapsed: { table: { disable: true } },
        toggleClosed: { table: { disable: true } },
        titleIcon: { table: { disable: true } },
        scope: { table: { disable: true } },
        id: { table: { disable: true } },
    },
    args: {
        toggleCollapsed: action('toggleCollapsed Pressed: '),
        toggleClosed: action('toggleClosed Pressed: '),
        titleIcon: Home,
        title: 'Title',
        scope: 'Scope',
        id: 'ID',
    },
} as ComponentMeta<typeof ContentFrameHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentFrameHeader> = (args) => <ContentFrameHeader {...args} />;

export const Standard = Template.bind({});
Standard.args = { isCollapsible: false, isCollapsed: false, isClosable: true, isShowBody: true };
