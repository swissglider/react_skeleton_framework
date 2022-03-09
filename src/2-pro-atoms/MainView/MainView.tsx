import React, { FC } from 'react';
import { Box, Main } from 'grommet';

export type T_MainView_Props = {
    isLandscape?: boolean;
    embedded?: boolean;
    Comp?: React.ReactElement<any>;
    IFramComp?: React.ReactElement<any>;
    MenuComp?: React.ReactElement<any>;
    NoComp?: React.ReactElement<any>;
};

const MainView: FC<T_MainView_Props> = ({
    isLandscape = false,
    embedded = false,
    Comp,
    IFramComp,
    MenuComp,
    NoComp,
}: T_MainView_Props): JSX.Element => {
    return IFramComp ? (
        IFramComp
    ) : (
        <Box flex={true} margin={{ vertical: 'xsmall' }} pad="none">
            <Main
                overflow={{ horizontal: 'hidden', vertical: 'auto' }}
                pad={{
                    horizontal: 'medium',
                    top: 'medium',
                    bottom: 'none',
                }}
                margin={{ vertical: 'none' }}
            >
                {/* subMenu - only used if embedded */}
                {!isLandscape && embedded && MenuComp}

                {Comp ? Comp : NoComp}
            </Main>
        </Box>
    );
};

export default MainView;
