'use strict';

var $ = require('jquery');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var LibraryApi = {
    addToLibrary: function (listing) {
        var libraryEntryJson = {
            listing: { id: listing.id }
        };

        return $.ajax({
            url: `${API_URL}/api/profile/self/library`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(libraryEntryJson)
        });
    },

    removeFromLibrary: function (listing) {
        return $.ajax({
            url: `${API_URL}/api/profile/self/library/${encodeURIComponent(listing.id)}`,
            type: 'delete'
        });
    },

    getLibrary: function () {
        return $.getJSON(`${API_URL}/api/profile/self/library`);
    }
};

module.exports = LibraryApi;
