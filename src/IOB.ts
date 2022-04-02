/* eslint-disable @typescript-eslint/no-namespace */
import { IOBSocketHelper as IOBSocketHelper_ } from './10-addons/helper/IOBSocketHelper';
import { useLoadJsonDataWithIOBSendTo as useLoadJsonDataWithIOBSendTo_ } from './10-addons/hooks/useLoadJsonDataWithIOBSendTo';
import {
    useIOBGenericApp as useIOBGenericApp_,
    useIOBGenericAppFull as useIOBGenericAppFull_,
    useIOBLegacyAdapter as useIOBLegacyAdapter_,
} from './10-addons/states/iobAppStates';
import { IOBApp as IOBApp_ } from './5-pages/IOBApp/IOBApp';
import { IOBMetaDataGridComponent as IOBMetaDataGridComponent_ } from './6-components/IOBMetaDataGridComponent';

export namespace IOBApp {
    export const App = IOBApp_;
    export namespace Components {
        export const IOBMetaDataGridComponent = IOBMetaDataGridComponent_;
    }
    export namespace Hooks {
        export const useLoadJsonDataWithIOBSendTo = useLoadJsonDataWithIOBSendTo_;
        export const useIOBGenericApp = useIOBGenericApp_;
        export const useIOBGenericAppFull = useIOBGenericAppFull_;
        export const useIOBLegacyAdapter = useIOBLegacyAdapter_;
    }
    export namespace Helper {
        export const IOBSocketHelper = IOBSocketHelper_;
    }
}
