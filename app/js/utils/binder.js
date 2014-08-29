'use strict';


/**
 *  Helper for getting data into and out of a Cortex wrapped object in
 *  consistent manner when using it with a UI component that does user input.
 *
 */
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
    /**
     *  Handles the usual case, where we just want to get and set
     *  the value as is (e.g. a text box).
     */
    simpleBinder: function (cortex) {
        return dataBinder(
            function () {
                return cortex.val();
            },
            function (val) {
                cortex.set(val);
            }
        );
    },

    /**
     *  Same as above but for transforming the value to an integer. The
     *  common use case is for a select that uses integer ids as the value.
     */
    idBinder: function (cortex) {
        return dataBinder(
            function () {
                return cortex.val();
            },
            function (val) {
                cortex.set(parseInt(val, 10));
            }
        );
    },

    /**
     *  For taking arrays of values (ids) from, for example, a multi select
     *  dropdown component and tranforming them into objects with id values.
     */
    objCollectionBinder: function (cortex) {
        var setCollection = function (values) {
            cortex.set(values.map(function (id) {
                return {id: parseInt(id, 10)};
            }));
        };

        return dataBinder(
            function () {
                return cortex.val();
            },
            setCollection
        );
    }
};
