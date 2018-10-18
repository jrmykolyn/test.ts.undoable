// IMPORT MODULES
const { expect } = require( 'chai' );
const { it } = require( 'mocha' );
const undoable = require( '../dist' );

// DEFINE TESTS
describe( 'undoable', () => {
  it( 'should be a function', () => {
    expect( undoable ).to.be.a( 'function' );
  } );
} );
