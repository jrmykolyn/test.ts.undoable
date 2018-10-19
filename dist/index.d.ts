import { Reducer } from 'redux';
interface Action {
    type: string;
}
interface HistoryState<T> {
    past: Array<T>;
    present: T;
    future: Array<T>;
}
declare const undoable: (reducer: Reducer<any, import("redux").AnyAction>) => (state: HistoryState<any>, action: Action) => HistoryState<any>;
export default undoable;
