'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var _ = require('../../utils/_');
var {CENTER_URL} = require('ozp-react-commons/OzoneConfig');
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
var DetailedQuery = require('./DetailedQuery.jsx');

// store dependencies
var DiscoveryPageStore = require('../../stores/DiscoveryPageStore');


var FILTERS = ['categories', 'type', 'agency'];

var areFiltersApplied = (state) => {
    return _.reduce(FILTERS, function (memo, filter) {
        return memo || !!state[filter].length;
    }, false);
};

var Discovery = React.createClass({

    mixins: [ Router.State, Reflux.ListenerMixin ],

    getInitialState() {
        return {
            initCategories: [],
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
            currentOffset: this.state ? this.state.currentOffset : 0,
            limit: this.state ? this.state.limit : 24
        };
    },

    onSearchInputChange(evt) {
        this._searching = true;
        this.setState({
            queryString: evt.target.value,
            currentOffset: 0
        });
    },

    onCategoryChange(categories) {
        this._searching = true;
        this.setState({ categories, currentOffset: 0 });
    },

    onTypeChange(type) {
        this._searching = true;
        this.setState({ type, currentOffset: 0 });
    },

    onOrganizationChange(agency) {
        this._searching = true;
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

        // Notice when a search is finished
        this.listenTo(ListingActions.searchCompleted, this.onSearchCompleted);

        // Reload when a new review is added
        this.listenTo(ListingActions.saveReviewCompleted, ListingActions.fetchStorefrontListings);

        // fetch data when instantiated
        ListingActions.fetchStorefrontListings();

        if(this.context.getCurrentParams().categories){
          this.setState({initCategories: decodeURIComponent(this.context.getCurrentParams().categories).split('+')});
        }

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
                    <form className="col-xs-9 col-lg-10" ref="form" role="search">
			<div className="row">
		                <div className="form-group Search col-sm-6 col-xs-4">
		                    <i className="icon-search"></i>

		                    <input ref="search" type="text" className="form-control"
		                        placeholder="Search"
		                        value={ this.state.queryString || ''}
		                        onChange={ this.onSearchInputChange } />

		                    <i className="icon-cross-14-grayDark clearButton" onClick={this.reset}></i>
		                </div>
		                <Types value={this.state.type} onChange={this.onTypeChange} />
		                <Organizations value={this.state.agency} onChange={this.onOrganizationChange} />
                    	</div>
		    </form>
                </Header>
                <div id="discovery" className="row">
                    <Sidebar
			ref="sidebar"
                        isSearching= { isSearching }
                        initCategories = { this.state.initCategories ? this.state.initCategories : false }
                        categories={ this.props.system.categories }
                        onGoHome= { this.reset }
                        onChange= { this.onCategoryChange } />
                    <section className="content col-xs-9 col-lg-10">
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

        // If a search string is provided to us, load it into the search feild
        if(this.context.getCurrentParams().searchString){
          this._searching = true;
          this.setState({
            queryString: this.context.getCurrentParams().searchString,
            currentOffset: 0
          });
        }

        // If some categories, types, or orgs are provided, select them.
        if(this.context.getCurrentParams().categories){
          this.onCategoryChange(this.state.initCategories);
        }

        if(this.context.getCurrentParams().type){
          this.onTypeChange(decodeURIComponent(this.context.getCurrentParams().type).split('+'));
        }

        if(this.context.getCurrentParams().org){
          this.onOrganizationChange(decodeURIComponent(this.context.getCurrentParams().org).split('+'));
        }
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
        this._searching = true;
        this.setState({
            queryString: '',
            currentOffset: 0,
            type: [],
            agency: []
        });
    },

    debounceSearch: _.debounce(function () {
        this.search();
    }, 500),

    search() {
        $('body, html').scrollTop(0);
        var { type, agency } = this.state;
        var combinedObj = _.assign(
            { search: this.state.queryString,
              offset: this.state.currentOffset,
              category: this.state.categories,
              limit: this.state.limit
            },
            { type, agency });

        ListingActions.search(_.assign(combinedObj));
    },

    onSearchCompleted() {
        if(this.refs.shareResults){
          $(this.refs.shareResults.getDOMNode()).popover({
            html: true,
          });
        }
        this._searching = false;
        this.setState({
            lastSearchCompleted: Date.now()
        });
    },

    renderFeaturedListings() {
        if(!this.state.featured.length) {
            return;
        }

        return (
            <FeaturedListings key="FeaturedListings"
                listings={ this.state.featured } />
        );
    },

    renderNewArrivals() {
        if(!this.state.newArrivals.length) {
            return;
        }

        return (
            <section className="Discovery__NewArrivals" key="Discovery__NewArrivals">
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
            <section className="Discovery__MostPopular" key="Discovery__MostPopular">
                <h4>Most Popular</h4>
                <ul className="infiniteScroll row clearfix">
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
        var results = <h3 className="col-xs-12">Searching...</h3>;

        if (!this._searching) {
            results = this.state.searchResults.length > 0 ?
                ListingTile.fromArray(this.state.searchResults) :
                <h3 className="col-xs-12">No results found.</h3>;
        }

        var MoreSearch = (this.state.nextOffset && !this._searching) ?
            <button onClick={ this.handleMoreSearch } className="btn btn-default loadMoreBtn">Load More</button> :
            '';

        var searchLink = `${CENTER_URL}/#/home/${encodeURIComponent(this.state.queryString)}/${(this.state.categories.length) ? encodeURIComponent(this.state.categories.toString()).replace(/%2C/g,'+') : ''}/${(this.state.type.length) ? encodeURIComponent(this.state.type.toString()).replace(/%2C/g,'+') : ''}/${(this.state.agency.length) ? encodeURIComponent(this.state.agency.toString()).replace(/%2C/g,'+') : ''}`;
        return (
            <section className="Discovery__SearchResults">
                <h4>Search Results &nbsp;
                  <span tabIndex="0"
                    className="shareLink"
                    ref="shareResults"
                    data-toggle="popover"
                    title={"Share <span style='float: right' onclick=" + '$(this).parent().parent().popover("toggle")' + " class='icon-cross-14-grayDark'></span>"}
                    data-content={"Copy the URL and paste it anywhere to share. <br /><input class='shareResults' onclick='" + '$(this).focus();$(this).select();' + "' style='width: 100%' type='text' value=" + searchLink + "></input>"}>Share
                    &nbsp;<span className="icon-share-10-blueDark"></span>
                  </span>
                </h4>
                <p><DetailedQuery
                  onCategoryChange={this.onCategoryChange}
                  onTypeChange={this.onTypeChange}
                  onOrganizationChange={this.onOrganizationChange}
                  reset={this.reset}
                  data={this.state}
                  /></p>
                <ul className="list-unstyled listings-search-results row clearfix">
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
