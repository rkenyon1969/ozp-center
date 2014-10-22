'use strict';

var React = require('react');
var Reflux = require('reflux');
var MyListingTile = require('./MyListingTile');
var MyListingsSidebar = require('./MyListingsSidebar');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ListingActions = require('../../../actions/ListingActions');

var fetchOwnedListings = ListingActions.fetchOwnedListings;
var ownedListingsFetched = ListingActions.ownedListingsFetched;

/**
 * @param filter one of "all", "published", "needs-action", "pending", or "draft"
 * @param listing a listing model
 * @return whether or not the listing's approvalStatus matches the filter
 */
function listingFilter(filter, listing) {
    return filter === 'all' ||
        (filter === 'published' && listing.approvalStatus() === 'APPROVED') ||
        (filter === 'needs-action' && listing.approvalStatus() === 'REJECTED') ||
        (filter === 'pending' && listing.approvalStatus() === 'PENDING') ||
        (filter === 'draft' && listing.approvalStatus() === 'IN_PROGRESS');
}

var MyListings = React.createClass({

    defaultValue: 'all',

    mixins: [ Reflux.ListenerMixin ],

    componentWillMount: function() {
        this.listenTo(ownedListingsFetched, this.onStoreChanged);
        fetchOwnedListings();
    },

    getListings: function() {
        return GlobalListingStore.getByOwner();
    },

    getInitialState: function() {
        return {
            listings: this.getListings(),
            filter: this.defaultValue
        };
    },

    onStoreChanged: function() {
        this.setState({
            listings: this.getListings(),
            filter: this.state.filter
        });
    },

    onFilterChanged: function(filter) {
        this.setState({
            listings: this.state.listings,
            filter: filter
        });
    },

    render: function () {
        var tiles = this.state.listings
            .filter(listingFilter.bind(undefined, this.state.filter))
            .map(function(listing) {
                /* jshint ignore:start */
                return (
                    <MyListingTile listing={listing} />
                );
                /* jshint ignore:end */
            });

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListings">
                <aside className="MyListings__sidebar col-md-3" >
                    <MyListingsSidebar value={this.state.filter}
                        listings={this.state.listings}
                        onFilterChanged={this.onFilterChanged} />
                </aside>
                <ul className="MyListings__listings col-md-9">{tiles}</ul>
                <this.props.activeRouteHandler />
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
