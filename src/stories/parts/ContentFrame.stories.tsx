import React, { FC, useEffect } from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton } from '../..';
import { Home, System } from 'grommet-icons';
import { Test } from '../../Test';
import { Box, Button, CheckBox, Table, TableBody, TableCell, TableRow, Text } from 'grommet';

export default {
    title: 'External/Doc/Skeleton/Parts/ContentFrame',
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
                component: 'usage of part:ContentFrame',
            },
        },
        layout: 'fullscreen',
    },
};

const TestButton: FC<any> = ({ onClick, label }: any) => {
    return (
        <Button plain onClick={onClick}>
            <Box
                round="small"
                pad={{ vertical: 'none', horizontal: 'small' }}
                background={{ color: 'brand', opacity: true }}
                elevation="xsmall"
            >
                <Text size="small">{label}</Text>
            </Box>
        </Button>
    );
};

const TestTableContent: FC<any> = ({ scope, id, title }: any) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell align="right" plain scope="row" size="xsmall" pad="none" margin="none">
                        <Text size="small">Scope:</Text>
                    </TableCell>
                    <TableCell plain pad={{ vertical: 'none', horizontal: 'xsmall' }} margin="none">
                        <Text size="small">{scope}</Text>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" plain pad="none" margin="none">
                        <Text size="small">ID:</Text>
                    </TableCell>
                    <TableCell pad={{ vertical: 'none', horizontal: 'xsmall' }} margin="none">
                        <Text size="small">{id}</Text>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" plain pad="none" margin="none">
                        <Text size="small">Title:</Text>
                    </TableCell>
                    <TableCell plain pad={{ vertical: 'none', horizontal: 'xsmall' }} margin="none">
                        <Text size="small">{title}</Text>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const SetTitleTemplate: any = () => {
    const isReset = Test.Hooks.useResetAll();
    const titleState = Skeleton.Hooks.useAppTitle();
    const appStructureState = Skeleton.Hooks.useAppStructure();
    const componentFrameState = Skeleton.Hooks.useComponentFrameState();

    const title = 'ContentFrame';

    const HomePageComponent: FC<any> = () => {
        const scope = 'Scope';
        const id1 = '0';
        const id2 = '1';
        const title1 = 'ContentFrame1';
        const title2 = 'ContentFrame2';

        useEffect(() => {
            componentFrameState.setTitle(scope, id1, title1);
            componentFrameState.setTitleIcon(scope, id1, Home);
            componentFrameState.setTitle(scope, id2, title2);
            componentFrameState.setTitle('scopeControlls', 'controlls', 'Controlls');
            componentFrameState.setTitleIcon('scopeControlls', 'controlls', System);
            // componentFrameState.setFrameColor('scopeControlls', 'controlls', 'status-critical');
            componentFrameState.setFrameColor('scopeControlls', 'controlls', 'dark-1');
            componentFrameState.setHeaderBackgroundColor('scopeControlls', 'controlls', 'accent-4');
            componentFrameState.setContentBackgroundColor('scopeControlls', 'controlls', {
                dark: 'light-6',
                light: 'dark-6',
            });
            componentFrameState.setBoxProps('scopeControlls', 'controlls', {
                round: 'none',
                pad: { horizontal: 'small' },
            });
            componentFrameState.setScopeBoxProps(scope, {
                margin: { top: 'small' },
            });
        }, []);
        return (
            <Box>
                <Skeleton.Parts.ContentFrame id={'controlls'} scope={'scopeControlls'}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row">
                                    <CheckBox
                                        label="All Collapsable"
                                        onChange={(event) =>
                                            componentFrameState.setScopeCollapsible(scope, event.target.checked)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <TestButton
                                        onClick={() => componentFrameState.setScopeCollapsed(scope, true)}
                                        label="Collapse all"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TestButton
                                        onClick={() => componentFrameState.setScopeCollapsed(scope, false)}
                                        label="Expand all"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <CheckBox
                                        label="All Closable"
                                        onChange={(event) =>
                                            componentFrameState.setScopeClosable(scope, event.target.checked)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <TestButton
                                        label="Close all"
                                        onClick={() => componentFrameState.setScopeClosed(scope, true)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TestButton
                                        label="Open all"
                                        onClick={() => componentFrameState.setScopeClosed(scope, false)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <CheckBox
                                        label="Hide All Bodies"
                                        onChange={(event) =>
                                            componentFrameState.setScopeShowBody(scope, !event.target.checked)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell />
                                <TableCell>
                                    <TestButton
                                        label="Only Show ContentFrame1"
                                        onClick={() => {
                                            componentFrameState.setClosed(scope, id1, false);
                                            componentFrameState.setClosed(scope, id2, true);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TestButton
                                        label="Only Show ContentFrame2"
                                        onClick={() => {
                                            componentFrameState.setClosed(scope, id1, true);
                                            componentFrameState.setClosed(scope, id2, false);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Skeleton.Parts.ContentFrame>
                <Skeleton.Parts.ContentFrame id={id1} scope={scope}>
                    <TestTableContent scope={scope} id={id1} title={componentFrameState.getTitle(scope, id1)} />
                </Skeleton.Parts.ContentFrame>
                <Skeleton.Parts.ContentFrame id={id2} scope={scope}>
                    <TestTableContent scope={scope} id={id2} title={componentFrameState.getTitle(scope, id1)} />
                </Skeleton.Parts.ContentFrame>
            </Box>
        );
    };

    const AppStructure: Skeleton.Types.T_AppStructure = {
        HomePage: {
            menuName: 'HomePage',
            default: true,
            menuIcon: Home,
            Component: HomePageComponent,
        },
    };

    useEffect(() => {
        appStructureState.set(AppStructure);
        titleState.setTitle(title);
    }, []);

    return <>{isReset ? <Skeleton.App /> : <Skeleton.Parts.SkeletonLoader />}</>;
};

export const useComponentFrame = SetTitleTemplate.bind({});
