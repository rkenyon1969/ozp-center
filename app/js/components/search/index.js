/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');

// actions
var fetchNewArrivals = require('../../actions/ListingActions').fetchNewArrivals;
var fetchMostPopular = require('../../actions/ListingActions').fetchMostPopular;

// component dependencies
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
            <div id="search">
                <aside className="sidebar">
                    <ul className="list-unstyled">
                        <li>Home</li>
                        <li>New Arrivals</li>
                        <li>Most Popular</li>
                    </ul>
                </aside>
                <section>
                    { this.renderNewArrivals() }
                    { this.renderMostPopular() }
                </section>
                <div className="clearfix"></div>
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