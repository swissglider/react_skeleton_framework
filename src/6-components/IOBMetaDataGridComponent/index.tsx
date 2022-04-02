import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { DetailBox } from './detailView';
import { MetaDataGrid } from './metaDataGrid';
import { DocumentStore, Menu } from 'grommet-icons';
import { useGridComponentDetail, useMetaDataGridComponent } from './componentStates';
import { SkeletonLoader } from '../../1-atoms/SkeletonLoader/SkeletonLoader';
import { useLoadJsonDataWithIOBSendTo } from '../../10-addons/hooks/useLoadJsonDataWithIOBSendTo';
import { useIOBLegacyAdapter } from '../../10-addons/states/iobAppStates';
import { useSizeState } from '../../10-addons/states/windowStates';
import { useComponentFrameState } from '../../3-molecules/ContentFrameComponent/componentStates';
import ContentFrame from '../../3-molecules/ContentFrameComponent/ContentFrame';

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
        frameState.setBoxProps(scope, frame1, { flex: true });
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
            <ContentFrame scope={scope} id={frame1}>
                <MetaDataGrid />
            </ContentFrame>
        </Box>
    );
};

export type T_IOBMetaDataGridComponent_Props = {
    testJsonData: any;
};

export const IOBMetaDataGridComponent: FC<T_IOBMetaDataGridComponent_Props> = ({
    testJsonData,
}: T_IOBMetaDataGridComponent_Props) => {
    const legacyAdapterState = useIOBLegacyAdapter();

    const [loadedData] = useLoadJsonDataWithIOBSendTo(
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
