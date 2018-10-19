/* tslint:disable:no-console */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var undoable = require('./')["default"];
var fn = function (state, action) {
    if (state === void 0) { state = { isActive: false }; }
    switch (action.type) {
        case 'SET_ACTIVE': return __assign({}, state, { isActive: true });
        case 'SET_INACTIVE': return __assign({}, state, { isActive: false });
        case 'TOGGLE_ACTIVE': return __assign({}, state, { isActive: !state.isActive });
        default: return state;
    }
};
var reducer = undoable(fn);
var initialState = reducer(undefined, { type: 'INIT' });
var newState = reducer(initialState, { type: 'SET_ACTIVE' });
console.log('LOGGING OUT `initialState`', initialState);
console.log('LOGGING OUT `newState`', newState);
