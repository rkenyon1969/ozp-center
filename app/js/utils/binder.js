'use strict';

module.exports = function (get, set) {
    return function () {
        if (arguments.length) {
            set(arguments[0]);
        } else {
            return get();
        }
    };
};
