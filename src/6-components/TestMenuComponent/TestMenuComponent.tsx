import React, { FC, useEffect } from 'react';
import { Box, Button } from 'grommet';
import { Test, Compare } from 'grommet-icons';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';
import { useMessages } from '../../10-addons/states/messageStates';
import { useAppStructure, useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import ContentFrame from '../../3-molecules/ContentFrameComponent/ContentFrame';

const TestMenuComponent: FC<any> = () => {
    const selectedCompState = useSelectedComponent();
    const asState = useAppStructure();
    const messageState = useMessages();
    const scope = 'scope';
    const sfcState = useComponentFrameState();
    const id1 = 'id1';
    const id2 = 'id2';
    const id3 = 'id3';

    useEffect(() => {
        sfcState.setTitle(scope, id1, `Menu Tests`);
        sfcState.setTitle(scope, id2, `Toast Tests`);
        sfcState.setTitle(scope, id3, `IFrame Tests`);
    }, []);

    const NewSC: T_AppComponentStructure = {
        menuName: 'New',
        Component: (): JSX.Element => <div>Ich bin eine neue Componente</div>,
        parameters: {},
        default: false,
        menuIcon: Compare,
    };

    const selectComponent = (t: string) => {
        selectedCompState.setSelectedComponent(t);
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
            embeddedLink:
                '/iframe.html?appVariant=embedded&id=external-app-skeleton--standard&globals=backgrounds.grid:false&viewMode=story',
        });
        selectedCompState.setSelectedComponent('iFrameTest');
    };

    return (
        <Box gap="small">
            <ContentFrame id={id1} scope={scope}>
                <Box direction="row" gap="small" wrap>
                    <Button size="small" label="Add Menu" onClick={() => addMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button size="small" label="Delete Menu" onClick={() => delMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button
                        size="small"
                        label="Select - Info Component"
                        onClick={() => selectComponent('AppInfo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Select - Not Available Component"
                        onClick={() => selectComponent('halloVelo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                </Box>
            </ContentFrame>
            <ContentFrame id={id2} scope={scope}>
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
            </ContentFrame>
            <ContentFrame id={id3} scope={scope}>
                <Button
                    size="small"
                    label="Open IFrame Comp"
                    onClick={() => setIFrameTest()}
                    margin={{ bottom: 'xsmall' }}
                />
            </ContentFrame>
        </Box>
    );
};

export const TestMenuComponentStructure: T_AppComponentStructure = {
    menuName: 'MenuTest',
    Component: TestMenuComponent,
    parameters: {},
    menuIcon: Test,
};
