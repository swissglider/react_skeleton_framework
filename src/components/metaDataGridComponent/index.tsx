import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { DetailBox } from './detailView';
import { MetaDataGrid } from './metaDataGrid';
import { DocumentStore, Menu } from 'grommet-icons';
import { useGridComponentDetail, useMetaDataGridComponent } from './componentStates';
import { SkeletonLoader } from '../../1-atoms/SkeletonLoader/SkeletonLoader';
import { useLoadJsonDataWithSendTo } from '../../10-addons/hooks/useLoadJsonDataWithSendTo';
import { useComponentFrameState, ContentFrame } from '../../3-molecules/ContentFrameComponent';
import { useIOBLegacyAdapter } from '../../10-addons/states/iobAppStates';
import { useSizeState } from '../../10-addons/states/windowStates';

const MetaDataGridComponentOrg: FC<any> = () => {
    const sizeState = useSizeState();
    const frameState = useComponentFrameState();
    const scope = 'metaDataBrowser';
    const frame1 = 'metaDataBrowserF1';
    const frame2 = 'metaDataBrowserF2';
    const details = useGridComponentDetail();

    useEffect(() => {
        frameState.setTitle(scope, frame1, 'Meta Data Browser');
        frameState.setTitle(scope, frame2, 'Details');
        frameState.setTitleIcon(scope, frame1, DocumentStore);
        frameState.setTitleIcon(scope, frame2, Menu);
        frameState.setClosed(scope, frame2, true);
    }, []);

    useEffect(() => {
        // if (details.get().displayName && sizeState.get() === 'small') {
        if (details.get().displayName) {
            frameState.setClosed(scope, frame2, false);
            frameState.setClosable(scope, frame2, true);
            frameState.setCollapsible(scope, frame2, true);
            frameState.setTitle(scope, frame2, `${details.get().displayName}`);
        }
    }, [details.get()]);
    return (
        <Box gap="small" direction={sizeState.get() === 'large' ? 'row-reverse' : 'column'} flex={true}>
            <ContentFrame scope={scope} id={frame2}>
                <DetailBox />
            </ContentFrame>
            <ContentFrame scope={scope} id={frame1} flex={true}>
                <MetaDataGrid />
            </ContentFrame>
        </Box>
    );
};

export type T_MetaDataGridComponent_Props = {
    testJsonData: any;
};

export const MetaDataGridComponent: FC<T_MetaDataGridComponent_Props> = ({
    testJsonData,
}: T_MetaDataGridComponent_Props) => {
    const legacyAdapterState = useIOBLegacyAdapter();

    const [loadedData] = useLoadJsonDataWithSendTo(
        useMetaDataGridComponent,
        'getMetaData',
        {
            config: { instance: legacyAdapterState.instance.get(), country: '' },
        },
        10000,
        testJsonData.result,
    );

    return <>{loadedData.get() !== true ? <SkeletonLoader /> : <MetaDataGridComponentOrg />}</>;
};
