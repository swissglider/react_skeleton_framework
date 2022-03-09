import React, { useEffect } from 'react';
import { ComponentStory } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ShowMSGComponentStructure } from './ShowMSGComponent';
import { Box } from 'grommet';
import { useMessages } from '../../10-addons/states/messageStates';
import { useSizeState } from '../../10-addons/states/windowStates';
import { userEvent, within } from '@storybook/testing-library';

export default {
    title: 'Internal/oranismes/ShowMSGComponent',
    component: ShowMSGComponentStructure,
    argTypes: {},
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
                component: 'This is Main Part of the Skeletong',
            },
        },
    },
};

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const Template: any = ({ size }: any) => {
    const Comp = ShowMSGComponentStructure.Component as React.FunctionComponent<any>;
    const messageState = useMessages();
    const sizeState = useSizeState();

    useEffect(() => {
        const a = async (): Promise<void> => {
            messageState.deleteAll();
            await sleep(50);
            messageState.addNewMessage('MSG1', 'this is MSG1', 'info');
            await sleep(50);
            messageState.addNewMessage('MSG2', 'this is MSG2', 'info');
            await sleep(50);
            messageState.addNewMessage('Success1', 'this is success1', 'success');
            await sleep(50);
            messageState.addNewMessage('Success2', 'this is success2', 'success');
            await sleep(50);
            messageState.addNewMessage('Warning1', 'this is warning1', 'warning');
            await sleep(50);
            messageState.addNewMessage('Warning1', 'this is warning1', 'warning');
            await sleep(50);
            messageState.addNewMessage('Critical', 'this is critical', 'critical');
            await sleep(50);
            messageState.addNewMessage('error', 'this is error', 'error');
            await sleep(50);
            sizeState.set(size);
        };
        a();
    }, []);

    return (
        <Box height="400px">
            <Comp />
        </Box>
    );
};
export const Standard = Template.bind({});
Standard.args = { size: 'medium' };
Standard.play = async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement);
    const args_org = { ...args };
    // // read all and delete all first
    const buttons = await canvas.getAllByRole('button');
    // buttons.filter((e) => e.ariaLabel.startsWith('MessageBoxViewBtn_')).forEach((w) => console.log(w));
    // buttons = await canvas.getAllByRole('button');
    // buttons.filter((e) => e.ariaLabel.startsWith('MessageBoxDeleteBtn_')).forEach((w) => userEvent.click(w));
    // (await canvas.getAllByRole('button'))
    //     .filter((e) => e.ariaLabel.startsWith('MessageBoxDeleteBtn_'))
    //     .forEach((w) => userEvent.click(w));
    // (await canvas.getAllByRole('button'))
    //     .filter((e) => e.ariaLabel.startsWith('MessageBoxDeleteBtn_'))
    //     .forEach((w) => userEvent.click(w));
    // // add two and set it to readed
    // const addBTN1 = await canvas.getByRole('button', { name: `AddBtn` });
    // await userEvent.click(addBTN1);
    // args.msgTitle = 'Proceeded with success';
    // args.msgMessage = 'Well done, do it again';
    // args.severity = 'success';
    // await userEvent.click(addBTN1);
    // (await canvas.getAllByRole('button'))
    //     .filter((e) => e.ariaLabel.startsWith('MessageBoxViewBtn_'))
    //     .forEach((w) => userEvent.click(w));
    // // add other two
    // args.msgTitle = 'New Update available';
    // args.msgMessage = 'Please reload the application to get the new Update';
    // args.severity = 'info';
    // await userEvent.click(addBTN1);
    // args.msgTitle = 'The following critical Problem occured';
    // args.msgMessage = 'Memory is very low, please check why it is the case';
    // args.severity = 'critical';
    // await userEvent.click(addBTN1);
    // args = { ...args, ...args_org };
};

export const Small = Template.bind({});
Small.args = { size: 'small' };
