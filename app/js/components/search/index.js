/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');

var ListingTile = require('./ListingTile');
var Carousel = require('../carousel');

var ListingStore = require('../../stores/ListingsStore');

var Search = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function () {
        return this.getState();
    },

    getState: function () {
        return {
            newArrivals: ListingStore.getNewArrivals(),
            mostPopular: ListingStore.getMostPopular()
        };
    },

    _onChange: function () {
        this.setState(this.getState());
    },

    componentDidMount: function() {
        this.listenTo(ListingStore, this._onChange);
    },

    render: function () {
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
    },

    renderNewArrivals: function () {
        if(!this.state.newArrivals.length) {
            return;
        }

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
    },

    renderMostPopular: function () {
        if(!this.state.mostPopular.length) {
            return;
        }

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
    }

});

module.exports = Search;