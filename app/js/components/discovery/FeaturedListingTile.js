'use strict';

var React = require('react');
var { Navigation } = require('react-router');

var ActiveState = require('../../mixins/ActiveStateMixin');

var FeaturedListingTile = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        var listing = this.props.listing;
        var image = listing.imageXlargeUrl;
        var href = this.makeHref(this.getActiveRoutePath(), null, {
            listing: listing.id,
            action: 'view',
            tab: 'overview'
        });

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile listing-tile-featured">
                <a href={href}>
                    <img src={image} />
                </a>
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = FeaturedListingTile;
