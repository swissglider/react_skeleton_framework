import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageBoxView from './MessageBoxView';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Internal/atoms/MessageBoxView',
    component: MessageBoxView,
    argTypes: {
        msg: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Message to be showned',
            control: false,
        },
        setAsReaded: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'called when the read button clicked',
            control: false,
        },
        size: {
            table: { category: 'Optional', type: { required: false } },
            description: 'Grommet ResponsiveContext size of the window',
            control: false,
        },
        deleteMsg: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'called when the delete button clicked',
            control: false,
        },
    },
    // args: {
    //     msg: {
    //         time: 1645433171454,
    //         severity: 'warning',
    //         msgTitle: 'I am an Error',
    //         msgMessage: 'Please do the following to awaid the error!',
    //         new: true,
    //     },
    //     setAsReaded: action('Menu Part Pressed: '),
    //     size: 'small',
    // },
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
} as ComponentMeta<typeof MessageBoxView>;

const Template1: ComponentStory<typeof MessageBoxView> = (args) => {
    return <MessageBoxView {...args} />;
};

export const NewMessageWarning = Template1.bind({});
NewMessageWarning.args = {
    msg: {
        time: 1645433171454,
        severity: 'warning',
        msgTitle: 'I am an Warning',
        msgMessage: 'Please do the following to awaid the error!',
        new: true,
    },
    setAsReaded: action('Menu Part readed Pressed: '),
    deleteMsg: action('Menu Part Deleted Pressed: '),
    size: 'small',
};

NewMessageWarning.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
import { Menu } from 'grommet-icons';
import MessageBoxView from './MessageBoxView';

const msg = {
    time: 1645433171454,
    severity: 'warning',
    msgTitle: 'I am an Warning',
    msgMessage: 'Please do the following to awaid the error!',
    new: true,
},
const Comp = ()=>{
    return (
        <MessageBoxView
            msg={msg}
            setAsReaded={(msgTime: number) => messageState.setAsReaded(msgTime)}
            deleteMsg={(msgTime: number) => messageState.deleteMsg(msgTime)}
            size="small"
        />
    )
}
            `,
        },
    },
};
// Standard.play = async ({ args, canvasElement }) => {
//     const canvas = within(canvasElement);

//     await userEvent.click(canvas.getByRole('button'));

//     await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
// };
NewMessageWarning.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const MessageBoxViewBtn = await canvas.getByRole('button', { name: `MessageBoxViewBtn_${args.msg.time}` });
    await userEvent.click(MessageBoxViewBtn);
};

export const ReadedMessageLargeSuccess = Template1.bind({});
ReadedMessageLargeSuccess.args = {
    msg: {
        time: 1645433171454,
        severity: 'success',
        msgTitle: 'Well done',
        msgMessage: 'The process was successfull!',
        new: false,
    },
    setAsReaded: action('Menu Part Pressed: '),
    deleteMsg: action('Menu Part Deleted Pressed: '),
    size: 'large',
};
ReadedMessageLargeSuccess.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const MessageBoxDeleteBtn = await canvas.getByRole('button', { name: `MessageBoxDeleteBtn_${args.msg.time}` });
    await userEvent.click(MessageBoxDeleteBtn);
};

export const ErrorMSG = Template1.bind({});
ErrorMSG.args = {
    msg: {
        time: 1645433171454,
        severity: 'error',
        msgTitle: 'Error',
        msgMessage: 'The following error occured',
        new: true,
        msgError: new Error('TypeError'),
    },
    setAsReaded: action('Menu Part Pressed: '),
    deleteMsg: action('Menu Part Deleted Pressed: '),
    size: 'small',
};

export const Info = Template1.bind({});
Info.args = {
    msg: {
        time: 1645433171454,
        severity: 'info',
        msgTitle: 'Info',
        msgMessage: 'Hello, this are the news',
        new: true,
    },
    setAsReaded: action('Menu Part Pressed: '),
    deleteMsg: action('Menu Part Deleted Pressed: '),
    size: 'small',
};

export const Critical = Template1.bind({});
Critical.args = {
    msg: {
        time: 1645433171454,
        severity: 'critical',
        msgTitle: 'Critical',
        msgMessage: 'Memory getting low',
        new: true,
    },
    setAsReaded: action('Menu Part Pressed: '),
    deleteMsg: action('Menu Part Deleted Pressed: '),
    size: 'small',
};
