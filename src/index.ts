const undoable = ( reducer ) => {
  return ( state, action ) => {
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

module.exports = undoable;
