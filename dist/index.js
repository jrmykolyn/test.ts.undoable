var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var undoable = function (reducer) {
    return function (state, action) {
        var newState = state;
        if (state === undefined) {
            newState = { past: [], present: state, future: [] };
        }
        switch (action.type) {
            case 'SAVE_STATE':
                newState = __assign({}, newState, { past: [newState.present] });
        }
        return __assign({}, newState, { present: reducer(newState.present) });
    };
};
module.exports = undoable;
