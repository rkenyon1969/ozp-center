'use strict';

var $ = require('jquery');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var LibraryApi = {
    // TODO: update when alan changes endpoint
    addToLibrary: function (listing) {
        var libraryEntryJson = {
            listing: { id: listing.id }
        };

        return $.ajax({
            url: `${API_URL}/api/self/library/`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(libraryEntryJson)
        });
    },

    removeFromLibrary: function (libId) {
        return $.ajax({
            url: `${API_URL}/api/self/library/${encodeURIComponent(libId)}/`,
            type: 'delete'
        });
    },

    getLibrary: function () {
        return $.getJSON(`${API_URL}/api/self/library/`);
    }
};

module.exports = LibraryApi;
