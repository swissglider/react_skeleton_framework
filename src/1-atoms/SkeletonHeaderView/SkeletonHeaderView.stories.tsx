import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonHeaderView from './SkeletonHeaderView';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Internal/atoms/SkeletonHeaderView',
    component: SkeletonHeaderView,
    argTypes: {
        title: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: Title of the Header',
        },
        back: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: called when back button pressed',
            control: false,
        },
        forward: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: called when foward button pressed',
            control: false,
        },
        showMsg: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: called when Message button pressed',
            control: false,
        },
        msgCount: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: count of Messages visible as badge on Msg Button',
        },
    },
    args: {
        title: 'Skeleton Header Title',
        msgCount: 3,
        back: action('Back Button Pressed: '),
        forward: action('Forward Button Pressed: '),
        showMsg: action('Show Message Button Pressed: '),
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
                component: 'This is the View of the Skeleton Header.',
            },
        },
    },
} as ComponentMeta<typeof SkeletonHeaderView>;

const Template1: ComponentStory<typeof SkeletonHeaderView> = (args) => {
    return <SkeletonHeaderView {...args} />;
};

export const Standard = Template1.bind({});
Standard.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
<SkeletonHeaderView
    back={() => {}}
    forward={() => {}}
    msgCount={3}
    showMsg={() => {}}
    title="Skeleton Header Title"
/>
            `,
        },
    },
};
// Standard.play = async ({ args, canvasElement }) => {
//     const canvas = within(canvasElement);

//     await userEvent.click(canvas.getByRole('button'));

//     await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
// };
Standard.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const showMsgButton = await canvas.getByRole('button', { name: 'showMsg' });
    const backButton = await canvas.getByRole('button', { name: 'back' });
    const forwardButton = await canvas.getByRole('button', { name: 'forward' });
    // const showMsgButton = await canvas.getByTestId('showMsg');
    await userEvent.click(showMsgButton);
    await userEvent.click(backButton);
    await userEvent.click(forwardButton);
};
