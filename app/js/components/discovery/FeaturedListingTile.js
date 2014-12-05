'use strict';

var React = require('react');
var { Navigation } = require('react-router');

var State = require('../../mixins/ActiveStateMixin');

var FeaturedListingTile = React.createClass({

    mixins: [ Navigation, State ],

    render: function () {
        var { key, listing } = this.props;
        var image = listing.imageXlargeUrl;
        var href = this.makeHref(this.getActiveRoutePath(), null, {
            listing: listing.id,
            action: 'view',
            tab: 'overview'
        });

        /*jshint ignore:start */
        return (
            <li className="listing SearchListingTile SearchListingTile--featured">
                <a href={href}>
                    <img src={image} />
                </a>
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = FeaturedListingTile;
