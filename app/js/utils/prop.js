// https://github.com/lhorie/mithril.js/blob/master/mithril.js#L538
// The MIT License (MIT)
'use strict';

module.exports = function(store) {
    var prop = function() {
        if (arguments.length) {
            store = arguments[0];
        }
        return store;
    };
    prop.toJSON = function() {
        return store;
    };
    return prop;
};