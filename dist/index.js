"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var undoable = function (reducer) {
    return function (state, action) {
        var newState = state;
        if (state === undefined) {
            newState = { past: [], present: state, future: [] };
        }
        switch (action.type) {
            case 'SAVE_STATE':
                newState = __assign({}, newState, { past: [newState.present] });
                break;
            case 'UNDO_STATE':
                newState = __assign({}, newState, { past: [], present: newState.past[0] });
        }
        var newPresent = reducer(newState.present, action);
        return newPresent === newState.present
            ? newState
            : __assign({}, newState, { present: newPresent });
    };
};
exports["default"] = undoable;
