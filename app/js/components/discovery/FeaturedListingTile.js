/** @jsx React.DOM */
'use strict';

var React = require('react');

var ListingTile = React.createClass({

    render: function () {
        var listing = this.props.listing;
        var image = listing.imageXlargeUrl();

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile listing-tile-featured">
                <a href="javascript:;">
                    <img src={ image } />
                </a>
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = ListingTile;
