/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var IconRating = require('../shared/IconRating');
var ProfileStore = require('../../stores/ProfileStore');
var ListingActions = require('../../actions/ListingActions');
var launch = ListingActions.launch;
var addToLibrary = ListingActions.addToLibrary;
var removeFromLibrary = ListingActions.removeFromLibrary;

var QuickviewHeader = React.createClass({

    propTypes: {
        listing: React.PropTypes.object,
        onCancel: React.PropTypes.func.isRequired
    },

    render: function () {
        var listing = this.props.listing;
        var title = listing.title();
        var avgRate = listing.avgRate();
        var image = listing.imageMediumUrl();
        var isListingInLibrary = ProfileStore.isListingInLibrary(listing.uuid());

        /* jshint ignore:start */
        return (
            <div className="quickview-header">
                <div className="quickview-header-info">
                    <button type="button" className="close" aria-hidden="true" onClick={ this.props.onCancel }>×</button>
                    <img className="listing-icon" src={ image } data-fallback="/store/images/types/3" />
                    <h3 className="listing-title" title={ title }>{ title }</h3>
                    <IconRating
                        className="icon-rating"
                        viewOnly
                        currentRating= { avgRate }
                        toggledClassName="fa fa-star"
                        untoggledClassName="fa fa-star-o"
                        halfClassName="fa fa-star-half-o" />
                </div>
                { this.renderActions() }
            </div>
        );
        /* jshint ignore:end */
    },

    renderActions: function () {
        var bookmarkBtnStyles = React.addons.classSet({
            'btn btn-default': true,
            'active': ProfileStore.isListingInLibrary(this.props.listing.uuid())
        });

        /* jshint ignore:start */
        return (
            <div className="btn-group quickview-header-actions">
                <button type="button" className="btn btn-default" onClick={ this.launch }><i className="fa fa-external-link"></i></button>
                <button type="button" className={ bookmarkBtnStyles } onClick={ this.addToLibrary }><i className="fa fa-bookmark"></i></button>
            </div>
        );
        /* jshint ignore:end */
    },

    launch: function () {
        launch(this.props.listing);
    },

    addToLibrary: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (ProfileStore.isListingInLibrary(this.props.listing.uuid())) {
            removeFromLibrary(this.props.listing);
        }
        else {
            addToLibrary(this.props.listing);
        }
    }

});

module.exports = QuickviewHeader;