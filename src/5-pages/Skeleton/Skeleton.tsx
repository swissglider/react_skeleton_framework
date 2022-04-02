import React, { useEffect } from 'react';
import { Box, Grommet, ResponsiveContext, Heading, ThemeType } from 'grommet';
import { useVariantState, useAppType } from '../../10-addons/states/frameworkStates';
import SkeletonDivider from '../../1-atoms/SkeletonDivider/SkeletonDivider';
import SkeletonHeader from '../../3-molecules/SkeletonHeader/SkeletonHeader';
import MainMenu from '../../3-molecules/Menu/Menu';
import SkeletonMain from '../../3-molecules/MainPart/MainPart';
import { T_Size } from '../../10-addons/types/frameworkTypes';
import { MessageBox } from '../../3-molecules/SkeletonMessageBox/SkeletonMessageBox';
import { useMessages } from '../../10-addons/states/messageStates';
import { useSizeState } from '../../10-addons/states/windowStates';
import SkeletonEmbeddedTitle from '../../3-molecules/EmbeddedTitle/EmbeddedTitle';
import { useGrommetTheme } from '../../10-addons/states/grommetThemeState';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';
import { useMessageHandling } from '../../10-addons/hooks/useMessageHandling';

interface I_SkeletonStack_Props {
    size: T_Size;
}

const SkeletonStack = ({ size }: I_SkeletonStack_Props): JSX.Element => {
    const sizeState = useSizeState();
    const variantState = useVariantState();
    const messageState = useMessages();
    const appType = useAppType();
    const newMessageToShow = useMessageHandling();
    const { totalHeight } = useWindowSize();

    useEffect(() => {
        sizeState.set(size);
    }, [size]);

    useEffect(() => {
        window.name = 'skeleton';
        if (window.location !== window.parent.location && window.parent.name === 'skeleton') {
            variantState.set('embedded');
        } else {
            variantState.set('full');
        }
    }, []);

    if (variantState.get() === 'full') {
        return (
            <Box height={`${totalHeight - 10}px`}>
                <Box
                    margin="small"
                    border={{ color: 'dark-3', size: 'small' }}
                    round="medium"
                    flex={true}
                    background="dark-1"
                >
                    {/* header */}
                    <SkeletonHeader />
                    <SkeletonDivider skeleton={true} />
                    {appType.isTest() === true && (
                        <Box background="status-critical" align="center">
                            <Heading level="3" margin="xsmall">
                                TestApp !!!
                            </Heading>
                        </Box>
                    )}

                    {/* Main */}
                    <SkeletonMain />
                    <SkeletonDivider skeleton={true} />

                    {newMessageToShow &&
                        messageState.getLastNew() &&
                        messageState.getLastNew().new &&
                        messageState.getLastNew().popUpOnSkeleton && <MessageBox msg={messageState.getLastNew()} />}

                    {/* Footer*/}
                    <MainMenu mainMenu={true} />
                </Box>
            </Box>
        );
    }

    if (variantState.get() === 'embedded') {
        return (
            <Box height="100%" background="dark-1">
                <Box flex={true}>
                    {/* subTitle - only used if embedded */}

                    <SkeletonEmbeddedTitle />
                    <SkeletonDivider skeleton={true} />

                    {/* Main */}
                    <SkeletonMain />
                </Box>
            </Box>
        );
    }
    return <div>TpyeError</div>;
};

export const Skeleton = (): JSX.Element => {
    const appType = useAppType();
    const grommetTheme = useGrommetTheme();
    return (
        <Grommet
            theme={grommetTheme.getGrommetTheme() as ThemeType}
            background={appType.isTest() === true ? 'status-critical' : 'dark-1'}
            full={true}
        >
            <ResponsiveContext.Consumer>
                {(size) => (!size ? <div>No Size ??</div> : <SkeletonStack size={size} />)}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};
