/* eslint-disable @typescript-eslint/no-namespace */
import {
    Test1Structure as Test1Structure_,
    Test2Structure as Test2Structure_,
} from './6-components/TestComponent/TestComponent';
import { TestMenuComponentStructure as TestMenuComponentStructure_ } from './6-components/TestMenuComponent/TestMenuComponent';

export namespace Test {
    export namespace Components {
        export const Test1Structure = Test1Structure_;
        export const Test2Structure = Test2Structure_;
        export const TestMenuComponentStructure = TestMenuComponentStructure_;
    }
}
