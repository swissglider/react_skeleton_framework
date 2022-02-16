import React, { FC } from 'react';
import { Box, Button } from 'grommet';
import { Test, Compare } from 'grommet-icons';
import { T_AppComponentStructure } from '../types/frameworkTypes';
import { ContentFrameSimple } from '../molecules/contentFrameSimple';
import { useMessages } from '../states/messageStates';
import { useAppStructure, useSelectedComponent } from '../states/appStructureStates';

const MenuTestComponent: FC<any> = () => {
    const selectedCompState = useSelectedComponent();
    const asState = useAppStructure();
    const messageState = useMessages();

    const NewSC: T_AppComponentStructure = {
        menuName: 'New',
        component: (): JSX.Element => <div>Ich bin eine neue Componente</div>,
        parameters: {},
        default: false,
        menuIcon: Compare,
    };

    const setDefault = (t: string) => {
        selectedCompState.set(t);
    };

    const addMenu = () => {
        asState.addNewMenu('New', NewSC);
    };

    const delMenu = () => {
        asState.deleteMenu('New');
    };

    const setIFrameTest = () => {
        asState.addNewMenu('iFrameTest', {
            menuName: 'iFrameTest',
            default: false,
            moreMenu: false,
            mainMenu: false,
            isEmbedded: true,
            embeddedLink: '/?appVariant=embedded',
        });
        selectedCompState.set('iFrameTest');
    };

    return (
        <Box gap="small">
            <ContentFrameSimple title="Menu Tests">
                <Box direction="row" gap="small" wrap>
                    <Button size="small" label="Add Menu" onClick={() => addMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button size="small" label="Delete Menu" onClick={() => delMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button
                        size="small"
                        label="Set Default - Info"
                        onClick={() => setDefault('AppInfo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Set Default Wrong"
                        onClick={() => setDefault('halloVelo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                </Box>
            </ContentFrameSimple>
            <ContentFrameSimple title="Toast Tests">
                <Box direction="row" gap="small" wrap>
                    <Button
                        size="small"
                        label="Add Info"
                        onClick={() => messageState.addInfo('Info Title', 'Info Message')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Add Critical"
                        onClick={() => messageState.addCritical('Info Critical', 'This is an Crtical Info')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Add Critical To Popup"
                        onClick={() =>
                            messageState.addCritical(
                                'Info Critical with PopUp',
                                'This is an Crtical Info with PopUp',
                                true,
                            )
                        }
                        margin={{ bottom: 'xsmall' }}
                    />
                </Box>
            </ContentFrameSimple>
            <ContentFrameSimple title="IFrame Tests">
                <Button
                    size="small"
                    label="Open IFrame Comp"
                    onClick={() => setIFrameTest()}
                    margin={{ bottom: 'xsmall' }}
                />
            </ContentFrameSimple>
        </Box>
    );
};

export const MenuTestComponentStructure: T_AppComponentStructure = {
    menuName: 'MenuTest',
    component: MenuTestComponent,
    parameters: {},
    default: true,
    menuIcon: Test,
};
