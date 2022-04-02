import React, { useEffect } from 'react';
import { TestMenuComponentStructure } from './TestMenuComponent';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useAppTitle } from '../../10-addons/states/titleStates';
import { grommet, Grommet, ResponsiveContext } from 'grommet';
import { useSizeState } from '../../10-addons/states/windowStates';

export default {
    title: 'Internal/components/TestMenuComponent',
    component: TestMenuComponentStructure,
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
                component: 'This is to Test the Menu and the Msg Functions',
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

        if (TestMenuComponentStructure.Component) {
            return <TestMenuComponentStructure.Component />;
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
