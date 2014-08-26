/** @jsx React.DOM */
'use strict';

var React   = require('react'),
    Reflux  = require('reflux');

// actions
var ListingActions      = require('../../actions/ListingActions'),
    fetchNewArrivals    = ListingActions.fetchNewArrivals,
    fetchMostPopular    = ListingActions.fetchMostPopular,
    search              = ListingActions.search;

// component dependencies
var Header      = require('../header'),
    ListingTile = require('./ListingTile'),
    Carousel    = require('../carousel'),
    Quickview   = require('../quickview');

// store dependencies
var DiscoveryPageStore = require('../../stores/DiscoveryPageStore');


// component definition
var Search = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function () {
        return {
            newArrivals: DiscoveryPageStore.getNewArrivals(),
            mostPopular: DiscoveryPageStore.getMostPopular(),
            searchResults: DiscoveryPageStore.getSearchResults(),
            selectedListing: null
        };
    },

    _onChange: function () {
        this.setState(this.getInitialState());
    },

    _onSearchInputChange: function () {
        var query = this.refs.search.getDOMNode().value;

        this.setState({ query: query });

        search({
            query: query
        });
    },

    componentWillMount: function () {
        // fetch data when instantiated
        fetchNewArrivals();
        fetchMostPopular();
    },

    componentDidMount: function() {
        this.listenTo(DiscoveryPageStore, this._onChange);
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.refs.quickview) {
            this.refs.quickview.refs.modal.open();
        }
    },

    render: function () {
        var searching = !!this.state.query;

        /*jshint ignore:start */
        return (
            <div>
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="fa fa-search"></i>
                            <input ref="search" type="text" className="form-control" placeholder="Search..." onChange={this._onSearchInputChange} />
                        </div>
                    </form>
                </Header>
                <div id="discovery">
                    <aside className="sidebar">
                        <ul className="list-unstyled facet-group">
                            <li className="active facet-group-item">Home</li>
                        </ul>
                        <ul className="list-unstyled facet-group">
                            <li className=" facet-group-item">Categories</li>
                            <ul className="list-unstyled">
                                <li className="facet-group-item">Books and Reference</li>
                                <li className="facet-group-item">Business</li>
                                <li className="facet-group-item">Communication</li>
                                <li className="facet-group-item">Education</li>
                                <li className="facet-group-item">Entertainment</li>
                                <li className="facet-group-item">Finance</li>
                                <li className="facet-group-item">Health and Fitness</li>
                                <li className="facet-group-item">Media and Video</li>
                                <li className="facet-group-item">News</li>
                                <li className="facet-group-item">Productivity</li>
                                <li className="facet-group-item">Tools</li>
                            </ul>
                        </ul>
                    </aside>
                    <section>
                        {
                            searching ?
                                this.renderSearchResults() :
                                [ this.renderNewArrivals(), this.renderMostPopular() ]
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

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

        /*jshint ignore:start */
        return (
            <section>
                <h4>New Arrivals</h4>
                <Carousel>
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
                <Carousel>
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
                    me.setState({ selectedListing: null })
                }}
            />
        );
        /*jshint ignore:end */
    },

    openQuickview: function (listing) {
        this.setState({
            selectedListing: listing
        });
    }

});

module.exports = Search;