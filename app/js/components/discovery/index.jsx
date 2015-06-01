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


var FILTERS = ['categories', 'type', 'agency'];

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
            type: this.state ? this.state.type : [],
            agency: this.state ? this.state.agency : [],
            nextOffset: DiscoveryPageStore.getNextOffset(),
            currentOffset: this.state ? this.state.currentOffset : 0
        };
    },

    onSearchInputChange(evt) {
        this.setState({
            queryString: evt.target.value,
            currentOffset: 0
        });
    },

    onCategoryChange(categories) {
        this.setState({ categories, currentOffset: 0 });
    },

    onTypeChange(type) {
        this.setState({ type, currentOffset: 0 });
    },

    onOrganizationChange(agency) {
        this.setState({ agency, currentOffset: 0 });
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.queryString !== prevState.queryString) {
            this.debounceSearch();
        }
        else if(!_.isEqual(this.state.categories, prevState.categories) ||
            !_.isEqual(this.state.type, prevState.type) ||
            !_.isEqual(this.state.agency, prevState.agency) ||
            !_.isEqual(this.state.currentOffset, prevState.currentOffset)) {
            this.search();
        }
    },

    componentWillMount() {
        this.listenTo(DiscoveryPageStore, this.onStoreChange);

        // Reload when a new review is added
        this.listenTo(ListingActions.saveReviewCompleted, ListingActions.fetchStorefrontListings);

        // fetch data when instantiated
        ListingActions.fetchStorefrontListings();
    },

    componentWillUnmount: function(){
        $(this.refs.form.getDOMNode()).unbind('submit', false);
    },

    render: function () {
        var isSearching = this.isSearching();
        var isBrowsing = this.isBrowsing();

        return (
            <div>
                <NavBar />
                <Header>
                    <form className="navbar-form navbar-left" ref="form" role="search">
                        <div className="form-group Search">
                            <i className="icon-search"></i>

                            <input ref="search" type="text" className="form-control"
                                placeholder="Search"
                                value={ this.state.queryString || ''}
                                onChange={ this.onSearchInputChange } />

                            <i className="icon-cross-14-grayDark clearButton" onClick={this.reset}></i>
                        </div>
                        <Types value={this.state.type} onChange={this.onTypeChange} />
                        <Organizations value={this.state.agency} onChange={this.onOrganizationChange} />
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


    componentDidMount(){
        $(this.refs.form.getDOMNode()).submit((e)=>e.preventDefault());
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
            queryString: '',
            currentOffset: 0
        });
    },

    debounceSearch: _.debounce(function () {
        this.search();
    }, 500),

    search() {
        var { type, categories, agency } = this.state;
        var combinedObj = _.assign(
            { queryString: this.state.queryString, offset: this.state.currentOffset },
            { type, categories, agency });
        ListingActions.search(_.assign(combinedObj));
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

    handleMoreSearch() {
        this.setState({
            currentOffset: this.state.nextOffset
        });
    },

    renderSearchResults() {
        var results = this.state.searchResults.length > 0 ? ListingTile.fromArray(this.state.searchResults) : <p>No results found.</p>;
        var MoreSearch = (this.state.nextOffset) ?
            <button onClick={ this.handleMoreSearch } className="btn btn-default loadMoreBtn">Load More</button> :
            '';

        return (
            <section className="Discovery__SearchResults">
                <h4>Search Results</h4>
                <ul className="list-unstyled listings-search-results">
                    { results }
                </ul>
                <div className="text-center">
                    { MoreSearch }
                </div>
            </section>
        );
    }

});

module.exports = Discovery;
