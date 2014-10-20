'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var FeaturedListingTile = React.createClass({

    render: function () {
        var listing = this.props.listing;
        var image = listing.imageXlargeUrl();

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile listing-tile-featured">
                <Link to="quickview-overview" params={{listingId: listing.id()}}>
                    <img src={ image } />
                </Link>
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = FeaturedListingTile;
