'use strict';

module.exports = {
    trackEvent: function (label, data, agency) {
        window._paq.push(['trackEvent', label, data, agency]);
    },

    trackCategorization: function (label, category, total) {
        window._paq.push(['trackEvent', label, category, total]);
    },

    trackSiteSearch: function (label, query, total) {
        query = query.toLowerCase();
        window._paq.push(['trackSiteSearch', query, label, total]);
    },

    trackListingCreation: function(listingName, agency){
        window._paq.push(['trackEvent', 'Listing Creation', listingName, agency]);
    },

    trackListingOrgApproval: function(listingName, agency){
        window._paq.push(['trackEvent', 'Listing Org Approval', listingName, agency]);
    },
    trackListingApproval: function(listingName, agency){
        window._paq.push(['trackEvent', 'Listing Approval', listingName, agency]);
    },

    trackListingReview: function(listingName, agency){
        window._paq.push(['trackEvent', 'Listing Review', listingName, agency]);
    },

    trackListingReviewView: function(listingName, agency){
        window._paq.push(['trackEvent', 'Listing Review View', listingName, agency]);
    }
};
