import { createState, State, useState } from '@hookstate/core';
import { S_appAppStructure, S_appSelectedComponent } from './appStructureStates';

// ************************************************************************************************************
// History States
// ************************************************************************************************************

export const S_appComponentHistory = createState<{ scID: string; isCurrent: boolean }[]>([]);
const wrapS_appComponentHistory = (state: State<{ scID: string; isCurrent: boolean }[]>) => ({
    addHistory: (scID: string) => {
        if (state.get().length === 0) {
            const defaultCompPair = Object.entries(S_appAppStructure.get()).find(([, value]) => value.default);
            if (defaultCompPair) {
                state.merge([{ scID: defaultCompPair[0], isCurrent: true }]);
            }
        }
        const index = state.findIndex((e) => e.get().isCurrent);

        if (index !== -1) {
            const oldSCID = state[index].get().scID;
            state[index].set({ scID: oldSCID, isCurrent: false });
        }
        state.set((p) => {
            p.splice(index + 1, p.length, { scID: scID, isCurrent: true });
            return p;
        });
    },
    back: (steps = 1) => {
        const index = state.findIndex((e) => e.get().isCurrent);

        // check if back possible
        if (index < steps) return;

        // change the old current to false
        const oldSCID = state[index].get().scID;
        state[index].set({ scID: oldSCID, isCurrent: false });

        // change the new current to true
        const newIndex = index - steps;
        const newSCID = state[newIndex].get().scID;
        state[newIndex].set({ scID: newSCID, isCurrent: true });

        // set selectedComponent
        S_appSelectedComponent.set(newSCID);
    },
    forward: (steps = 1) => {
        const index = state.findIndex((e) => e.get().isCurrent);

        // check if forward is possible
        if (state.length - 1 < steps + index) return;

        // change the old current to false
        const oldSCID = state[index].get().scID;
        state[index].set({ scID: oldSCID, isCurrent: false });

        const newIndex = index + steps;
        const newSCID = state[newIndex].get().scID;
        state[newIndex].set({ scID: newSCID, isCurrent: true });

        // set selectedComponent
        S_appSelectedComponent.set(newSCID);
    },
    hasBack: (steps = 1): boolean => {
        const index = state.findIndex((e) => e.get().isCurrent);
        return !(index < steps);
    },
    hasForward: (steps = 1): boolean => {
        const index = state.findIndex((e) => e.get().isCurrent);
        return !(state.length - 1 < steps + index);
    },
    reset: () => state.set([]),
});

export const useComponentHistory = () => wrapS_appComponentHistory(useState(S_appComponentHistory));
