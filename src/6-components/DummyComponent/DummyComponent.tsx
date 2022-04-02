import React, { FC } from 'react';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';

const DummyComponent: FC<any> = () => {
    return <div>No default set</div>;
};

export const DummyComponentStructure: T_AppComponentStructure = {
    menuName: 'No Default set or Component not configured',
    Component: DummyComponent,
};
