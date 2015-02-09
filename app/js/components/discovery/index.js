'use strict';

var React = require('react');
var Reflux = require('reflux');
var { RouteHandler } = require('react-router');
var _ = require('../../utils/_');

// actions
var ListingActions = require('../../actions/ListingActions');

// component dependencies
var NavBar = require('../NavBar');
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
            mostPopularMax: 36,
            mostPopularTiles: 12,
        };
    },

    componentWillMount: function () {
        this.listenTo(DiscoveryPageStore, this.onStoreChange);

        // fetch data when instantiated
        ListingActions.fetchFeatured();
        ListingActions.fetchNewArrivals();
        ListingActions.fetchMostPopular();
    },

    render: function () {
        var isSearching = this.isSearching();
        var isBrowsing = this.isBrowsing();

        /*jshint ignore:start */
        return (
            <div>
                <NavBar />
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="fa fa-search"></i>
                            <input
                                ref="search" type="text" className="form-control" placeholder="Enter search term" value={ this.state.query }
                                onChange={ this.onSearchInputChange } />
                        </div>
                    </form>
                </Header>
                <div id="discovery">
                    <Sidebar
                        ref="sidebar"
                        isSearching= { isSearching }
                        system={ this.props.system }
                        onGoHome= { this.reset }
                        onFilterChange= { this.search } />
                    <section className="content">
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
        ListingActions.search(
            _.assign({
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
                    { ListingTile.fromArray(this.state.newArrivals) }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    },

    handleLoadMore: function(){
        this.setState({
            mostPopularTiles: this.state.mostPopularTiles += 4,
        });
    },

    renderMostPopular: function () {
        if(!this.state.mostPopular.length) {
            return;
        }

        var InfiniTiles = ListingTile.renderLimitedTiles(this.state.mostPopularTiles, this.state.mostPopularMax, this.state.mostPopular);

        /*jshint ignore:start */
        return (
            <section className="Discovery__MostPopular">
                <h4>Most Popular</h4>
                <ul className="infiniteScroll">
                    { InfiniTiles }
                </ul>
                <div className="text-center">
                    <button onClick={ this.handleLoadMore } className="btn btn-default loadMoreBtn">Load More</button>
                </div>
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
                    { ListingTile.fromArray(this.state.searchResults) }
                </ul>
            </section>
        );
        /*jshint ignore:end */
    }

});

module.exports = Discovery;
