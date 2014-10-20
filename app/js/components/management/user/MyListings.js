/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ListingTile = require('./ListingTile');

var MyListings = React.createClass({

    render: function () {
        var tiles = this.listings.map(function(listing) {
            /* jshint ignore:start */
            return (
                <ListingTile listing={listing} />
            );
            /* jshint ignore:end */
        });

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListings">
                <div className="MyListings__sidebar col-md-3">Sidebar</div>
                <ul className="MyListings__listings col-md-9">{tiles}</ul>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
