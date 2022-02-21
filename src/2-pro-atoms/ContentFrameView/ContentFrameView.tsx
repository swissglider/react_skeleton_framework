import React, { FC } from 'react';
import { Box, Main } from 'grommet';
import SkeletonDivider from '../../1-atoms/SkeletonDivider/SkeletonDivider';
import ContentFrameHeader from '../../1-atoms/ContentFrameHeader/ContentFrameHeader';

export type T_ContentFrameView_Props = {
    title: string;
    scope: string;
    id: string;
    children: React.ReactNode;
    pad?: any;
    margin?: any;
    flex?: boolean;
    height?: any;
    titleIcon?: React.ComponentType<any>;
    isCollapsible: boolean;
    isCollapsed: boolean;
    isClosable: boolean;
    isClosed: boolean;
    isShowBody: boolean;
    toggleCollapsed: (scope: string, id: string) => void;
    toggleClosed: (scope: string, id: string) => void;
};

const ContentFrameView: FC<T_ContentFrameView_Props> = ({
    title,
    scope,
    id,
    children,
    pad = 'none',
    margin = 'none',
    flex = false,
    titleIcon,
    isCollapsible,
    isCollapsed,
    isClosable,
    isClosed,
    isShowBody,
    toggleCollapsed,
    toggleClosed,
}: T_ContentFrameView_Props): JSX.Element => {
    return (
        <Box
            border={!isClosed && [{ color: 'brand', size: 'small' }]}
            flex={!isClosed && !isCollapsed && isShowBody ? flex : false}
            round="small"
            margin={!isClosed && !isCollapsed && isShowBody ? margin : 'none'}
            pad={!isClosed && !isCollapsed && isShowBody ? pad : 'none'}
            // height={!isClosed ? height : 0}
        >
            {!isClosed && (
                <ContentFrameHeader
                    title={title}
                    scope={scope}
                    id={id}
                    titleIcon={titleIcon}
                    isCollapsible={isCollapsible}
                    isCollapsed={isCollapsed}
                    isClosable={isClosable}
                    isShowBody={isShowBody}
                    toggleCollapsed={(scope: string, id: string) => toggleCollapsed(scope, id)}
                    toggleClosed={(scope: string, id: string) => toggleClosed(scope, id)}
                />
            )}
            {!isClosed && !isCollapsed && isShowBody && <SkeletonDivider skeleton={false} />}
            {!isClosed && !isCollapsed && isShowBody && (
                <Main pad="small" flex={flex}>
                    {children}
                </Main>
            )}
        </Box>
    );
};

export default ContentFrameView;
