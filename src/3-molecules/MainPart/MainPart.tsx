import React, { createElement, useEffect } from 'react';
import { useVariantState } from '../../10-addons/states/frameworkStates';
import MainMenu from '../Menu/Menu';
import { useSelectedComponent } from '../../10-addons/states/appStructureStates';
import MainView from '../../2-pro-atoms/MainView/MainView';
import IFrameComp from '../../1-atoms/IFrameComp/IFrameComp';
import { DummyComponentStructure } from '../../6-components/DummyComponent/DummyComponent';
import { useWindowSize } from '../../10-addons/hooks/useWindowSize';

const MainPart = (): JSX.Element => {
    const variantState = useVariantState();
    const selectedComponentState = useSelectedComponent();
    const [Comp, setComp] = React.useState<React.ReactElement<any> | undefined>(undefined);
    const [IFrameComp_, setIFrameComp] = React.useState<React.ReactElement<any> | undefined>(undefined);
    const { isLandscape } = useWindowSize();

    useEffect(() => {
        setComp(
            selectedComponentState.getComponent().Component
                ? createElement(
                      selectedComponentState.getComponent().Component as React.FunctionComponent<any>,
                      selectedComponentState.getComponent().parameters,
                  )
                : undefined,
        );
        setIFrameComp(
            selectedComponentState.getComponent().isEmbedded && selectedComponentState.getComponent().embeddedLink ? (
                <IFrameComp
                    src={selectedComponentState.getComponent().embeddedLink as string}
                    name={selectedComponentState.getMenuName()}
                />
            ) : undefined,
        );
    }, [selectedComponentState.getComponent().Component]);

    return (
        <MainView
            isLandscape={isLandscape}
            embedded={variantState.get() === 'embedded'}
            Comp={Comp}
            IFramComp={IFrameComp_}
            MenuComp={<MainMenu mainMenu={false} />}
            NoComp={DummyComponentStructure.Component ? <DummyComponentStructure.Component /> : <div>Error</div>}
        />
    );
};

export default MainPart;
