import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MenuItem from './MenuItem';
import { action } from '@storybook/addon-actions';
import { Menu } from 'grommet-icons';

export default {
    title: 'Internal/atoms/MenuItem',
    component: MenuItem,
    argTypes: {
        menuPartName: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'Menu Part Name',
        },
        menuPartClicked: {
            table: { category: 'Mandatory', type: { required: true } },
            description: 'called when menu part is clicked',
            control: false,
        },
        MenuPartIcon: {
            table: { category: 'Optional', type: { required: false } },
            description: 'Gommet Icon for the Menu',
            control: false,
        },
        isMobile: {
            table: { category: 'Optional', type: { required: false } },
            description: 'is it a mobile device ?',
            control: false,
        },
        isLandscape: {
            table: { category: 'Optional', type: { required: false } },
            description: 'is it landscape mode ?',
            control: false,
        },
        isMainMenu: {
            table: { category: 'Optional', type: { required: false } },
            description: 'is it the main Menu or the sub Menu ?',
            control: false,
        },
        size: {
            table: { category: 'Optional', type: { required: false } },
            description: 'Grommet ResponsiveContext size of the window',
            control: false,
        },
        isSelected: {
            table: { category: 'Optional', type: { required: false } },
            description: 'Is this the selected MenuPart ?',
            control: false,
        },
    },
    args: {
        menuPartName: 'Menu',
        menuPartClicked: action('Menu Part Pressed: '),
        MenuPartIcon: Menu,
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
                component: 'This is the View of the Skeleton Menu Part (Icon).',
            },
        },
    },
} as ComponentMeta<typeof MenuItem>;

const Template1: ComponentStory<typeof MenuItem> = (args) => {
    return <MenuItem {...args} />;
};

export const Standard = Template1.bind({});
Standard.args = {
    isMobile: true,
    isLandscape: false,
    isMainMenu: true,
    size: 'small',
    isSelected: false,
};

Standard.parameters = {
    controls: {},
    docs: {
        source: {
            code: `
import { Menu } from 'grommet-icons';
import SkeletonMenuPartView from './SkeletonMenuPartView';

const Comp = ()=>{
    return (
        <SkeletonMenuPartView
            menuPartName= "Menu"
            menuPartClicked= {() => {do something...}}
            MenuPartIcon= {Menu}
            isMobile= {true}
            isLandscape= {false}
            isMainMenu= {true}
            size= 'small'
            isSelected= {true}
        />
    )
}

            `,
        },
    },
};
// Standard.play = async ({ args, canvasElement }) => {
//     const canvas = within(canvasElement);

//     await userEvent.click(canvas.getByRole('button'));

//     await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
// };
Standard.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const menuIconBTN = await canvas.getByRole('button', { name: `MenuPartBoxBtn_${args.menuPartName}` });
    await userEvent.click(menuIconBTN);
};

export const StandardSelected = Template1.bind({});
StandardSelected.args = {
    isMobile: true,
    isLandscape: false,
    isMainMenu: true,
    size: 'small',
    isSelected: true,
};

export const StandardSelectedLarge = Template1.bind({});
StandardSelectedLarge.args = {
    isMobile: true,
    isLandscape: false,
    isMainMenu: true,
    size: 'large',
    isSelected: true,
};

export const SubMenu = Template1.bind({});
SubMenu.args = {
    isMainMenu: false,
    isMobile: true,
    isLandscape: false,
    size: 'small',
    isSelected: false,
};

export const SubMenuLarge = Template1.bind({});
SubMenuLarge.args = {
    isMobile: true,
    isLandscape: false,
    isMainMenu: false,
    size: 'large',
    isSelected: true,
};

export const LandscapeAndMobile = Template1.bind({});
LandscapeAndMobile.args = {
    isMainMenu: true,
    isMobile: true,
    isLandscape: true,
};

export const LandscapeNotMobile = Template1.bind({});
LandscapeNotMobile.args = {
    isMainMenu: true,
    isMobile: false,
    isLandscape: true,
};
