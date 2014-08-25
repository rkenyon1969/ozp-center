'use strict';

function createObject (arg, schema) {
    arg = arg || {};
    var result = {};
    Object.keys(schema).forEach(function (key) {
        result[key] = schema[key](arg[key]);
    });

    return result;
}

function Defaults (schema) {
    return function (arg) {
        return createObject(arg, schema);
    };
}

Defaults.obj = function (schema) {
    return function (arg) {
        arg = arg || {};
        return createObject(arg, schema);
    };
};

Defaults.str = function () {
    return function (arg) {
        if (arg) {
            return arg;
        }
        return '';
    };
};

Defaults.num = function () {
    return function (arg) {
        if (arg) {
            return arg;
        }
        return null;
    };
};

Defaults.arr = function (func) {
    return function (items) {
        if (items) {
            return items.map(function (item) {
                return func(item);
            });
        }
        return [];
    };
};

module.exports = Defaults;
