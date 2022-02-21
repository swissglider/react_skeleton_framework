import React, { createElement, FC } from 'react';
import { Box, Text } from 'grommet';
import { Share } from 'grommet-icons';

export type T_MoreMenuEntry_Props = {
    appComonentKey: string;
    onClick: (appComonentKey: string) => void;
    menuIcon?: React.ComponentType<any>;
    menuName: string;
};

const MoreMenuEntry: FC<T_MoreMenuEntry_Props> = ({
    appComonentKey,
    onClick,
    menuIcon,
    menuName,
}: T_MoreMenuEntry_Props): JSX.Element => {
    return (
        <Box
            pad="large"
            align="center"
            background={{ color: 'light-2', opacity: 'strong' }}
            round
            gap="small"
            onClick={() => onClick(appComonentKey)}
            aria-label="moreMenuIcon"
        >
            {menuIcon !== undefined ? (
                createElement(menuIcon, {
                    size: 'medium',
                })
            ) : (
                <Share size="medium" />
            )}
            <Text>{menuName}</Text>
        </Box>
    );
};

export default MoreMenuEntry;
