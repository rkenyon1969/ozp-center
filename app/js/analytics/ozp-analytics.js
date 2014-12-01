'use strict';

module.exports = {

    trackEvent: function (label, data) {
        window._paq.push(['trackEvent', label, data]);
    },

    trackCategorization: function (label, category, total) {
        window._paq.push(['trackEvent', label, category, total]);
    },

    trackSiteSearch: function (label, query, total) {
        window._paq.push(['trackSiteSearch', query, label, total]);
    }
};
