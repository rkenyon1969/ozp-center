/** @jsx React.DOM */
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
var ListingTile = require('./ListingTile');
var FeaturedListings = require('./FeaturedListings');
var Carousel = require('../carousel');
var Quickview = require('../quickview');

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
            selectedListing: null,
            selectedFilters: (this.state && this.state.selectedFilters) || {}
        };
    },

    componentWillMount: function () {
        // fetch data when instantiated
        fetchFeatured();
        fetchNewArrivals();
        fetchMostPopular();
    },

    componentDidMount: function () {
        this.listenTo(DiscoveryPageStore, this.handleStoreChange);
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.refs.quickview) {
            this.refs.quickview.refs.modal.open();
        }
    },

    render: function () {
        var me = this;
        var searching = this.isSearching();
        var homeLinkClasses = React.addons.classSet({
            'active': !searching,
            'facet-group-item': true
        });

        /*jshint ignore:start */
        var categories = this.props.config.categories.map(function(category, index) {
            var classes = React.addons.classSet({
                active: contains(me.state.selectedFilters.category, category.title),
                'facet-group-item': true
            })
            return (
                <li className={ classes } onClick={ me.handleFilterToggle.bind(null, 'category', category) }>{category.title}</li>
            );
        });

        return (
            <div>
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="fa fa-search"></i>
                            <input ref="search" type="text" className="form-control" placeholder="Search..." onChange={this.handleSearchInputChange} />
                        </div>
                    </form>
                </Header>
                <div id="discovery">
                    <aside className="sidebar">
                        <ul className="list-unstyled facet-group">
                            <li className={ homeLinkClasses } onClick={ this.clearFilters }>Home</li>
                        </ul>
                        <ul className="list-unstyled facet-group">
                            <li>Categories</li>
                            <ul className="list-unstyled">
                                {categories}
                            </ul>
                        </ul>
                    </aside>
                    <section>
                        {
                            searching ?
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
                {
                    this.state.selectedListing && this.renderQuickview()
                }
            </div>
        );
        /*jshint ignore:end */
    },

    isSearching: function () {
        return (
            !!this.state.query || this.areFiltersApplied()
        );
    },

    areFiltersApplied: function () {
        var areFiltersApplied = false;
        forOwn(this.state.selectedFilters, function (value, key) {
            areFiltersApplied = areFiltersApplied || value.length;
        });
        return areFiltersApplied;
    },

    clearFilters: function () {
        var selectedFilters = this.state.selectedFilters;

        // clear selected filter array
        forOwn(selectedFilters, function (value, key) {
            selectedFilters[key] = selectedFilters[key].length = 0;
        });

        this.refs.search.getDOMNode().value = '';
        this.setState({
            query: '',
            selectedFilters: selectedFilters
        });

        this._search();
    },

    handleStoreChange: function () {
        this.setState(this.getInitialState());
    },

    handleSearchInputChange: function () {
        var query = this.refs.search.getDOMNode().value;

        this.setState({
            query: query
        });

        this._search();
    },

    handleFilterToggle: function (type, clickedFilter, e) {
        var values = this.state.selectedFilters[type] || (this.state.selectedFilters[type] = []);
        var value = clickedFilter.title;

        if (contains(values, value)) {
            this.state.selectedFilters[type] = without(values, value);
        }
        else {
            values.push(value);
        }

        this.setState({
            query: this.refs.search.getDOMNode().value,
            selectedFilters: this.state.selectedFilters
        });

        this._search();
    },

    _search: function () {
        if (this.isSearching()) {
            search(
                assign({
                    query: this.refs.search.getDOMNode().value
                }, this.state.selectedFilters)
            );
        }
    },

    renderFeaturedListings: function () {
        if(!this.state.featured.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <FeaturedListings
                listings={ this.state.featured }
                handleClick={ this.openQuickview } />
        );
        /*jshint ignore:end */
    },

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <section>
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
            <section>
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
            <section>
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
                        onClick={ me.openQuickview.bind(me, listing) }
                    />
        });
        /*jshint ignore:end */
    },

    renderQuickview: function () {
        var me = this;
        /*jshint ignore:start */
        return (
            <Quickview
                ref="quickview"
                listing={ this.state.selectedListing }
                onHidden={ function () {
                    me.setState({ selectedListing: null });
                }}
            />
        );
        /*jshint ignore:end */
    },

    openQuickview: function (listing) {
        this.setState({ selectedListing: listing });
    }

});

module.exports = Discovery;