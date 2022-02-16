import React from 'react';
import { Box, Button, Header, Heading } from 'grommet';
import { Notification, Next, Previous } from 'grommet-icons';
import { useTitleState } from '../states/titleStates';
import { useSelectedComponent } from '../states/appStructureStates';
import { useMessages } from '../states/messageStates';
import { useComponentHistory } from '../states/historyStates';

const SkeletonHeader = (): JSX.Element => {
    const titleState = useTitleState();
    const selectedCompState = useSelectedComponent();
    const messageState = useMessages();
    const historyState = useComponentHistory();

    return (
        <Header height="xxsmall" pad="xsmall" margin={{ horizontal: 'small' }}>
            <Heading level="3" margin="none">
                {titleState.get()}
            </Heading>
            <Box direction="row">
                <Button plain size="small" icon={<Previous />} onClick={() => historyState.back()} />
                <Button plain size="small" icon={<Next />} onClick={() => historyState.forward()} />
                <Button
                    size="small"
                    // label="Show Msg"
                    icon={<Notification color="accent-1" />}
                    onClick={() => selectedCompState.set('ShowMSG')}
                    badge={
                        messageState.getNewCount() > 0
                            ? {
                                  background: 'accent-1',
                                  value: messageState.getNewCount(),
                                  max: 9,
                              }
                            : 0
                    }
                />
            </Box>
        </Header>
    );
};

export default SkeletonHeader;
