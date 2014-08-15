/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');

// actions
var fetchNewArrivals = require('../../actions/ListingActions').fetchNewArrivals;
var fetchMostPopular = require('../../actions/ListingActions').fetchMostPopular;

// component dependencies
var Header = require('../header');
var ListingTile = require('./ListingTile');
var Carousel = require('../carousel');

// store dependencies
var DiscoveryPageStore = require('../../stores/DiscoveryPageStore');

// component definition
var Search = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function () {
        // fetch data when instantiated
        fetchNewArrivals();
        fetchMostPopular();

        return this.getState();
    },

    getState: function () {
        return {
            newArrivals: DiscoveryPageStore.getNewArrivals(),
            mostPopular: DiscoveryPageStore.getMostPopular()
        };
    },

    _onChange: function () {
        this.setState(this.getState());
    },

    componentDidMount: function() {
        this.listenTo(DiscoveryPageStore, this._onChange);
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control" placeholder="Search..." />
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
                                <li className="facet-group-item">Health and Fitness
</li>
                                <li className="facet-group-item">Media and Video</li>
                                <li className="facet-group-item">News</li>
                                <li className="facet-group-item">Productivity</li>
                                <li className="facet-group-item">Tools</li>
                            </ul>
                        </ul>
                    </aside>
                    <section>
                        { this.renderNewArrivals() }
                        { this.renderMostPopular() }
                    </section>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

        /*jshint ignore:start */
        var newArrivals = this.state.newArrivals.map(function (listing) {
            return <ListingTile listing={listing} />
        });

        return (
            <section>
                <h4>New Arrivals</h4>
                <Carousel>
                    { newArrivals }
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
        var mostPopular = this.state.mostPopular.map(function (listing) {
            return <ListingTile listing={listing} />
        });

        return (
            <section>
                <h4>Most Popular</h4>
                <Carousel>
                    { mostPopular }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    }

});

module.exports = Search;