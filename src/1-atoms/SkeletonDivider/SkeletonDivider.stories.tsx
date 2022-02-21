import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonDivider from './SkeletonDivider';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/atoms/SkeletonDivider',
    component: SkeletonDivider,
} as ComponentMeta<typeof SkeletonDivider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SkeletonDivider> = (args) => <SkeletonDivider {...args} />;

export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = { skeleton: true };

export const Brand = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Brand.args = { skeleton: false };
