import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import { Icon } from 'grommet-icons';

export interface I_SkeletonMenuPartView_Props {
    menuPartName: string;
    menuPartClicked: () => void;
    MenuPartIcon?: Icon;
    isMobile?: boolean;
    isLandscape?: boolean;
    isMainMenu?: boolean;
    size?: string;
    isSelected?: boolean;
}

const SkeletonMenuPartView: FC<I_SkeletonMenuPartView_Props> = ({
    menuPartName,
    menuPartClicked,
    MenuPartIcon,
    isMobile = true,
    isLandscape = false,
    isMainMenu = true,
    size = 'small',
    isSelected = false,
}: I_SkeletonMenuPartView_Props) => {
    return (
        <Box
            role="button"
            aria-label={`MenuPartBoxBtn_${menuPartName}`}
            border={
                isSelected
                    ? [{ side: 'bottom', color: 'accent-1', size: 'xsmall' }]
                    : [{ side: 'bottom', size: 'xsmall' }]
            }
            direction="column"
            align="center"
            alignSelf="end"
            onClick={() => menuPartClicked()}
            focusIndicator={false}
        >
            {MenuPartIcon && (
                <MenuPartIcon
                    size={isMainMenu ? (isLandscape && isMobile ? 'medium' : 'large') : 'medium'}
                    color={isSelected ? 'accent-1' : ''}
                />
            )}
            <Text
                size={isMainMenu ? (size === 'small' ? 'xsmall' : 'small') : 'xsmall'}
                color={isSelected ? 'accent-1' : ''}
                alignSelf="center"
            >
                {menuPartName}
            </Text>
        </Box>
    );
};

export default SkeletonMenuPartView;
