'use strict';

var React = require('react');
var Reflux = require('reflux');
var ListingTile = require('./ListingTile');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ListingActions = require('../../../actions/ListingActions');

var fetchOwnedListings = ListingActions.fetchOwnedListings;
var ownedListingsFetched = ListingActions.ownedListingsFetched;

var MyListings = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    componentWillMount: function() {
        this.listenTo(ownedListingsFetched, this.onStoreChanged);
        fetchOwnedListings();
    },

    getState: function() {
        return {
            listings: GlobalListingStore.getByOwner()
        };
    },

    getInitialState: function() {
        return this.getState();
    },

    onStoreChanged: function() {
        this.setState(this.getState());
    },

    render: function () {
        var tiles = this.state.listings.map(function(listing) {
            /* jshint ignore:start */
            return (
                <ListingTile listing={listing} />
            );
            /* jshint ignore:end */
        });

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListings">
                <div className="MyListings__sidebar col-md-3">Sidebar</div>
                <ul className="MyListings__listings col-md-9">{tiles}</ul>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
