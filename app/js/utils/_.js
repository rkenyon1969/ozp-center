/**
* Commonly used utility functions.
* All are placed here in one file to not have to retype require path in each module.
**/
module.exports = {
    assign: Object.assign,
    clone: require('lodash/objects/clone'),
    cloneDeep: require('lodash/objects/cloneDeep'),
    forOwn: require('lodash/objects/forOwn'),
    isArray: require('lodash/objects/isArray'),
    isBoolean: require('lodash/objects/isBoolean'),
    isFunction: require('lodash/objects/isFunction'),
    isString: require('lodash/objects/isString'),
    isEmpty: require('lodash/objects/isEmpty'),
    isEqual: require('lodash/objects/isEqual'),
    pick: require('lodash/objects/pick'),
    omit: require('lodash/objects/omit'),
    values: require('lodash/objects/values'),
    keys: require('lodash/objects/keys'),
    has: require('lodash/objects/has'),

    find: require('lodash/collections/find'),
    filter: require('lodash/collections/filter'),
    contains: require('lodash/collections/contains'),
    map: require('lodash/collections/map'),
    reduce: require('lodash/collections/reduce'),
    forEach: require('lodash/collections/forEach'),
    every: require('lodash/collections/every'),
    groupBy: require('lodash/collections/groupBy'),
    pluck: require('lodash/collections/pluck'),

    findIndex: require('lodash/arrays/findIndex'),
    compact: require('lodash/arrays/compact'),
    flatten: require('lodash/arrays/flatten'),
    without: require('lodash/arrays/without'),
    zipObject: require('lodash/arrays/zipObject'),
    zip: require('lodash/arrays/zip'),
    last: require('lodash/arrays/last'),
    remove: require('lodash/arrays/remove'),
    range: require('lodash/arrays/range'),
    difference: require('lodash/arrays/difference'),

    partial: require('lodash/functions/partial'),
    once: require('lodash/functions/once'),
    debounce: require('lodash/functions/debounce'),

    escape: require('lodash/utilities/escape'),

    template: require('lodash/utilities/template'),

    noop: function () {}
};
