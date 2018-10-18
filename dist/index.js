var undoable = function () {
    return function () { return null; };
};
module.exports = undoable;
