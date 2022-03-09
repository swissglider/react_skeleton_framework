import React from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmbeddedTitleView from './EmbeddedTitleView';

export default {
    title: 'Internal/pro-atoms/EmbeddedTitleView',
    component: EmbeddedTitleView,
    argTypes: {
        title: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'embedded Title',
        },
        isLandscape: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'is it landscape mode',
        },
    },
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
                component:
                    '*This* is the Title that is used on Embedded Mode, that means if it is used as subcomponent',
            },
            source: {
                code: '<EmbeddedTitleView title={title} isLandscape={isLandscape} />',
            },
        },
    },
} as ComponentMeta<typeof EmbeddedTitleView>;

const Template: ComponentStory<typeof EmbeddedTitleView> = (args) => {
    return <EmbeddedTitleView {...args} />;
};

export const Portrait = Template.bind({});
Portrait.args = { title: "I'm a Portrait embedded Title", isLandscape: false };

export const Landscape = Template.bind({});
Landscape.args = { title: "I'm a Landscape embedded Title", isLandscape: true };
