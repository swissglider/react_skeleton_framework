import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentFrameSimple } from './contentFrameSimple';

export default {
    title: 'Internal/pro-atoms/ContentFrameSimple',
    component: ContentFrameSimple,
    argTypes: {
        title: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Title of the Simple Content Frame',
        },
        children: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Child Element of the Simple Content Frame',
            control: false,
        },
        collapsible: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Is the Frame collapsible',
        },
        defaultOpen: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Is the Frame default not collapsed',
        },
        showBody: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Should the body be showned',
            control: false,
        },
    },
    args: {
        title: "I'm a simple ContentFrame",
        children: (
            <div>
                <div>Hallo Child</div>
                <div>Hallo Child</div>
                <div>Hallo Child</div>
            </div>
        ),
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
} as ComponentMeta<typeof ContentFrameSimple>;

const Template1: ComponentStory<typeof ContentFrameSimple> = (args) => {
    return <ContentFrameSimple {...args} />;
};

export const Standard = Template1.bind({});
Standard.args = {
    title: "I'm a simple ContentFrame: Standard",
    collapsible: true,
    defaultOpen: true,
    showBody: true,
};

Standard.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const ContentFrameSimpleCollapseBtn = await canvas.getByRole('button', {
        name: `ContentFrameSimpleCollapseBtn_${args.title}`,
    });
    await userEvent.click(ContentFrameSimpleCollapseBtn);
    await userEvent.click(ContentFrameSimpleCollapseBtn);
};
