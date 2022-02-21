import React from 'react';
import { Box, Spinner, Text } from 'grommet';

/**
 * This is a simple Skeleton Loader without any Parameters
 * @returns Loader Component
 */
export const SkeletonLoader = (): JSX.Element => {
    return (
        <Box align="center" justify="center" direction="row" flex={true} gap="medium">
            <Spinner border={[{ side: 'horizontal', color: 'brand', size: 'medium' }]} size="xlarge" />
            <Text>Loading...</Text>
        </Box>
    );
};
