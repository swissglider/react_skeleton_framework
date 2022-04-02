import React from 'react';
import { useAppTitle } from '../../10-addons/states/titleStates';
import { useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { useMessages } from '../../10-addons/states/messageStates';
import { useComponentHistory } from '../../10-addons/states/historyStates';
import SkeletonHeaderView from '../../1-atoms/SkeletonHeaderView/SkeletonHeaderView';

const SkeletonHeader = (): JSX.Element => {
    const titleState = useAppTitle();
    const selectedCompState = useSelectedComponent();
    const messageState = useMessages();
    const historyState = useComponentHistory();

    return (
        <SkeletonHeaderView
            title={titleState.getTitle()}
            back={() => historyState.back()}
            hasBack={() => historyState.hasBack()}
            forward={() => historyState.forward()}
            hasForward={() => historyState.hasForward()}
            showMsg={() => selectedCompState.setSelectedComponent('ShowMSG')}
            msgCount={messageState.getNewCount()}
        />
    );
};

export default SkeletonHeader;
