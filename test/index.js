// IMPORT MODULES
const { expect } = require( 'chai' );
const { it } = require( 'mocha' );
const undoable = require( '../dist' );

// DEFINE TESTS
describe( 'undoable', () => {
  it( 'should be a function', () => {
    expect( undoable ).to.be.a( 'function' );
  } );

  it( 'should return a function', () => {
    const action = {};

    expect( undoable( undefined, action ) ).to.be.a( 'function' );
  } );

  it( 'should define the initial state when the reducer is invoked for the first time', () => {
    const reducer = undoable( ( state, action ) => state );
    const action = {};

    expect( reducer( undefined, action ) ).to.eql( { past: [], present: undefined, future: [] } );
  } );

  it( 'should not update the state if no action types are matched', () => {
    const reducer = undoable( ( state, action ) => state );
    const present = { foo: 'bar' };
    const action = { type: 'BAZ' };
    const state = { ...reducer( undefined, action ), present };

    const result = reducer( state, action );

    expect( result ).to.eq( state );
  } );

  it( 'should update the present state if an action type is matched', () => {
    const reducer = undoable( ( state, action ) => {
      switch ( action.type ) {
        case 'INCREMENT': return state + 1;
        default: return state;
      }
    } );
    const state = { past: [ 1 ], present: 2, future: []  };
    const action = { type: 'INCREMENT' };

    const result = reducer( state, action );

    expect( result ).to.eql( { past: [ 1 ], present: 3, future: [] } );
  } );

  it( 'should update the past state on SAVE_STATE', () => {
    const reducer = undoable( ( state, action ) => state );
    const present = { foo: 'bar' };
    const state = { ...reducer( undefined, {} ), present };
    const action = { type: 'SAVE_STATE' };

    const result = reducer( state, action );

    expect( result ).to.eql( { past: [ present ], present, future: [] } );
  } );

  it( 'should update the present state on UNDO_STATE', () => {
    const reducer = undoable( ( state, action ) => state );
    const past = { foo: 'bar' };
    const present = { baz: 'quux' };
    const state = { past: [ past ], present, future: [] };
    const action = { type: 'UNDO_STATE' };

    const result = reducer( state, action );

    expect( result.past ).to.eql( [] );
    expect( result.present ).to.eq( past );
  } );
} );
