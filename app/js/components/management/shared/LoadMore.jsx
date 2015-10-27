'use strict';

var PaginatedListingsStore = require('../../../stores/PaginatedListingsStore');
var ListingActions = require('../../../actions/ListingActions.js');

var ListingTile = require('../../listing/ListingTile.jsx');
var { UserRole } = require('ozp-react-commons/constants');


var React = require('react');
var Reflux = require('reflux');
var { PropTypes } = React;

var LoadMore = React.createClass({

    mixins: [
        Reflux.listenTo(PaginatedListingsStore, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.listingChangeCompleted, 'onListingChangeCompleted')
    ],

    propTypes: {
        filter: PropTypes.object.isRequired,
        onCountsChanged: PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            listings: [],
            hasMore: false
        };
    },

    render: function () {
        return this.transferPropsTo(
            <div className="LoadMore">
                { this.renderList() }
                { this.renderLoadMoreButton() }
            </div>
        );
    },

    renderList: function () {
        var children = this.generateChildren(); 

        if (children && children.length > 0) {
            return <ol className="list-unstyled">{ children }</ol>;
        }
        else {
            return <h5 style={{marginTop: 0}}>No results found!</h5>;
        }
    },

    renderLoadMoreButton: function () {
        if (this.state.hasMore) {
            return (
                <div className="text-center LoadMore__Toolbar">
                    <button className="btn btn-default LoadMore__Button" onClick={this.onLoadMore}>Load More</button>
                </div>
            );
        }
    },

    generateChildren: function () {// flesh out
        return ListingTile.fromArray(this.state.listings, UserRole.ADMIN);
    },

    componentDidMount: function () {
        this.fetchAllListingsIfEmpty();
    },

    getPaginatedList: function () {
        return PaginatedListingsStore.getListingsByFilter(this.props.filter);
    },

    fetchAllListingsIfEmpty: function () {
        var listings = this.getPaginatedList();
        if (!listings) {
            ListingActions.fetchAllListings(this.props.filter);
        }
        this.onStoreChanged();
    },

    onStoreChanged: function () {
        var paginatedList = this.getPaginatedList();
        if (!paginatedList) {
            return;
        }
        var { data, hasMore, counts } = paginatedList;

        this.setState({
            listings: data,
            hasMore: hasMore,
        });

        this.props.onCountsChanged(counts);
    },

    onListingChangeCompleted: function () {
        ListingActions.fetchAllListings(this.props.filter);
    },

    onLoadMore: function () {
        ListingActions.fetchAllListings(this.props.filter);
    },
});

module.exports = LoadMore;