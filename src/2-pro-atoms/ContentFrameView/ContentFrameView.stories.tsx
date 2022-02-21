import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContentFrameView from './ContentFrameView';
import { Home } from 'grommet-icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/molecules/ContentFrameView',
    component: ContentFrameView,
    argTypes: {
        toggleCollapsed: { table: { disable: true } },
        toggleClosed: { table: { disable: true } },
        titleIcon: { table: { disable: true } },
        scope: { table: { disable: true } },
        id: { table: { disable: true } },
        children: { table: { disable: true } },
        pad: { table: { disable: true } },
        margin: { table: { disable: true } },
        flex: { table: { disable: true } },
        height: { table: { disable: true } },
    },
    args: {
        toggleCollapsed: action('toggleCollapsed Pressed: '),
        toggleClosed: action('toggleClosed Pressed: '),
        titleIcon: Home,
        title: 'Title',
        scope: 'Scope',
        id: 'ID',
        children: <div>I'm the Child</div>,
    },
} as ComponentMeta<typeof ContentFrameView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentFrameView> = (args) => <ContentFrameView {...args} />;

export const Standard = Template.bind({});
Standard.args = { isCollapsible: false, isCollapsed: false, isClosable: true, isShowBody: true, isClosed: false };
