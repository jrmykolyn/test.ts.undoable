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
    expect( undoable() ).to.be.a( 'function' );
  } );

  it( 'should define the initial state when the reducer is invoked for the first time', () => {
    const reducer = undoable( ( state, action ) => state );
    expect( reducer() ).to.eql( { past: [], present: undefined, future: [] } );
  } );

  it( 'should not update the state if no action types are matched', () => {
    const reducer = undoable( ( state, action ) => state );
    const present = { foo: 'bar' };
    const state = { ...reducer(), present };

    const result = reducer( state, { type: 'BAZ' } );

    expect( result.present ).to.eq( present );
  } );
} );
