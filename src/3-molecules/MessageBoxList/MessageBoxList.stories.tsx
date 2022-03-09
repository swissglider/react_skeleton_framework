import React from 'react';
import { ComponentStory } from '@storybook/react';
import { MessageBoxList } from './MessageBoxList';
import { useMessages } from '../../10-addons/states/messageStates';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Box, Button, Text } from 'grommet';
import { Add } from 'grommet-icons';
import { useSizeState } from '../../10-addons/states/windowStates';
import { userEvent, within } from '@storybook/testing-library';

export default {
    title: 'Internal/molecules/MessageBoxList',
    component: MessageBoxList,
    argTypes: {
        msg: {
            table: { category: 'Standard', type: { required: true } },
            control: true,
            description: 'the message that will be shared',
        },
        msgTitle: { table: { category: 'storybook', type: { required: false } }, description: 'only for storybook' },
        msgMessage: { table: { category: 'storybook', type: { required: false } }, description: 'only for storybook' },
        severity: {
            table: { category: 'storybook', type: { required: false } },
            options: ['info', 'success', 'warning', 'critical', 'error'],
            control: { type: 'radio' },
            description: 'only for storybook',
        },
        size: {
            table: { category: 'storybook', type: { required: false } },
            options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
            control: { type: 'radio' },
            description: 'only for storybook',
        },
    },
    args: {
        msgTitle: 'I am a Warning',
        msgMessage: 'Please do the following to avoid the error!',
        severity: 'warning',
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
};

const Template1: ComponentStory<typeof MessageBoxList> = ({ size, msgTitle, msgMessage, severity = 'warning' }) => {
    const messageState = useMessages();
    const sizeState = useSizeState();
    sizeState.set(size);

    const addMsg = (): void => {
        messageState.addNewMessage(msgTitle, msgMessage, severity);
    };
    return (
        <Box gap="small">
            <Box direction="row" justify="end" gap="small" align="center">
                <Text>Change the args in the table below and add it </Text>
                <Button icon={<Add size="large" />} onClick={() => addMsg()} role="button" aria-label={`AddBtn`} />
            </Box>
            <Box border={true} round pad="small">
                <h1>new messages: {messageState.getNewCount()}</h1>
                <MessageBoxList state="new" />
            </Box>
            <Box border={true} round pad="small">
                <h1>readed messages: {messageState.getReadedCount()}</h1>
                <MessageBoxList state="readed" />
            </Box>
        </Box>
    );
};

export const Small = Template1.bind({});
Small.args = { size: 'small' };
Small.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
import { MessageBoxList } from './MessageBoxList';
import { useMessages } from '../../10-addons/states/messageStates';
import { T_AppMessage } from '../../10-addons/types/frameworkTypes';
import { Box, Button, Text } from 'grommet';
import { Add } from 'grommet-icons';


const Comp = ({ msgTitle, msgMessage, severity })=>{
    const messageState = useMessages();
    const addMsg = (): void => {
        messageState.addNewMessage(msgTitle, msgMessage, severity);
    };
    return (
        <Box gap="small">
            <Box direction="row" justify="end" gap="small" align="center">
                <Text>Change the args in the table below and add it </Text>
                <Button icon={<Add size="large" />} onClick={() => addMsg()} />
            </Box>
            <Box border={true} round pad="small">
                <h1>new messages: {messageState.getNewCount()}</h1>
                <Box direction="row" wrap gap="xsmall">
                    <MessageBoxList state="new" />
                </Box>
            </Box>
            <Box border={true} round pad="small">
                <h1>readed messages: {messageState.getReadedCount()}</h1>
                <Box direction="row" wrap gap="xsmall">
                    <MessageBoxList state="readed" />
                </Box>
            </Box>
        </Box>
    );
}
            `,
        },
    },
};
Small.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const args_org = { ...args };

    // read all and delete all first
    (await canvas.getAllByRole('button'))
        .filter((e) => e.ariaLabel.startsWith('MessageBoxViewBtn_'))
        .forEach((w) => userEvent.click(w));
    (await canvas.getAllByRole('button'))
        .filter((e) => e.ariaLabel.startsWith('MessageBoxDeleteBtn_'))
        .forEach((w) => userEvent.click(w));
    (await canvas.getAllByRole('button'))
        .filter((e) => e.ariaLabel.startsWith('MessageBoxDeleteBtn_'))
        .forEach((w) => userEvent.click(w));

    // add two and set it to readed
    const addBTN1 = await canvas.getByRole('button', { name: `AddBtn` });
    await userEvent.click(addBTN1);
    args.msgTitle = 'Proceeded with success';
    args.msgMessage = 'Well done, do it again';
    args.severity = 'success';
    await userEvent.click(addBTN1);
    (await canvas.getAllByRole('button'))
        .filter((e) => e.ariaLabel.startsWith('MessageBoxViewBtn_'))
        .forEach((w) => userEvent.click(w));

    // add other two
    args.msgTitle = 'New Update available';
    args.msgMessage = 'Please reload the application to get the new Update';
    args.severity = 'info';
    await userEvent.click(addBTN1);
    args.msgTitle = 'The following critical Problem occured';
    args.msgMessage = 'Memory is very low, please check why it is the case';
    args.severity = 'critical';
    await userEvent.click(addBTN1);
    args = { ...args, ...args_org };
};

export const Medium = Template1.bind({});
Medium.args = { size: 'medium' };
