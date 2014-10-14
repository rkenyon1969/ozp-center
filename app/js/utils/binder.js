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

    ownerCollectionBinder: function (cortex) {
        var setCollection = function (values) {
            cortex.set(values.map(function (username) {
                return {username: username};
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
