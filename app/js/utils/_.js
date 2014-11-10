/**
* Commonly used utility functions.
* All are placed here in one file to not have to retype require path in each module.
**/
module.exports = {
    assign: require('lodash/objects/assign'),
    find: require('lodash/collections/find'),
    findIndex: require('lodash/arrays/findIndex'),
    cloneDeep: require('lodash/objects/cloneDeep'),
    contains: require('lodash/collections/contains'),
    compact: require('lodash/arrays/compact'),
    without: require('lodash/arrays/without'),
    forOwn: require('lodash/objects/forOwn'),
    map: require('lodash/collections/map'),
    partial: require('lodash/functions/partial'),
    isFunction: require('lodash/objects/isFunction'),
    escape: require('lodash/utilities/escape'),
    noop: function () {}
};
