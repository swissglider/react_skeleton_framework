import React, { useEffect } from 'react';
import { DummyInfoStateComponentStructure } from './DummyInfoStateComponent';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useAppTitle } from '../../10-addons/states/titleStates';
import { grommet, Grommet, ResponsiveContext } from 'grommet';
import { useSizeState } from '../../10-addons/states/windowStates';

export default {
    title: 'Internal/components/DummyInfoStateComponent',
    component: DummyInfoStateComponentStructure,
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
                component: 'DummyInfoStateComponent shows some technical information about the App.',
            },
        },
    },
};

const Template: any = () => {
    const titleState = useAppTitle();
    const sizeState = useSizeState();

    const Comp = ({ size }: any): JSX.Element => {
        useEffect(() => {
            titleState.setTitle('InfoState Story');
        }, []);

        useEffect(() => {
            sizeState.set(size);
        }, [size]);

        if (DummyInfoStateComponentStructure.Component) {
            return <DummyInfoStateComponentStructure.Component />;
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
