'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_');

// actions
var ListingActions = require('../../actions/ListingActions');

// component dependencies
var NavBar = require('../NavBar/index.jsx');
var Header = require('../header/index.jsx');
var Sidebar = require('./Sidebar.jsx');
var ListingTile = require('./ListingTile.jsx');
var FeaturedListings = require('./FeaturedListings.jsx');
var Carousel = require('../carousel/index.jsx');

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

        return (
            <div>
                <NavBar />
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="icon-search"></i>
                            <input ref="search" type="text" className="form-control"
                                placeholder="Search"
                                value={ this.state.queryString || ''}
                                onChange={ this.onSearchInputChange } />

                            <i className="icon-cross" onClick={this.reset}></i>
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
                </div>
            </div>
        );
    },

    componentDidUpdate: function(oldProps, oldState) {
        if (oldState.queryString !== this.state.queryString) {
            this.search();
        }
    },

    onStoreChange: function () {
        this.setState(this.getInitialState());
    },

    onSearchInputChange: function (evt) {
        this.setState({
            queryString: evt.target.value
        });
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
    },

    search: _.debounce(function () {
        ListingActions.search(
            _.assign({
                queryString: this.state.queryString
            }, this.refs.sidebar.state.selectedFilters)
        );
    }, 500),

    renderFeaturedListings: function () {
        if(!this.state.featured.length) {
            return;
        }

        return (
            <FeaturedListings
                listings={ this.state.featured } />
        );
    },

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

        return (
            <section className="Discovery__NewArrivals">
                <h4>New Arrivals</h4>
                <Carousel className="new-arrival-listings">
                    { ListingTile.fromArray(this.state.newArrivals) }
                </Carousel>
            </section>
        );
    },

    handleLoadMore: function(){
        this.setState({
            mostPopularTiles: this.state.mostPopularTiles += 12
        });
    },

    renderMostPopular: function () {
        if(!this.state.mostPopular.length) {
            return;
        }

        var InfiniTiles = ListingTile.renderLimitedTiles(this.state.mostPopularTiles, this.state.mostPopular);

        var LoadMore = (this.state.mostPopularTiles >= this.state.mostPopular.length) ?
            '' :
            <button onClick={ this.handleLoadMore } className="btn btn-default loadMoreBtn">Load More</button>;

        return (
            <section className="Discovery__MostPopular">
                <h4>Most Popular</h4>
                <ul className="infiniteScroll">
                    { InfiniTiles }
                </ul>
                <div className="text-center">
                    { LoadMore }
                </div>
            </section>
        );
    },

    renderSearchResults: function () {
        return (
            <section className="Discovery__SearchResults">
                <h4>Search Results</h4>
                <ul className="list-unstyled listings-search-results">
                    { ListingTile.fromArray(this.state.searchResults) }
                </ul>
            </section>
        );
    }

});

module.exports = Discovery;
