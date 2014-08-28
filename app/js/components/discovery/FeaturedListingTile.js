/** @jsx React.DOM */
'use strict';

var React = require('react');
var IconRating = require('react-icon-rating');
var launch = require('../../actions/ListingActions').launch;

var ListingTile = React.createClass({

    render: function () {
        var listing = this.props.listing;

        var name = listing.title();
        var description = listing.description() && listing.description().substr(0, 140);
        var launchUrl = listing.launchUrl();
        var imageLargeUrl = listing.imageLargeUrl();
        var totalVotes = listing.totalVotes();
        var avgRate = listing.avgRate();
        var company = listing.company();

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile listing-tile-featured">
                <a href="javascript:;">
                    <img src={ imageLargeUrl } />
                </a>
            </li>
        );
        /*jshint ignore:end */
    },

    launch: function () {
        launch(this.props.listing);
    }

});

module.exports = ListingTile;