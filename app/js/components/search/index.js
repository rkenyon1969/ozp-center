/** @jsx React.DOM */
var React = require('react/addons');
var ListingTile = require('./ListingTile');
var NewArrivals = require('../../data/NewArrivals');
var MostPopular = require('../../data/MostPopular');

var Search = React.createClass({

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
        var newArrivals = NewArrivals.map(function (listing) {
            return <ListingTile listing={listing} />
        });

        return (
            <section>
                <h4>New Arrivals</h4>
                <ul className="list-unstyled listings">
                    { newArrivals }
                </ul>
            </section>
        );
    },

    renderMostPopular: function () {
        var mostPopular = MostPopular.map(function (listing) {
            return <ListingTile listing={listing} />
        });

        return (
            <section>
                <h4>Most Popular</h4>
                <ul className="list-unstyled listings">
                    { mostPopular }
                </ul>
            </section>
        );
    }

});

module.exports = Search;