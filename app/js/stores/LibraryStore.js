'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');

var LibraryApi = require('../webapi/Library');
var LibraryActions = require('../actions/LibraryActions');

var LibraryStore = Reflux.createStore({
    listenables: LibraryActions,

    library: [],

    onFetchLibrary: function () {
        var me = this;

        LibraryApi.getLibrary().then(function(library) {
            me.library = library;
            me.doTrigger();
        });
    },

    onAddToLibrary: function (listing) {
        var me = this;

        LibraryApi.addToLibrary(listing).then(function(libraryEntry) {
            me.library = me.library.concat(libraryEntry);
            me.doTrigger();
        });
    },

    onRemoveFromLibrary: function (listing, libId) {
        var me = this;

        LibraryApi.removeFromLibrary(libId).then(function() {
            var toRemove = _.find(me.library, {
                listing: {
                    id: listing.id
                }
            });
            me.library = _.without(me.library, toRemove);
            me.doTrigger();
        });
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return this.library;
    }
});

module.exports = LibraryStore;
