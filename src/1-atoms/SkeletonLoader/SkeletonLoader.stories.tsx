import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkeletonLoader } from './SkeletonLoader';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/atoms/SkeletonLoader',
    component: SkeletonLoader,
} as ComponentMeta<typeof SkeletonLoader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SkeletonLoader> = () => <SkeletonLoader />;

export const SimpleShow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SimpleShow.args = {};
