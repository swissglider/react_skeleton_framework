import React from 'react';
import { useTitleState } from '../../10-addons/states/titleStates';
import { useSelectedComponent } from '../../10-addons/states/appStructureStates';
import { useMessages } from '../../10-addons/states/messageStates';
import { useComponentHistory } from '../../10-addons/states/historyStates';
import SkeletonHeaderView from '../../1-atoms/SkeletonHeaderView/SkeletonHeaderView';

const SkeletonHeader = (): JSX.Element => {
    const titleState = useTitleState();
    const selectedCompState = useSelectedComponent();
    const messageState = useMessages();
    const historyState = useComponentHistory();

    return (
        <SkeletonHeaderView
            title={titleState.get()}
            back={() => historyState.back()}
            forward={() => historyState.forward()}
            showMsg={() => selectedCompState.set('ShowMSG')}
            msgCount={messageState.getNewCount()}
        />
    );
};

export default SkeletonHeader;
