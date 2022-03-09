import React, { createElement } from 'react';
import { S_landscapeState, useVariantState } from '../../10-addons/states/frameworkStates';
import { useState } from '@hookstate/core';
import Menu from '../Menu/Menu';
import { useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MainView from '../../2-pro-atoms/MainView/MainView';
import IFrameComp from '../../1-atoms/IFrameComp/IFrameComp';

const MainPart = (): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const variantState = useVariantState();
    const selectedComponentState = useSelectedComponent();

    const IFramComp =
        selectedComponentState.getComponent().isEmbedded && selectedComponentState.getComponent().embeddedLink ? (
            <IFrameComp src={selectedComponentState.getComponent().embeddedLink as string} />
        ) : undefined;

    const Comp = selectedComponentState.getComponent().Component
        ? createElement(
              selectedComponentState.getComponent().Component as React.FunctionComponent<any>,
              selectedComponentState.getComponent().parameters,
          )
        : undefined;

    const MenuComp = <Menu mainMenu={false} />;

    const NoComp = <div>No Component set</div>;

    return (
        <MainView
            isLandscape={landscapeState.get()}
            embedded={variantState.get() === 'embedded'}
            Comp={Comp}
            IFramComp={IFramComp}
            MenuComp={MenuComp}
            NoComp={NoComp}
        />
    );
};

export default MainPart;
