import React, { useEffect } from 'react';
import { Test1Structure, Test2Structure } from './TestComponent';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useTitleState } from '../../10-addons/states/titleStates';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_totalHeightState, S_totalWidthState } from '../../10-addons/states/frameworkStates';
import { grommet, Grommet, ResponsiveContext } from 'grommet';
import { useSizeState } from '../../10-addons/states/windowStates';
import { T_AppComponentStructure } from '../../10-addons/types/frameworkTypes';

export default {
    title: 'Internal/components/TestComponent',
    argTypes: {},
    args: {},
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: {
            page: () => {
                return (
                    <>
                        <Title />
                        <Subtitle />
                        <Description />
                        <Primary />
                        <ArgsTable story={PRIMARY_STORY} />
                    </>
                );
            },
            description: {
                component: 'This are two test components',
            },
        },
    },
};

const Template: any = ({ ComponentStruct }: { ComponentStruct: T_AppComponentStructure }) => {
    const titleState = useTitleState();
    const totalWidthState = useState(S_totalWidthState);
    const totalHeightState = useState(S_totalHeightState);
    const landscapeState = useState(S_landscapeState);
    const sizeState = useSizeState();

    const Comp = ({ size }: any): JSX.Element => {
        useEffect(() => {
            titleState.set('InfoState Story');
            const handleResize = () => {
                const totalWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) ?? 0;
                const totalHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) ?? 0;

                totalWidthState.set(totalWidth);
                totalHeightState.set(totalHeight);
                landscapeState.set(totalWidth - totalHeight > 0);
            };
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        useEffect(() => {
            sizeState.set(size);
        }, [size]);

        if (ComponentStruct.Component) {
            return <ComponentStruct.Component {...ComponentStruct.parameters} />;
        }
        return <div>Error ??</div>;
    };

    return (
        <Grommet theme={grommet}>
            <ResponsiveContext.Consumer>
                {(size) => (!size ? <div>No Size ??</div> : <Comp size={size} />)}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};

export const Test1 = Template.bind({});
Test1.args = { ComponentStruct: Test1Structure };

export const Test2 = Template.bind({});
Test2.args = { ComponentStruct: Test2Structure };
