/**
* Commonly used utility functions.
* All are placed here in one file to not have to retype require path in each module.
**/
module.exports = {
    assign: require('lodash/objects/assign'),
    cloneDeep: require('lodash/objects/cloneDeep'),
    forOwn: require('lodash/objects/forOwn'),
    isFunction: require('lodash/objects/isFunction'),
    pick: require('lodash/objects/pick'),
    find: require('lodash/collections/find'),
    contains: require('lodash/collections/contains'),
    map: require('lodash/collections/map'),

    findIndex: require('lodash/arrays/findIndex'),
    compact: require('lodash/arrays/compact'),
    without: require('lodash/arrays/without'),
    zipObject: require('lodash/arrays/zipObject'),
    last: require('lodash/arrays/last'),

    partial: require('lodash/functions/partial'),
    once: require('lodash/functions/once'),

    escape: require('lodash/utilities/escape'),

    noop: function () {}
};
