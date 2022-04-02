import React, { FC, useEffect } from 'react';
import { Box, Button, CheckBox, Text } from 'grommet';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import ContentFrame from '../../3-molecules/ContentFrameComponent/ContentFrame';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';
import { Add, Organization } from 'grommet-icons';
import getRandomString from '../../10-addons/helper/getRandomKey';

interface I_TestComponent_Props {
    name: string;
    subFrames: number;
}

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

const TestComponent: FC<any> = ({ name, subFrames }: I_TestComponent_Props) => {
    const sfcState = useComponentFrameState();
    const scope = name;

    useEffect(() => {
        for (let i = 0; i < subFrames; i++) {
            sfcState.setTitle(scope, i.toString(), `${name}${i.toString()}`);
        }
    }, []);

    return (
        <Box>
            {name === 'Hallo' && (
                <Box direction="column" gap="xsmall" flex="grow">
                    <Box>
                        <Box direction="row" gap="xsmall" flex="grow">
                            <CheckBox
                                label="All Collapsable"
                                onChange={(event) => sfcState.setScopeCollapsible(scope, event.target.checked)}
                            />
                            <TestButton onClick={() => sfcState.setScopeCollapsed(scope, true)} label="Collapse all" />
                            <TestButton onClick={() => sfcState.setScopeCollapsed(scope, false)} label="Expand all" />
                        </Box>
                    </Box>
                    <Box direction="row" gap="xsmall" flex="grow">
                        <CheckBox
                            label="All Closable"
                            onChange={(event) => sfcState.setScopeClosable(scope, event.target.checked)}
                        />
                        <TestButton label="Close all" onClick={() => sfcState.setScopeClosed(scope, true)} />
                        <TestButton label="Open all" onClick={() => sfcState.setScopeClosed(scope, false)} />
                    </Box>
                    <Box direction="row" gap="xsmall">
                        <CheckBox
                            label="Hide All Bodies"
                            onChange={(event) => sfcState.setScopeShowBody(scope, !event.target.checked)}
                        />
                    </Box>
                    <Box direction="row" gap="xsmall" flex="grow">
                        <TestButton
                            label="Only Show Hallo0"
                            onClick={() => {
                                sfcState.setClosed(scope, '0', false);
                                sfcState.setClosed(scope, '1', true);
                            }}
                        />
                        <TestButton
                            label="Only Show Hallo1"
                            onClick={() => {
                                sfcState.setClosed(scope, '0', true);
                                sfcState.setClosed(scope, '1', false);
                            }}
                        />
                    </Box>
                </Box>
            )}
            {Array.from(Array(subFrames).keys()).map((e) => (
                <ContentFrame key={getRandomString()} id={e.toString()} scope={scope}>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                </ContentFrame>
            ))}
        </Box>
    );
};

export const Test1Structure: T_AppComponentStructure = {
    menuName: 'Test1',
    Component: TestComponent,
    parameters: { name: 'Hallo', subFrames: 2 },
    mainMenu: false,
    moreMenu: true,
    default: false,
    menuIcon: Add,
};

export const Test2Structure: T_AppComponentStructure = {
    menuName: 'Test2',
    Component: TestComponent,
    parameters: { name: 'hallo2', subFrames: 20 },
    mainMenu: false,
    moreMenu: true,
    default: false,
    menuIcon: Organization,
};
