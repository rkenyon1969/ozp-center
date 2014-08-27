'use strict';

function dataBinder (get, set) {
    return function () {
        if (arguments.length) {
            set(arguments[0]);
        } else {
            return get();
        }
    };
}

module.exports = {
    simpleBinder: function (cortex) {
        return dataBinder(function(){return cortex.val();}, function(val){cortex.set(val);});
    },

    idBinder: function (cortex) {
        return dataBinder(function(){return cortex.val();}, function(val){cortex.set(parseInt(val, 10));});
    },

    objCollectionBinder: function (cortex) {
        var setCollection = function (values) {
            cortex.set(values.map(function (id) {
                return {id: parseInt(id, 10)};
            }));
        };

        return dataBinder(function(){return cortex.val();}, setCollection);
    }
};
