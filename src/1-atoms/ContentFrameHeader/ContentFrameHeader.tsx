import React, { FC, createElement } from 'react';
import { Box, Button, Header, Text } from 'grommet';
import { FormDown, FormUp, FormClose } from 'grommet-icons';
import { BackgroundType } from 'grommet/utils';
import { T_AppAdditionalActions } from '../../10-addons/types/frameworkTypes';
import getRandomString from '../../10-addons/helper/getRandomKey';

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
    background?: BackgroundType;
    additionalActions: T_AppAdditionalActions;
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
    background,
    additionalActions,
}: T_ContentFrameHeader_Props): JSX.Element => {
    return (
        <Button onClick={isCollapsible ? () => toggleCollapsed(scope, id) : undefined} plain>
            <Header pad="small" background={background}>
                <Box direction="row" gap="small">
                    {titleIcon && createElement(titleIcon, { size: 'medium' })}
                    <Text>{title}</Text>
                </Box>
                <Box direction="row" gap="xsmall">
                    {additionalActions.map((e) => (
                        <Button key={getRandomString()} icon={<e.Icon />} plain onClick={() => e.onClick()} />
                    ))}
                    {isCollapsible && (
                        <Button
                            aria-label="collapsibleBTN"
                            disabled={!isShowBody}
                            icon={isCollapsed ? <FormDown /> : <FormUp />}
                            plain
                        />
                    )}
                    {isClosable && (
                        <Button
                            aria-label="closableBTN"
                            icon={<FormClose />}
                            onClick={() => toggleClosed(scope, id)}
                            plain
                        />
                    )}
                </Box>
            </Header>
        </Button>
    );
};

export default ContentFrameHeader;
