// ************************************************************************************************************
// Apps
// ************************************************************************************************************
import { IOBApp as IOBApp_ } from './5-pages/IOBApp';
import { Skeleton as Skeleton_ } from './5-pages/skeleton';

// ************************************************************************************************************
// Components
// ************************************************************************************************************
import { MetaDataGridComponent as MetaDataGridComponent_ } from './components/metaDataGridComponent/index';
import { TestComponent as TestComponent_ } from './components/testComponent';
import { MenuTestComponentStructure as MenuTestComponentStructure_ } from './components/skeletonMenuTestComponent';
import { InfoStateComponentStructure as InfoStateComponentStructure_ } from './components/skeletonInfoStateComponent';

// ************************************************************************************************************
// State Hooks
// ************************************************************************************************************
import {
    useAppStructure as useAppStructure_,
    useSelectedComponent as useSelectedComponent_,
} from './10-addons/states/appStructureStates';
import { useComponentHistory as useComponentHistory_ } from './10-addons/states/historyStates';
import { useMessages as useMessages_ } from './10-addons/states/messageStates';
import { useTitleState as useTitleState_ } from './10-addons/states/titleStates';
import { useSizeState as useSizeState_ } from './10-addons/states/windowStates';
import {
    useIOBAppTest as useIOBAppTest_,
    useIOBGenericApp as useIOBGenericApp_,
    useIOBGenericAppFull as useIOBGenericAppFull_,
    useIOBLegacyAdapter as useIOBLegacyAdapter_,
} from './10-addons/states/iobAppStates';

// ************************************************************************************************************
// Hooks
// ************************************************************************************************************
import { useLoadJsonDataWithSendTo as useLoadJsonDataWithSendTo_ } from './10-addons/hooks/useLoadJsonDataWithSendTo';

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
// Helper
// ************************************************************************************************************
import { SocketHelper as SocketHelper_ } from './10-addons/helper/socketHelper';

// ************************************************************************************************************
// Component Parts
// ************************************************************************************************************
import {
    ContentFrame as ContentFrame_,
    useComponentFrameState as useComponentFrameState_,
} from './3-molecules/ContentFrameComponent';
import { ContentFrameSimple as ContentFrameSimple_ } from './3-molecules/contentFrameSimple';
import { SkeletonLoader as SkeletonLoader_ } from './1-atoms/SkeletonLoader/SkeletonLoader';
import { MessageBox as MessageBox_ } from './3-molecules/SkeletonMessageBox/SkeletonMessageBox';

// ************************************************************************************************************
// final namespace
// ************************************************************************************************************
export namespace Skeleton {
    export const SkeletonApp = Skeleton_;
    export namespace Components {
        export const MetaDataGridComponent = MetaDataGridComponent_;
        export const TestComponent = TestComponent_;
        export const MenuTestComponentStructure = MenuTestComponentStructure_;
        export const InfoStateComponentStructure = InfoStateComponentStructure_;
    }
    export namespace Apps {
        export const IOBApp = IOBApp_;
    }
    export namespace States {
        export const useAppStructure = useAppStructure_;
        export const useSelectedComponent = useSelectedComponent_;
        export const useComponentHistory = useComponentHistory_;
        export const useMessages = useMessages_;
        export const useTitleState = useTitleState_;
        export const useSizeState = useSizeState_;
        export const useIOBAppTest = useIOBAppTest_;
        export const useIOBGenericApp = useIOBGenericApp_;
        export const useIOBGenericAppFull = useIOBGenericAppFull_;
        export const useIOBLegacyAdapter = useIOBLegacyAdapter_;
        export const useComponentFrameState = useComponentFrameState_;
    }
    export namespace Hooks {
        export const useLoadJsonDataWithSendTo = useLoadJsonDataWithSendTo_;
    }
    export namespace Types {
        export type T_Size = T_Size_;
        export type T_AppVariant = T_AppVariant_;
        export type T_AppComponentStructure = T_AppComponentStructure_;
        export type T_AppStructure = T_AppStructure_;
        export type rT_AppSeverityrr = T_AppSeverity_;
        export type T_AppMessage = T_AppMessage_;
    }
    export namespace Helper {
        export const SocketHelper = SocketHelper_;
    }
    export namespace Parts {
        export const ContentFrame = ContentFrame_;
        export const ContentFrameSimple = ContentFrameSimple_;
        export const SkeletonLoader = SkeletonLoader_;
        export const MessageBox = MessageBox_;
    }
}
