import React, { FC, createElement } from 'react';
import { Box, Button, Header, Text } from 'grommet';
import { FormDown, FormUp, FormClose } from 'grommet-icons';

export type T_ContentFrameHeader_Props = {
    title: string;
    scope: string;
    id: string;
    titleIcon?: React.ComponentType<any>;
    isCollapsible: boolean;
    isCollapsed: boolean;
    isClosable: boolean;
    isShowBody: boolean;
    toggleCollapsed: (scope: string, id: string) => void;
    toggleClosed: (scope: string, id: string) => void;
};

const ContentFrameHeader: FC<T_ContentFrameHeader_Props> = ({
    title,
    scope,
    id,
    titleIcon,
    isCollapsible,
    isCollapsed,
    isClosable,
    isShowBody,
    toggleCollapsed,
    toggleClosed,
}: T_ContentFrameHeader_Props): JSX.Element => {
    return (
        <Header pad="small">
            <Box direction="row" gap="small">
                {titleIcon && createElement(titleIcon, { size: 'medium' })}
                <Text>{title}</Text>
            </Box>
            <Box direction="row" gap="xsmall">
                {isCollapsible && (
                    <Button
                        aria-label="collapsibleBTN"
                        disabled={!isShowBody}
                        icon={isCollapsed ? <FormDown /> : <FormUp />}
                        onClick={() => toggleCollapsed(scope, id)}
                        plain
                    />
                )}
                {isClosable && (
                    <Button
                        aria-label="closableBTN"
                        disabled={!isShowBody}
                        icon={<FormClose />}
                        onClick={() => toggleClosed(scope, id)}
                        plain
                    />
                )}
            </Box>
        </Header>
    );
};

export default ContentFrameHeader;
