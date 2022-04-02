import React, { FC } from 'react';
import { Box, BoxExtendedProps, Main } from 'grommet';
import SkeletonDivider from '../../1-atoms/SkeletonDivider/SkeletonDivider';
import ContentFrameHeader from '../../1-atoms/ContentFrameHeader/ContentFrameHeader';
import { BackgroundType, ColorType } from 'grommet/utils';
import { T_AppAdditionalActions } from '../../10-addons/types/frameworkTypes';

export type T_ContentFrameView_Props = {
    title: string;
    scope: string;
    id: string;
    children: React.ReactNode;
    titleIcon?: React.ComponentType<any>;
    isCollapsible: boolean;
    isCollapsed: boolean;
    isClosable: boolean;
    isClosed: boolean;
    isShowBody: boolean;
    toggleCollapsed: (scope: string, id: string) => void;
    toggleClosed: (scope: string, id: string) => void;
    frameColor: ColorType;
    headerBackgroundColor: BackgroundType;
    contentBackgroundColor: BackgroundType;
    boxProps: BoxExtendedProps;
    additionalActions: T_AppAdditionalActions;
};

const ContentFrameView: FC<T_ContentFrameView_Props> = ({
    title,
    scope,
    id,
    children,
    titleIcon,
    isCollapsible,
    isCollapsed,
    isClosable,
    isClosed,
    isShowBody,
    toggleCollapsed,
    toggleClosed,
    frameColor,
    headerBackgroundColor,
    contentBackgroundColor,
    boxProps,
    additionalActions,
}: T_ContentFrameView_Props): JSX.Element => {
    const { pad = 'none', margin = 'none', flex = false, height = undefined, ...otherProps } = boxProps;
    return (
        <Box
            border={!isClosed && [{ color: frameColor, size: 'small' }]}
            flex={!isClosed && !isCollapsed && isShowBody ? flex : false}
            margin={!isClosed ? margin : 'none'}
            pad={!isClosed ? pad : 'none'}
            overflow="hidden"
            round="small"
            height={!isClosed ? height : '0'}
            {...otherProps}
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
                    background={headerBackgroundColor}
                    additionalActions={additionalActions}
                />
            )}
            {!isClosed && !isCollapsed && isShowBody && <SkeletonDivider color={frameColor} skeleton={false} />}
            {!isClosed && !isCollapsed && isShowBody && (
                <Main pad="small" flex={flex} background={contentBackgroundColor}>
                    {children}
                </Main>
            )}
        </Box>
    );
};

export default ContentFrameView;
