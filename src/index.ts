const undoable = ( reducer ) => {
  return ( state, action ) => {
    let newState

    if ( state === undefined ) {
      newState = { past: [], present: state, future: [] };
    }

    return { ...newState, present: reducer( newState.present ) };
  };
};

module.exports = undoable;
