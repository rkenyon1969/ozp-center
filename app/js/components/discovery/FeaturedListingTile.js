/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var FeaturedListingTile = React.createClass({

    render: function () {
        var listing = this.props.listing;
        var imageLargeUrl = listing.imageLargeUrl();

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile listing-tile-featured">
                <Link to="quickview" params={{listingId: listing.id()}}>
                    <img src={ imageLargeUrl } />
                </Link>
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = FeaturedListingTile;