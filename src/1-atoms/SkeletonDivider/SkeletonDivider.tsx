import React from 'react';
import { Box } from 'grommet';
import { ColorType } from 'grommet/utils';

export interface I_SkeletonDivider_Props {
    skeleton: boolean;
    color?: ColorType;
}

const SkeletonDivider = ({ skeleton, color }: I_SkeletonDivider_Props): JSX.Element => {
    return <Box border={[{ color: color ? color : skeleton ? 'dark-3' : 'brand', size: 'small', side: 'bottom' }]} />;
};

export default SkeletonDivider;
