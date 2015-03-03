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
var Types = require('./Types.jsx');
var Organizations = require('./Organizations.jsx');

// store dependencies
var DiscoveryPageStore = require('../../stores/DiscoveryPageStore');


var FILTERS = ['categories', 'types', 'organizations'];

var areFiltersApplied = (state) => {
    return _.reduce(FILTERS, function (memo, filter) {
        return memo || !!state[filter].length;
    }, false);
};

var Discovery = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState() {
        return {
            featured: DiscoveryPageStore.getFeatured(),
            newArrivals: DiscoveryPageStore.getNewArrivals(),
            mostPopular: DiscoveryPageStore.getMostPopular(),
            searchResults: DiscoveryPageStore.getSearchResults(),
            mostPopularTiles: 12,
            queryString: this.state ? this.state.queryString : '',
            categories: this.state ? this.state.categories : [],
            types: this.state ? this.state.types : [],
            organizations: this.state ? this.state.organizations : []
        };
    },

    onSearchInputChange(evt) {
        this.setState({
            queryString: evt.target.value
        });
    },

    onCategoryChange(categories) {
        this.setState({ categories });
    },

    onTypeChange(types) {
        this.setState({ types });
    },

    onOrganizationChange(organizations) {
        this.setState({ organizations });
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.queryString !== prevState.queryString) {
            this.debounceSearch();
        }
        else if(!_.isEqual(this.state.categories, prevState.categories) ||
            !_.isEqual(this.state.types, prevState.types) ||
            !_.isEqual(this.state.organizations, prevState.organizations)) {
            this.search();
        }
    },

    componentWillMount() {
        this.listenTo(DiscoveryPageStore, this.onStoreChange);

        // fetch data when instantiated
        ListingActions.fetchFeatured();
        ListingActions.fetchNewArrivals();
        ListingActions.fetchMostPopular();
    },

    render() {
        var isSearching = this.isSearching();
        var isBrowsing = this.isBrowsing();

        return (
            <div>
                <NavBar />
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group Search">
                            <i className="icon-search"></i>
                            
                            <input ref="search" type="text" className="form-control"
                                placeholder="Search"
                                value={ this.state.queryString || ''}
                                onChange={ this.onSearchInputChange } />

                            <i className="icon-cross" onClick={this.reset}></i>
                        </div>
                        <Types value={this.state.types} onChange={this.onTypeChange} />
                        <Organizations value={this.state.organizations} onChange={this.onOrganizationChange} />
                    </form>
                </Header>
                <div id="discovery">
                    <Sidebar
                        ref="sidebar"
                        isSearching= { isSearching }
                        categories={ this.props.system.categories }
                        onGoHome= { this.reset }
                        onChange= { this.onCategoryChange } />
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

    onStoreChange() {
        this.setState(this.getInitialState());
    },

    isSearching() {
        return !!this.state.queryString;
    },

    isBrowsing() {
        return (this.isSearching() || areFiltersApplied(this.state));
    },

    reset() {
        this.setState({
            queryString: ''
        });
    },

    debounceSearch: _.debounce(function () {
        this.search();
    }, 500),

    search() {
        var { types, categories, organizations } = this.state;
        ListingActions.search(
            _.assign({
                queryString: this.state.queryString
            }, { types, categories, organizations })
        );
    },

    renderFeaturedListings() {
        if(!this.state.featured.length) {
            return;
        }

        return (
            <FeaturedListings
                listings={ this.state.featured } />
        );
    },

    renderNewArrivals() {
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

    handleLoadMore() {
        this.setState({
            mostPopularTiles: this.state.mostPopularTiles += 12
        });
    },

    renderMostPopular() {
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

    renderSearchResults() {
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
