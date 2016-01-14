'use strict';

module.exports = {
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    uncapitalize: function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    },

    toTitleCase: function (str) {
        return str.replace(/\w\S*/g,
                           function(txt) {
                               return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                           });
    }
};
