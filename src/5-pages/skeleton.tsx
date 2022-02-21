import React, { useEffect } from 'react';
import { Box, grommet, Grommet, ResponsiveContext, Heading } from 'grommet';
import { useState } from '@hookstate/core';
import {
    S_totalHeightState,
    S_totalWidthState,
    S_landscapeState,
    S_isMobileState,
    useVariantState,
} from '../10-addons/states/frameworkStates';
import SkeletonDivider from '../1-atoms/SkeletonDivider/SkeletonDivider';
import SkeletonHeader from '../3-molecules/SkeletonHeader/SkeletonHeader';
import SkeletonMenu from '../3-molecules/skeletonMenu';
import SkeletonMain from '../3-molecules/skeletonMain';
import SkeletonEmbeddedTitle from '../3-molecules/skeletonEmbeddedTitle';
import { T_Size } from '../10-addons/types/frameworkTypes';
import { isMobile } from 'react-device-detect';
import { MessageBox } from '../3-molecules/SkeletonMessageBox/SkeletonMessageBox';
import { useIOBAppTest } from '../10-addons/states/iobAppStates';
import { useMessages } from '../10-addons/states/messageStates';
import { useSizeState } from '../10-addons/states/windowStates';

interface I_SkeletonStack_Props {
    size: T_Size;
}

const SkeletonStack = ({ size }: I_SkeletonStack_Props): JSX.Element => {
    const totalWidthState = useState(S_totalWidthState);
    const totalHeightState = useState(S_totalHeightState);
    const landscapeState = useState(S_landscapeState);
    const sizeState = useSizeState();
    const isMobileState = useState(S_isMobileState);
    const variantState = useVariantState();
    const [open, setOpen] = React.useState<boolean>(false);
    const messageState = useMessages();
    const iobTestState = useIOBAppTest();

    useEffect(() => {
        const handleResize = () => {
            const totalWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) ?? 0;
            const totalHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) ?? 0;

            totalWidthState.set(totalWidth);
            totalHeightState.set(totalHeight);
            landscapeState.set(totalWidth - totalHeight > 0);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        sizeState.set(size);
    }, [size]);

    useEffect(() => {
        isMobileState.set(isMobile);
    }, [isMobile]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const appVariant = urlParams.get('appVariant');
        if (appVariant && appVariant === 'embedded') {
            variantState.set('embedded');
        } else {
            variantState.set('full');
        }
    }, []);

    useEffect(() => {
        if (
            messageState.getLast() &&
            messageState.getLast().popUpOnSkeleton &&
            messageState.getLast().popUpOnSkeleton === true &&
            messageState.getLast().new === true
        ) {
            setOpen(true);
        }
    }, [messageState]);

    if (variantState.get() === 'full') {
        return (
            <Box height={`${totalHeightState.get() - 10}px`}>
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
                    {iobTestState.get() === true && (
                        <Box background="status-critical" align="center">
                            <Heading level="3" margin="xsmall">
                                TestApp !!!
                            </Heading>
                        </Box>
                    )}

                    {/* Main */}
                    <SkeletonMain />
                    <SkeletonDivider skeleton={true} />

                    {open && messageState.getLast().new && messageState.getLast().popUpOnSkeleton && (
                        <MessageBox msg={messageState.getLast()} />
                    )}

                    {/* Footer*/}
                    <SkeletonMenu mainMenu={true} />
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
    const iobTestState = useIOBAppTest();
    return (
        <Grommet theme={grommet} background={iobTestState.get() === true ? 'status-critical' : 'dark-1'} full={true}>
            <ResponsiveContext.Consumer>
                {(size) => (!size ? <div>No Size ??</div> : <SkeletonStack size={size} />)}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};
