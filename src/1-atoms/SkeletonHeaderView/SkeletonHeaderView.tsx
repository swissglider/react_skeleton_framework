import React, { FC } from 'react';
import { Box, Button, Header, Heading } from 'grommet';
import { Notification, Next, Previous } from 'grommet-icons';

export type T_SkeletonHeaderView_Props = {
    title: string;
    back: () => void;
    forward: () => void;
    showMsg: () => void;
    msgCount?: number;
};

const SkeletonHeaderView: FC<T_SkeletonHeaderView_Props> = ({
    title,
    back,
    forward,
    showMsg,
    msgCount = 0,
}: T_SkeletonHeaderView_Props): JSX.Element => {
    return (
        <Header height="xxsmall" pad="xsmall" margin={{ horizontal: 'small' }}>
            <Heading id="skeleton_title" level="3" margin="none">
                {title}
            </Heading>
            <Box direction="row">
                <Button aria-label="back" plain size="small" icon={<Previous />} onClick={() => back()} />
                <Button aria-label="forward" plain size="small" icon={<Next />} onClick={() => forward()} />
                <Button
                    aria-label="showMsg"
                    size="small"
                    icon={<Notification color="accent-1" />}
                    onClick={() => showMsg()}
                    badge={
                        msgCount > 0
                            ? {
                                  background: 'accent-1',
                                  value: msgCount,
                                  max: 9,
                              }
                            : 0
                    }
                />
            </Box>
        </Header>
    );
};

export default SkeletonHeaderView;
