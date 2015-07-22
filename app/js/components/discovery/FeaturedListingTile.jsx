'use strict';

var React = require('react');
var { Navigation } = require('react-router');

var State = require('../../mixins/ActiveStateMixin');

var FeaturedListingTile = React.createClass({

    mixins: [ Navigation, State ],

    render: function () {
        var { listing } = this.props;
        var image = listing.large_banner_icon.url; // jshint ignore:line
        var href = this.makeHref(this.getActiveRoutePath(), null, {
            listing: listing.id,
            action: 'view',
            tab: 'overview'
        });

        return (
            <li className="listing SearchListingTile SearchListingTile--featured">
                <a href={href}>
                    <img src={ image } />
                </a>
            </li>
        );
    }

});

module.exports = FeaturedListingTile;
