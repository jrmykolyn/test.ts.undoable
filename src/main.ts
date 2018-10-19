/* tslint:disable:no-console */

const { default: undoable } = require( './' );

const fn = ( state = { isActive: false }, action ) => {
    switch ( action.type ) {
        case 'SET_ACTIVE': return { ...state, isActive: true };
        case 'SET_INACTIVE': return { ...state, isActive: false };
        case 'TOGGLE_ACTIVE': return { ...state, isActive: !state.isActive };
        default: return state;
    }
};

const reducer = undoable( fn );

const initialState = reducer( undefined, { type: 'INIT'} );
const newState = reducer( initialState, { type: 'SET_ACTIVE' } );

console.log( 'LOGGING OUT `initialState`', initialState );
console.log( 'LOGGING OUT `newState`', newState );
