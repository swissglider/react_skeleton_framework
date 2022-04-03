import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Skeleton, Test } from '@swissglider/react_skeleton_framework';
import { linkTo } from '@storybook/addon-links';
import { Button } from 'grommet';

export default {
    title: 'Doc/Skeleton/Parts/SkeletonLoader',
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
                component: 'usage of part:SkeletonLoader',
            },
        },
        layout: 'fullscreen',
    },
};

const SetTitleTemplate: any = () => {
    return (
        <div>
            <Button onClick={linkTo('Doc/Skeleton/Hooks/useAppTitle')} plain>
                <h3>GoTo Hooks useAppTitle to see how to use</h3>
            </Button>
        </div>
    );
};

export const SkeletonLoader = SetTitleTemplate.bind({});
SkeletonLoader.args = {};
