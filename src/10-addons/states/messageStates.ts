import { createState, none, State, useState } from '@hookstate/core';
import { T_AppMessage, T_AppSeverity } from '../types/frameworkTypes';

// ************************************************************************************************************
// Messages
// ************************************************************************************************************

const S_appMessages = createState<T_AppMessage[]>([] as T_AppMessage[]);
const wrapS_appAppMessage = (state: State<T_AppMessage[]>) => ({
    get: () => state.value,
    addNewMessage: (
        msgTitle: string,
        msgMessage: string,
        severity: T_AppSeverity,
        msgError?: Error,
        popUpOnSkeleton = false,
    ) =>
        state[state.length].set({
            time: Date.now(),
            severity,
            msgTitle,
            msgMessage,
            msgError,
            new: true,
            popUpOnSkeleton,
        }),
    addInfo: (msgTitle: string, msgMessage: string, popUpOnSkeleton = false) =>
        state[state.length].set({
            time: Date.now(),
            severity: 'info',
            msgTitle,
            msgMessage,
            new: true,
            popUpOnSkeleton,
        }),
    addSuccess: (msgTitle: string, msgMessage: string, popUpOnSkeleton = false) =>
        state[state.length].set({
            time: Date.now(),
            severity: 'success',
            msgTitle,
            msgMessage,
            new: true,
            popUpOnSkeleton,
        }),
    addWarning: (msgTitle: string, msgMessage: string, popUpOnSkeleton = false) =>
        state[state.length].set({
            time: Date.now(),
            severity: 'warning',
            msgTitle,
            msgMessage,
            new: true,
            popUpOnSkeleton,
        }),
    addCritical: (msgTitle: string, msgMessage: string, popUpOnSkeleton = false) =>
        state[state.length].set({
            time: Date.now(),
            severity: 'critical',
            msgTitle,
            msgMessage,
            new: true,
            popUpOnSkeleton,
        }),
    addError: (msgTitle: string, msgMessage: string, msgError?: Error, popUpOnSkeleton = false) =>
        state[state.length].set({
            time: Date.now(),
            severity: 'error',
            msgTitle,
            msgMessage,
            msgError,
            new: true,
            popUpOnSkeleton,
        }),
    getNew: () => state.value.filter((e) => e.new === true),
    getReaded: () => state.value.filter((e) => e.new === false),
    getInfo: () => state.value.filter((e) => e.severity === 'info'),
    getSuccess: () => state.value.filter((e) => e.severity === 'success'),
    getWarning: () => state.value.filter((e) => e.severity === 'warning'),
    getCritical: () => state.value.filter((e) => e.severity === 'critical'),
    getError: () => state.value.filter((e) => e.severity === 'error'),
    setAsReaded: (time: number) => {
        const index = state.value.findIndex((e) => e.time === time);
        if (index !== -1) {
            const newValue = { ...state.value[index] };
            newValue.new = false;
            state[index].set(newValue);
        }
    },
    isMsgNew: (msgTime: number) => state.value.find((e) => e.time === msgTime)?.new ?? false,
    getLastNew: () => state.value.filter((e) => e.new === true)[state.length - 1],
    getNewCount: () => state.value.filter((e) => e.new === true).length,
    getCount: () => state.value.length,
    getReadedCount: () => state.value.filter((e) => e.new === false).length,
    deleteMsg: (time: number) => {
        state[state.value.findIndex((e) => e.time === time)].set(none);
    },
    deleteAll: () => state.set([]),
    deleteAllReaded: () => {
        const toBeMerged: Record<number, any> = {};
        state.value.forEach((e, index) => {
            if (e.new === false) toBeMerged[index] = none;
        });
        state.merge(toBeMerged);
    },
    setAllReaded: () => state.value.forEach((e, index) => state[index].set({ ...e, ...{ new: false } })),
    isMessageAvailable: (msgTime: number): boolean => state.value.some((e) => e.time === msgTime),
});
export const useMessages = () => wrapS_appAppMessage(useState(S_appMessages));
