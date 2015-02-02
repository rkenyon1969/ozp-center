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
    },

    trackListingCreation: function(listingName){
        window._paq.push(['trackEvent', 'Listing Creation', listingName]);
    },

    trackListingOrgApproval: function(listingName){
        window._paq.push(['trackEvent', 'Listing Org Approval', listingName]);
    },
    trackListingApproval: function(listingName){
        window._paq.push(['trackEvent', 'Listing Approval', listingName]);
    },

    trackListingReview: function(listingName){
        window._paq.push(['trackEvent', 'Listing Review', listingName]);
    },

    trackListingReviewView: function(listingName){
        window._paq.push(['trackEvent', 'Listing Review View', listingName]);
    }
};
