import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';
import { useState } from 'react';
import {
    Box,
    Button,
    CheckBox,
    Header,
    Heading,
    Main,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Text,
    TextInput,
} from 'grommet';
import { CaretDownFill, CaretRightFill, Trash, View, Add, FormTrash } from 'grommet-icons';

export default {
    title: 'Doc/Skeleton/Hooks/useMessages',
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
                component: 'usage of hook:useMessages',
            },
        },
        layout: 'fullscreen',
    },
};

const colorMap: any = {
    info: 'neutral-3',
    success: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical',
    error: 'accent-2',
};

const MessageTestTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const messageState = Skeleton.Hooks.useMessages();
    const [newMsgTitel, setNewMsgTitle] = useState<string>('');
    const [newMsgMessage, setNewMsgMessage] = useState<string>('');
    const [newPopUpOnSkeleton, setNewPopUpOnSkeleton] = useState<boolean>(false);
    const severity = ['info', 'success', 'warning', 'critical', 'error'];
    const [newSeverity, setNewSeverity] = useState<typeof severity[number]>('info');
    const severityAddMessageFn: Record<typeof severity[number], any> = {
        info: messageState.addInfo,
        success: messageState.addSuccess,
        warning: messageState.addWarning,
        critical: messageState.addCritical,
        error: messageState.addError,
    };
    const [selectedMsg, setSelectedMsg] = useState<Skeleton.Types.T_AppMessage | undefined>(undefined);
    const [sowCounts, setSowCounts] = useState<boolean>(false);
    const title = 'Play with Messages - useMessages';

    const addNewMessage = () => {
        if (newSeverity === 'error') {
            messageState.addError(newMsgTitel, newMsgMessage, new Error(newMsgMessage), newPopUpOnSkeleton);
        } else {
            severityAddMessageFn[newSeverity](newMsgTitel, newMsgMessage, newPopUpOnSkeleton);
        }
    };

    return (
        <>
            {isReset ? (
                <Box margin="small">
                    <Heading level={2}>{title}</Heading>
                    <Box margin={{ vertical: 'small' }}>
                        <Box direction="row" background="light-4" pad="small">
                            <Text>Counts</Text>
                            {!sowCounts ? (
                                <CaretRightFill onClick={() => setSowCounts(true)} />
                            ) : (
                                <CaretDownFill onClick={() => setSowCounts(false)} />
                            )}
                        </Box>
                        {sowCounts && (
                            <Box pad="small" background="accent-4">
                                <Text>Count of Messages: {messageState.getCount()}</Text>
                                <Text>Count of unreaded Messages: {messageState.getNewCount()}</Text>
                                <Text>Count of readed Messages: {messageState.getReadedCount()}</Text>
                                <Text>
                                    Count of with PopUp Messages:{' '}
                                    {messageState.get().filter((e) => e.popUpOnSkeleton).length}
                                </Text>
                                <Text>Count of Info Messages: {messageState.getInfo().length}</Text>
                                <Text>Count of Success Messages: {messageState.getSuccess().length}</Text>
                                <Text>Count of Warning Messages: {messageState.getWarning().length}</Text>
                                <Text>Count of Critical Messages: {messageState.getCritical().length}</Text>
                                <Text>Count of Error Messages: {messageState.getError().length}</Text>
                            </Box>
                        )}
                    </Box>

                    <Box pad="small" background="light-5">
                        <Box margin={{ vertical: 'small' }}>
                            <Text>
                                Selected Message:{' '}
                                {!(selectedMsg && messageState.isMessageAvailable(selectedMsg.time)) && 'none'}
                            </Text>
                        </Box>

                        {selectedMsg && messageState.isMessageAvailable(selectedMsg.time) && (
                            <Box direction="row" justify="stretch" wrap gap="small">
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Time:</Text>
                                    <Text weight="bold">{`${new Date(
                                        selectedMsg.time,
                                    ).toLocaleTimeString()} : ${new Date(
                                        selectedMsg.time,
                                    ).toLocaleDateString()}`}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Titel:</Text>
                                    <Text weight="bold">{selectedMsg.msgTitle}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Message:</Text>
                                    <Text weight="bold">{selectedMsg.msgMessage}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Severity:</Text>
                                    <Text weight="bold">{selectedMsg.severity}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>MSG-Error:</Text>
                                    <Text weight="bold">{selectedMsg.msgError?.message}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Is PopUp:</Text>
                                    <Text weight="bold">{selectedMsg.popUpOnSkeleton?.toString()}</Text>
                                </Box>
                                <Box
                                    background="light-1"
                                    direction="row"
                                    pad="xsmall"
                                    round="xsmall"
                                    gap="xsmall"
                                    margin={{ vertical: 'xxsmall' }}
                                >
                                    <Text>Is Unreaded:</Text>
                                    <Text weight="bold">{messageState.isMsgNew(selectedMsg.time)?.toString()}</Text>
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Box margin={{ vertical: 'small' }} border={true}>
                        <Header pad="small" background={'dark-1'}>
                            <Box direction="row">All messages: {messageState.getCount()}</Box>
                            <Box direction="row" gap="small">
                                <View onClick={() => messageState.setAllReaded()} />
                                <FormTrash onClick={() => messageState.deleteAllReaded()} />
                                <Trash onClick={() => messageState.deleteAll()} />
                            </Box>
                        </Header>
                        <Main pad="xsmall" height={{ min: '150px' }}>
                            {messageState.getCount() > 0 && (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell scope="col" border="bottom">
                                                Time
                                            </TableCell>
                                            <TableCell scope="col" border="bottom">
                                                Title
                                            </TableCell>
                                            <TableCell scope="col" border="bottom">
                                                Severity
                                            </TableCell>
                                            <TableCell scope="col" border="bottom">
                                                Unreaded/Readed
                                            </TableCell>
                                            <TableCell scope="col" border="bottom">
                                                PopUp
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {messageState.get().map((msg) => (
                                            <TableRow
                                                key={Skeleton.Helpers.getRandomString()}
                                                onClick={() => setSelectedMsg({ ...msg })}
                                            >
                                                <TableCell scope="row">
                                                    <Text color={colorMap[msg.severity]} size="small">{`${new Date(
                                                        msg.time,
                                                    ).toLocaleTimeString()} : ${new Date(
                                                        msg.time,
                                                    ).toLocaleDateString()}`}</Text>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <Text color={colorMap[msg.severity]} size="small">
                                                        {msg.msgTitle}
                                                    </Text>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <Text color={colorMap[msg.severity]} size="small">
                                                        {msg.severity}
                                                    </Text>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    {messageState.isMsgNew(msg.time) ? (
                                                        <View
                                                            size="small"
                                                            color={colorMap[msg.severity]}
                                                            onClick={() => messageState.setAsReaded(msg.time)}
                                                        />
                                                    ) : (
                                                        <Trash
                                                            size="small"
                                                            color={colorMap[msg.severity]}
                                                            onClick={() => messageState.deleteMsg(msg.time)}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <Text color={colorMap[msg.severity]} size="small">
                                                        {msg.popUpOnSkeleton?.toString()}
                                                    </Text>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </Main>
                    </Box>
                    <Box pad="xsmall" background="light-5">
                        <Box margin={{ vertical: 'small' }}>
                            <Text>Add new Message:</Text>
                        </Box>
                        <Box direction="row" justify="stretch" wrap gap="small">
                            <Box
                                background="light-1"
                                direction="row"
                                pad="xsmall"
                                round="xsmall"
                                gap="xsmall"
                                align="center"
                                margin={{ vertical: 'xxsmall' }}
                            >
                                <Text>Titel:</Text>
                                <TextInput
                                    value={newMsgTitel}
                                    onChange={(event) => setNewMsgTitle(event.target.value)}
                                />
                            </Box>
                            <Box
                                background="light-1"
                                direction="row"
                                pad="xsmall"
                                round="xsmall"
                                gap="xsmall"
                                align="center"
                                margin={{ vertical: 'xxsmall' }}
                            >
                                <Text>Message:</Text>
                                <TextInput
                                    value={newMsgMessage}
                                    onChange={(event) => setNewMsgMessage(event.target.value)}
                                />
                            </Box>
                            <Box
                                background="light-1"
                                direction="row"
                                pad="xsmall"
                                round="xsmall"
                                gap="xsmall"
                                align="center"
                                margin={{ vertical: 'xxsmall' }}
                            >
                                <Text>PopUp:</Text>
                                <CheckBox
                                    checked={newPopUpOnSkeleton}
                                    onChange={(event) => setNewPopUpOnSkeleton(event.target.checked)}
                                />
                            </Box>
                            <Box
                                background="light-1"
                                direction="row"
                                pad="xsmall"
                                round="xsmall"
                                gap="xsmall"
                                align="center"
                                margin={{ vertical: 'xxsmall' }}
                            >
                                <Text>Select Severity:</Text>
                                <Select
                                    size="small"
                                    options={severity}
                                    value={newSeverity}
                                    onChange={({ option }) => setNewSeverity(option)}
                                />
                            </Box>
                            <Box
                                background="light-1"
                                direction="row"
                                pad="xsmall"
                                round="xsmall"
                                gap="xsmall"
                                align="center"
                                margin={{ vertical: 'xxsmall' }}
                            >
                                <Button
                                    margin={{ vertical: 'xxsmall' }}
                                    color="dark-3"
                                    icon={<Add size="small" />}
                                    onClick={() => addNewMessage()}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Skeleton.Parts.SkeletonLoader />
            )}
        </>
    );
};

export const UseMessages = MessageTestTemplate.bind({});
UseMessages.args = {};
