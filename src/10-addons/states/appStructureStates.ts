import { createState, none, State, useState } from '@hookstate/core';
import { DummyComponentStructure } from '../../6-components/DummyComponent/DummyComponent';
import { ShowMSGComponentStructure } from '../../4-organisms/ShowMSGComponent/ShowMSGComponent';
import { T_AppComponentStructure, T_AppStructure } from '../types/frameworkTypes';
import { S_appComponentHistory } from './historyStates';
import { MoreMenuStruct } from '../../6-components/MoreMenuComponent/MoreMenuComponent';

// ************************************************************************************************************
// AppStructure --> Components and Menu defined in AppStructure.ts
// ************************************************************************************************************

export const S_appAppStructure = createState<T_AppStructure>({} as T_AppStructure);
const wrapS_appAppStructure = (state: State<T_AppStructure>) => ({
    get: () => state.value,
    set: (as: T_AppStructure) => {
        state.set(as);
    },
    addNewMenu: (title: string, acs: T_AppComponentStructure) => {
        state[title].set(acs);
    },
    deleteMenu: (title: string) => {
        state[title].set(none);
    },
    isMenuAvailable: (title: string): boolean => {
        const available = state[title].value;
        return available !== undefined;
    },
    reset: () => state.set({}),
});
export const useAppStructure = () => wrapS_appAppStructure(useState(S_appAppStructure));

// ************************************************************************************************************
// Components --> Components and Menu defined in AppStructure.ts
// ************************************************************************************************************

export const S_appSelectedComponent = createState<string>('');
const addHistory = (scID: string): void => {
    if (S_appComponentHistory.get().length === 0) {
        const defaultCompPair = Object.entries(S_appAppStructure.get()).find(([, value]) => value.default);
        if (defaultCompPair) {
            S_appComponentHistory.merge([{ scID: defaultCompPair[0], isCurrent: true }]);
        }
    }
    const index = S_appComponentHistory.get().findIndex((e) => e.isCurrent);
    if (index !== -1) {
        const oldSCID = S_appComponentHistory[index].get().scID;
        S_appComponentHistory[index].set({ scID: oldSCID, isCurrent: false });
    }

    S_appComponentHistory.set((p) => {
        p.splice(index + 1, p.length, { scID: scID, isCurrent: true });
        return p;
    });
};
const wrapS_appSelectedComponent = (s: State<string>) => ({
    getMenuName: () => {
        if (s.value && S_appAppStructure[s.value].get()) return S_appAppStructure[s.value].get().menuName;
        const defaultCompPair = Object.entries(S_appAppStructure.get()).find(([, value]) => value.default);
        if (defaultCompPair) {
            return defaultCompPair[1].menuName;
        }
        return DummyComponentStructure.menuName;
    },
    getMenuStructName: () => {
        if (s.value) return s.value;
        const defaultCompPair = Object.entries(S_appAppStructure.get()).find(([, value]) => value.default);
        if (defaultCompPair) {
            return defaultCompPair[0];
        }
        return '';
    },
    getComponent: () => {
        if (s.value === 'ShowMSG') return ShowMSGComponentStructure;
        if (s.value === 'MoreMenu') return MoreMenuStruct;
        if (S_appAppStructure[s.value].get()) {
            return S_appAppStructure[s.value].get();
        }
        const defaultCompPair = Object.entries(S_appAppStructure.get()).find(([, value]) => value.default);
        if (defaultCompPair) {
            return defaultCompPair[1];
        }
        return DummyComponentStructure;
    },
    setSelectedComponent: (sc: string) => {
        s.set(sc);
        addHistory(sc);
    },
    reset: () => s.set(''),
});
export const useSelectedComponent = () => wrapS_appSelectedComponent(useState(S_appSelectedComponent));
