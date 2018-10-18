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

    return { ...newState, present: reducer( newState.present ) };
  };
};

module.exports = undoable;
