import { createState, useState } from '@hookstate/core';
import { BoxExtendedProps } from 'grommet';
import { Icon } from 'grommet-icons';
import { BackgroundType, ColorType } from 'grommet/utils';
import { FC } from 'react';
import { T_AppAdditionalActions } from '../../10-addons/types/frameworkTypes';

// SFSC = SkeletonFrameStructConfigurations
// SFSC = SkeletonFrameStruct

const SFSC: string[] = [
    'scope',
    'id',
    'title',
    'collapsible',
    'collapsed',
    'closable',
    'closed',
    'showBody',
    'titleIcon',
    'frameColor',
    'headerBackgroundColor',
    'contentBackgroundColor',
    'boxProps',
    'additionalActions',
];

type T_SFCS = typeof SFSC[number];
type T_SFS_Scope = string;
type T_SFS_ID = string;
export type T_SFCs = Record<T_SFCS, any>;
export type T_SFC_IDs = Record<T_SFS_ID, T_SFCs>;
export type T_SFC_Scopes = Record<T_SFS_Scope, T_SFC_IDs>;

export const S_SFC_State = createState<T_SFC_Scopes>({});
const wrapS_SFC_State = (state: T_SFC_Scopes) => ({
    isClosed: (scope: string, id: string) => state[scope][id]?.value?.closed ?? false,
    isCollapsed: (scope: string, id: string) => state[scope][id]?.value?.collapsed ?? false,
    isShowBody: (scope: string, id: string) => state[scope][id]?.value?.showBody ?? true,
    isCollapsible: (scope: string, id: string) => state[scope][id]?.value?.collapsible ?? false,
    isClosable: (scope: string, id: string) => state[scope][id]?.value?.closable ?? false,

    getTitle: (scope: string, id: string) => state[scope][id]?.value?.title ?? id,
    setTitle: (scope: string, id: string, title: string) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].title.set(title),

    getTitleIcon: (scope: string, id: string) => state[scope][id]?.value?.titleIcon ?? undefined,
    setTitleIcon: (scope: string, id: string, titleIcon: Icon | undefined) =>
        state.keys.includes(scope) &&
        state[scope].keys.includes(id) &&
        state[scope][id].titleIcon.set(titleIcon ? titleIcon : ''),
    setCollapsible: (scope: string, id: string, collapsible: boolean) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].collapsible.set(collapsible),
    toggleCollapsible: (scope: string, id: string) =>
        state.keys.includes(scope) &&
        state[scope].keys.includes(id) &&
        state[scope][id]?.collapsible.set((p: boolean) => !p),

    setCollapsed: (scope: string, id: string, collapsed: boolean) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].collapsed.set(collapsed),
    toggleCollapsed: (scope: string, id: string) =>
        state.keys.includes(scope) &&
        state[scope].keys.includes(id) &&
        state[scope][id].collapsed.set((p: boolean) => !p),
    setClosed: (scope: string, id: string, closed: boolean) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].closed.set(closed),
    toggleClosed: (scope: string, id: string) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].closed.set((p: boolean) => !p),
    setShowBody: (scope: string, id: string, showBody: boolean) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].showBody.set(showBody),
    setClosable: (scope: string, id: string, closable: boolean) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].closable.set(closable),

    setScopeCollapsible: (scope: string, collapsible: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].collapsible.set(collapsible)),
    setScopeCollapsed: (scope: string, collapsed: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].collapsed.set(collapsed)),
    setScopeClosable: (scope: string, closable: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].closable.set(closable)),
    setScopeClosed: (scope: string, closed: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].closed.set(closed)),
    setScopeShowBody: (scope: string, showBody: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].showBody.set(showBody)),

    getFrameColor: (scope: string, id: string): ColorType => state[scope][id]?.value?.frameColor ?? 'brand',
    setFrameColor: (scope: string, id: string, color: ColorType) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].frameColor.set(color),
    setScopeFrameColor: (scope: string, color: ColorType) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].frameColor.set(color)),

    getHeaderBackgroundColor: (scope: string, id: string): BackgroundType =>
        state[scope][id]?.value?.headerBackgroundColor ?? undefined,
    setHeaderBackgroundColor: (scope: string, id: string, color: BackgroundType) =>
        state.keys.includes(scope) &&
        state[scope].keys.includes(id) &&
        state[scope][id].headerBackgroundColor.set(color),
    setScopeHeaderBackgroundColor: (scope: string, color: BackgroundType) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].headerBackgroundColor.set(color)),

    getContentBackgroundColor: (scope: string, id: string): BackgroundType =>
        state[scope][id]?.value?.contentBackgroundColor ?? undefined,
    setContentBackgroundColor: (scope: string, id: string, color: BackgroundType) =>
        state.keys.includes(scope) &&
        state[scope].keys.includes(id) &&
        state[scope][id].contentBackgroundColor.set(color),
    setScopeContentBackgroundColor: (scope: string, color: BackgroundType) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].contentBackgroundColor.set(color)),

    getBoxProps: (scope: string, id: string): BoxExtendedProps =>
        state[scope][id]?.value?.boxProps ?? ({} as BoxExtendedProps),
    setBoxProps: (scope: string, id: string, boxProps: BoxExtendedProps) =>
        state.keys.includes(scope) && state[scope].keys.includes(id) && state[scope][id].boxProps.set(boxProps),
    setScopeBoxProps: (scope: string, boxProps: BoxExtendedProps) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].boxProps.set(boxProps)),

    setAdditionalActions: (scope: string, id: string, additionalActions: T_AppAdditionalActions) =>
        state[scope][id].additionalActions.set(additionalActions),
    getAdditionalActions: (scope: string, id: string): T_AppAdditionalActions =>
        state[scope][id]?.value?.additionalActions ?? [],
});
export const useComponentFrameState = () => wrapS_SFC_State(useState(S_SFC_State));
