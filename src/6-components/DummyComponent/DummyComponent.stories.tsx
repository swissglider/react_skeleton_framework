import React, { useEffect } from 'react';
import { DummyComponentStructure } from './DummyComponent';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useTitleState } from '../../10-addons/states/titleStates';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_totalHeightState, S_totalWidthState } from '../../10-addons/states/frameworkStates';
import { grommet, Grommet, ResponsiveContext } from 'grommet';
import { useSizeState } from '../../10-addons/states/windowStates';

export default {
    title: 'Internal/components/DummyComponent',
    component: DummyComponentStructure,
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
                component: 'This is the dummy component used if no other was found or wrong configured',
            },
        },
    },
};

const Template: any = () => {
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

        if (DummyComponentStructure.Component) {
            return <DummyComponentStructure.Component />;
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

export const Standard = Template.bind({});
Standard.args = {};
