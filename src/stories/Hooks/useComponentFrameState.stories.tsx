import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton } from '../..';
import { linkTo } from '@storybook/addon-links';
import { Button } from 'grommet';

export default {
    title: 'External/Doc/Skeleton/Hooks/useComponentFrameState',
    component: Skeleton,
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
                component: 'usage of hook:useComponentFrameState',
            },
        },
        layout: 'fullscreen',
    },
};

const SetTitleTemplate: any = () => {
    return (
        <div>
            <Button onClick={linkTo('External/Doc/Skeleton/Parts/ContentFrame')} plain>
                <h3>GoTo Parts ContentFrame to see how to use</h3>
            </Button>
        </div>
    );
};

export const useComponentFrameState = SetTitleTemplate.bind({});
useComponentFrameState.args = {};
