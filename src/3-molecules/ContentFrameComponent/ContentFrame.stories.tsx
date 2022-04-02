import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import ContentFrame from './ContentFrame';
import { useComponentFrameState } from './componentStates';
import { DocumentStore, Achievement, Action, Attachment, Command, Icon } from 'grommet-icons';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

const TITLE_ICONS = ['none', 'DocumentStore', 'Achievement', 'Action', 'Attachment', 'Command'];
const TITLE_ICON: Record<string, Icon | undefined> = {
    DocumentStore: DocumentStore,
    Achievement: Achievement,
    Action: Action,
    Attachment: Attachment,
    Command: Command,
    none: undefined,
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Internal/molecules/ContentFrame',
    component: ContentFrame,
    argTypes: {
        scope: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: defines all ContentFrames in a scope',
            control: false,
        },
        id: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: unique id of the ContentFrame',
            control: false,
        },
        children: {
            table: { category: 'standard', type: { required: true } },
            description: 'Mandatory: children Elements',
            control: false,
        },
        pad: {
            table: { category: 'standard', subcategory: 'Optional: ContentFrame Main Box behaviours' },
            control: false,
        },
        margin: {
            table: { category: 'standard', subcategory: 'Optional: ContentFrame Main Box behaviours' },
            control: false,
        },
        flex: {
            table: { category: 'standard', subcategory: 'Optional: ContentFrame Main Box behaviours' },
            control: false,
        },
        height: {
            table: { category: 'standard', subcategory: 'Optional: ContentFrame Main Box behaviours' },
            control: false,
        },
        title: {
            name: 'Title',
            table: {
                type: {
                    summary: 'use : setTitle()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setTitle(scope,id,'I'm the title');`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        titleIcon: {
            name: 'Title Icon',
            table: {
                type: {
                    summary: 'Any Grommet Icon. use: useComponentFrameState()',
                    detail: `const frameState = useComponentFrameState();\nframeState.useComponentFrameState(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
            options: TITLE_ICONS, // An array of serializable values
            control: {
                type: 'select', // Type 'select' is automatically inferred when 'options' is defined
            },
        },
        collapsible: {
            name: 'Collapsible',
            table: {
                type: {
                    summary: 'use : setCollapsible()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setCollapsible(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        collapsed: {
            name: 'Collapsed',
            table: {
                type: {
                    summary: 'use : setCollapsed()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setCollapsed(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        closable: {
            name: 'Closable',
            table: {
                type: {
                    summary: 'use : setClosable()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setClosable(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        closed: {
            name: 'Closed',
            table: {
                type: {
                    summary: 'use : setClosed()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setClosed(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        showBody: {
            name: 'Show Body',
            table: {
                type: {
                    summary: 'use : setShowBody()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setShowBody(scope,id,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Singel ContentFrame manipulation',
            },
        },
        closeAllInScope: {
            name: 'Close all in Scope',
            table: {
                type: {
                    summary: 'use : setScopeClosed()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setScopeClosed(scope,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Multi ContentFrames manipulation',
            },
        },
        collapseAllInScope: {
            name: 'Collapse all in Scope',
            table: {
                type: {
                    summary: 'use : setScopeCollapsed()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setScopeCollapsed(scope,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Multi ContentFrames manipulation',
            },
        },
        showAllBodiesInScope: {
            name: 'Show all Bodies in Scope',
            table: {
                type: {
                    summary: 'use : setScopeShowBody()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setScopeShowBody(scope,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Multi ContentFrames manipulation',
            },
        },
        collapsibleAllInScope: {
            name: 'Set all to collapsible in Scope',
            table: {
                type: {
                    summary: 'use : setScopeCollapsible()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setScopeCollapsible(scope,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Multi ContentFrames manipulation',
            },
        },
        closableAllInScope: {
            name: 'Set all to closable in Scope',
            table: {
                type: {
                    summary: 'use : setScopeClosable()',
                    detail: `const frameState = useComponentFrameState();\nframeState.setScopeClosable(scope,true);`,
                },
                category: 'Used with FrameState',
                subcategory: 'Multi ContentFrames manipulation',
            },
        },
    },
    args: {
        title: 'Test Cloud',
        scope: 'SCOPE',
        id: 'ID',
        children: <div style={{ margin: '60px' }}>I'm the Child Content</div>,
        collapsible: true,
        collapsed: false,
        closable: true,
        closed: false,
        showBody: true,
        closeAllInScope: false,
        collapseAllInScope: false,
        showAllBodiesInScope: true,
        collapsibleAllInScope: true,
        closableAllInScope: true,
        titleIcon: 'none',
    },
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
                component: 'Some component _markdown_',
            },
        },
    },
} as ComponentMeta<typeof ContentFrame>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template1: ComponentStory<typeof ContentFrame> = (args) => {
    const frameState = useComponentFrameState();

    frameState.setCollapsible('SCOPE', 'ID', (args as any).collapsible);
    frameState.setCollapsed('SCOPE', 'ID', (args as any).collapsed);
    frameState.setClosable('SCOPE', 'ID', (args as any).closable);
    frameState.setClosed('SCOPE', 'ID', (args as any).closed);
    frameState.setShowBody('SCOPE', 'ID', (args as any).showBody);
    frameState.setTitle('SCOPE', 'ID', (args as any).title);
    frameState.setTitleIcon('SCOPE', 'ID', TITLE_ICON[(args as any).titleIcon as string]);
    frameState.setScopeCollapsible('SCOPE', (args as any).collapsibleAllInScope);
    frameState.setScopeCollapsed('SCOPE', (args as any).collapseAllInScope);
    frameState.setScopeClosable('SCOPE', (args as any).closableAllInScope);
    frameState.setScopeClosed('SCOPE', (args as any).closeAllInScope);
    frameState.setScopeShowBody('SCOPE', (args as any).showAllBodiesInScope);

    return <ContentFrame {...args} scope="SCOPE" id="ID" />;
};
export const Standard = Template1.bind({});
Standard.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
import ContentFrame from './ContentFrame';
import { useComponentFrameState } from './componentStates';

const App = ():JSX.Elemement => {
    const frameState = useComponentFrameState();
    const SCOPE = 'Scope1';
    useEffect(()=> {
        frameState.setScopeCollapsible(SCOPE, true);
        frameState.setScopeCollapsed(SCOPE, false);
        frameState.setScopeClosable(SCOPE, true);
        frameState.setScopeClosed(SCOPE, false);
        frameState.setScopeShowBody(SCOPE, true);
        frameState.setTitle(SCOPE, 'ID', 'Test1-Title');
        frameState.setTitle(SCOPE, 'ID2', 'Test2-Title');
    })

    return (
        <Box flex={true}>
            <Skeleton.Parts.ContentFrame
                id="listView"
                scope={ID}
            >
                <div>I'm a child Content</div>
            </Skeleton.Parts.ContentFrame>
            <Skeleton.Parts.ContentFrame
                id="listView"
                scope={ID2}
            >
                <div>I'm a child Content</div>
            </Skeleton.Parts.ContentFrame>
        </Box>
    )
}
`,
        },
    },
};

const Template2: ComponentStory<typeof ContentFrame> = (args) => {
    const frameState = useComponentFrameState();

    frameState.setScopeCollapsible('SCOPE', (args as any).collapsibleAllInScope);
    frameState.setScopeCollapsed('SCOPE', (args as any).collapseAllInScope);
    frameState.setScopeClosable('SCOPE', (args as any).closableAllInScope);
    frameState.setScopeClosed('SCOPE', (args as any).closeAllInScope);
    frameState.setScopeShowBody('SCOPE', (args as any).showAllBodiesInScope);
    frameState.setTitle('SCOPE', 'ID', `ContentFrame with ID in SCOPE`);
    frameState.setTitle('SCOPE', 'ID2', `ContentFrame with ID2 in Scope`);

    return (
        <div>
            <ContentFrame {...args} scope="SCOPE" id="ID" />
            <p />
            <ContentFrame {...args} scope="SCOPE" id="ID2" />
        </div>
    );
};

export const ScopeBase = Template2.bind({});
ScopeBase.parameters = {
    controls: {
        include: [
            'Close all in Scope',
            'Collapse all in Scope',
            'Show all Bodies in Scope',
            'Set all to closable in Scope',
            'Set all to collapsible in Scope',
        ],
    },
};
