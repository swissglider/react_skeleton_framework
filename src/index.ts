/* eslint-disable @typescript-eslint/no-namespace */
// ************************************************************************************************************
// Apps
// ************************************************************************************************************
import { Skeleton as Skeleton_ } from './5-pages/Skeleton/Skeleton';
export { Test } from './Test';

// ************************************************************************************************************
// Components
// ************************************************************************************************************
import { DummyInfoStateComponentStructure as DummyInfoStateComponentStructure_ } from './6-components/DummyInfoStateComponent/DummyInfoStateComponent';

// ************************************************************************************************************
// Hooks
// ************************************************************************************************************
import {
    useAppStructure as useAppStructure_,
    useSelectedComponent as useSelectedComponent_,
} from './10-addons/states/appStructureStates';
import { useComponentHistory as useComponentHistory_ } from './10-addons/states/historyStates';
import { useMessages as useMessages_ } from './10-addons/states/messageStates';
import { useAppTitle as useAppTitle_ } from './10-addons/states/titleStates';
import { useAppType as useAppType_ } from './10-addons/states/frameworkStates';
import { useComponentFrameState as useComponentFrameState_ } from './3-molecules/ContentFrameComponent/componentStates';
import { useGrommetTheme as useGrommetTheme_ } from './10-addons/states/grommetThemeState';

// ************************************************************************************************************
// Types
// ************************************************************************************************************
import {
    T_Size as T_Size_,
    T_AppVariant as T_AppVariant_,
    T_AppComponentStructure as T_AppComponentStructure_,
    T_AppStructure as T_AppStructure_,
    T_AppSeverity as T_AppSeverity_,
    T_AppMessage as T_AppMessage_,
} from './10-addons/types/frameworkTypes';

// ************************************************************************************************************
// Component Parts
// ************************************************************************************************************
import { SkeletonLoader as SkeletonLoader_ } from './1-atoms/SkeletonLoader/SkeletonLoader';
import { MessageBox as MessageBox_ } from './3-molecules/SkeletonMessageBox/SkeletonMessageBox';
import { ContentFrame as ContentFrame_ } from './3-molecules/ContentFrameComponent/ContentFrame';

// ************************************************************************************************************
// Helpers
// ************************************************************************************************************
import * as getRandomString_ from './10-addons/helper/getRandomKey';

// ************************************************************************************************************
// final namespace
// ************************************************************************************************************
export namespace Skeleton {
    export const App = Skeleton_;
    export namespace Components {
        export const DummyInfoStateComponentStructure = DummyInfoStateComponentStructure_;
    }
    export namespace Hooks {
        export const useAppStructure = useAppStructure_;
        export const useAppTitle = useAppTitle_;
        export const useAppType = useAppType_;
        export const useComponentHistory = useComponentHistory_;
        export const useSelectedComponent = useSelectedComponent_;
        export const useGrommetTheme = useGrommetTheme_;
        export const useMessages = useMessages_;
        export const useComponentFrameState = useComponentFrameState_;
    }
    export namespace Types {
        export type T_Size = T_Size_;
        export type T_AppVariant = T_AppVariant_;
        export type T_AppComponentStructure = T_AppComponentStructure_;
        export type T_AppStructure = T_AppStructure_;
        export type rT_AppSeverityrr = T_AppSeverity_;
        export type T_AppMessage = T_AppMessage_;
    }
    export namespace Parts {
        export const ContentFrame = ContentFrame_;
        export const SkeletonLoader = SkeletonLoader_;
        export const MessageBox = MessageBox_;
    }
    export namespace Helpers {
        export const getRandomString = getRandomString_.default;
    }
}
