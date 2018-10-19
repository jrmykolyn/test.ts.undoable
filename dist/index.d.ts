import { AnyAction, Reducer } from 'redux';
export interface Action extends AnyAction {
    type: string;
}
export interface HistoryState<T> {
    past: Array<T>;
    present: T;
    future: Array<T>;
}
declare const undoable: (reducer: Reducer<any, AnyAction>) => (state: HistoryState<any>, action: Action) => HistoryState<any>;
export default undoable;
