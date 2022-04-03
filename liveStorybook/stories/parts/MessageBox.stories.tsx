import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useEffect } from 'react';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';

export default {
    title: 'Doc/Skeleton/Parts/MessageBox',
    component: Skeleton,
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
                component: 'usage of part:MessageBox',
            },
        },
        layout: 'fullscreen',
    },
};

const NotRegisteredMessageTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const msg: Skeleton.Types.T_AppMessage = {
        time: Date.now(),
        severity: 'success',
        msgTitle: 'Hallo Title',
        msgMessage: 'Hallo Message',
        new: true,
        msgError: new Error('Hallo Error'),
        popUpOnSkeleton: true,
    };
    return (
        <>
            {isReset ? (
                <div>
                    <h3>NotRegisteredMessage</h3>
                    <p>Message should not be showed because it is not yet registered</p>
                    <hr />
                    <Skeleton.Parts.MessageBox msg={msg} />
                </div>
            ) : (
                <Skeleton.Parts.SkeletonLoader />
            )}
        </>
    );
};

export const NotRegisteredMessage = NotRegisteredMessageTemplate.bind({});
NotRegisteredMessage.args = {};

const RegisteredMessageTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const messageState = Skeleton.Hooks.useMessages();
    useEffect(() => {
        messageState.addNewMessage('Hallo Title', 'Hallo Message', 'success', new Error('Hallo Error'), true);
    }, []);

    return (
        <>
            {isReset ? (
                <div>
                    <h3>RegisteredMessage</h3>
                    <p>New Message should be showed as it is registered</p>
                    <hr />
                    {messageState.getNewCount() > 0 ? (
                        <Skeleton.Parts.MessageBox msg={messageState.getLastNew()} />
                    ) : (
                        <p>no new Message</p>
                    )}
                </div>
            ) : (
                <Skeleton.Parts.SkeletonLoader />
            )}
        </>
    );
};

export const RegisteredMessage = RegisteredMessageTemplate.bind({});
RegisteredMessage.args = {};
