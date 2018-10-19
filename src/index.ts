import { Reducer } from 'redux';

interface Action {
  type: string;
}

interface HistoryState<T> {
  past: Array<T>;
  present: T;
  future: Array<T>;
}

const undoable = ( reducer: Reducer ) => {
  return ( state: HistoryState<any>, action: Action ) => {
    let newState = state;

    if ( state === undefined ) {
      newState = { past: [], present: state, future: [] };
    }

    switch ( action.type ) {
      case 'SAVE_STATE':
        newState = { ...newState, past: [ newState.present ] };
        break;
      case 'UNDO_STATE':
        newState = { ...newState, past: [], present: newState.past[ 0 ] };
    }

    const newPresent = reducer( newState.present, action );

    return newPresent === newState.present
      ? newState
      : { ...newState, present: newPresent };
  };
};

export default undoable;
