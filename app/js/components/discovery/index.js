'use strict';

var React = require('react');
var Reflux = require('reflux');
var contains = require('lodash/collections/contains');
var without = require('lodash/arrays/without');
var forOwn = require('lodash/objects/forOwn');
var assign = require('lodash/objects/assign');

// actions
var ListingActions = require('../../actions/ListingActions');
var fetchNewArrivals = ListingActions.fetchNewArrivals;
var fetchMostPopular = ListingActions.fetchMostPopular;
var fetchFeatured = ListingActions.fetchFeatured;
var search = ListingActions.search;

// component dependencies
var Header = require('../header');
var Sidebar = require('./Sidebar');
var ListingTile = require('./ListingTile');
var FeaturedListings = require('./FeaturedListings');
var Carousel = require('../carousel');

// store dependencies
var DiscoveryPageStore = require('../../stores/DiscoveryPageStore');


var Discovery = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function () {
        return {
            featured: DiscoveryPageStore.getFeatured(),
            newArrivals: DiscoveryPageStore.getNewArrivals(),
            mostPopular: DiscoveryPageStore.getMostPopular(),
            searchResults: DiscoveryPageStore.getSearchResults(),
            selectedListing: null
        };
    },

    componentWillMount: function () {
        // fetch data when instantiated
        fetchFeatured();
        fetchNewArrivals();
        fetchMostPopular();
    },

    componentDidMount: function () {
        this.listenTo(DiscoveryPageStore, this.onStoreChange);
    },

    render: function () {
        var isSearching = this.isSearching();
        var isBrowsing = this.isBrowsing();

        /*jshint ignore:start */
        return (
            <div>
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="fa fa-search"></i>
                            <input
                                ref="search" type="text" className="form-control" placeholder="Search..." value={ this.state.query }
                                onChange={ this.onSearchInputChange } />
                        </div>
                    </form>
                </Header>
                <div id="discovery">
                    <Sidebar
                        ref="sidebar"
                        isSearching= { isSearching }
                        config={ this.props.config }
                        onGoHome= { this.reset }
                        onFilterChange= { this.search } />
                    <section>
                        {
                            isBrowsing ?
                                this.renderSearchResults() :
                                [
                                    this.renderFeaturedListings(),
                                    this.renderNewArrivals(),
                                    this.renderMostPopular()
                                ]
                        }
                    </section>
                    <div className="clearfix"></div>
                </div>
                {this.props.activeRouteHandler()}
            </div>
        );
        /*jshint ignore:end */
    },

    onStoreChange: function () {
        this.setState(this.getInitialState());
    },

    onSearchInputChange: function () {
        this.setState({
            queryString: this.refs.search.getDOMNode().value
        });

        this.search();
    },

    isSearching: function () {
        return !!this.state.queryString;
    },

    isBrowsing: function () {
        var sidebar = this.refs.sidebar;
        return (this.isSearching() || (sidebar && sidebar.areFiltersApplied()));
    },

    reset: function () {
        this.setState({
            queryString: ''
        });
        this.search();
    },

    search: function () {
        search(
            assign({
                queryString: this.refs.search.getDOMNode().value
            }, this.refs.sidebar.state.selectedFilters)
        );
    },

    renderFeaturedListings: function () {
        if(!this.state.featured.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <FeaturedListings
                listings={ this.state.featured } />
        );
        /*jshint ignore:end */
    },

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <section className="Discovery__NewArrivals">
                <h4>New Arrivals</h4>
                <Carousel className="new-arrival-listings">
                    { this._renderListings(this.state.newArrivals) }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    },

    renderMostPopular: function () {
        if(!this.state.mostPopular.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <section className="Discovery__MostPopular">
                <h4>Most Popular</h4>
                <Carousel className="most-popular-listings">
                    { this._renderListings(this.state.mostPopular) }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    },

    renderSearchResults: function () {
        /*jshint ignore:start */
        return (
            <section className="Discovery__SearchResults">
                <h4>Search Results</h4>
                <ul className="list-unstyled listings-search-results">
                    { this._renderListings(this.state.searchResults) }
                </ul>
            </section>
        );
        /*jshint ignore:end */
    },

    _renderListings: function (listings) {
        var me = this;
        /*jshint ignore:start */
        return listings.map(function (listing) {
            return <ListingTile
                        key = { listing.id() }
                        listing={ listing }
                    />
        });
        /*jshint ignore:end */
    }

});

module.exports = Discovery;
