'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ActionMenu = React.createClass({
    render: function() {
        /* jshint ignore:start */
        //TODO fill in hrefs
        //use hidden checkbox to manage menu toggle state
        return (
            <label className="MyListingTile__actionMenu">
                <input type="checkbox" />
                <span className="MyListingTile__actionMenuButton" />
                <ul>
                    <li><a className="feedback" href="">Read Feedback</a></li>
                    <li><a href="review">Review</a></li>
                    <li><a href="edit">Edit</a></li>
                    <li><a href="preview">Preview</a></li>
                    <li><a href="delete">Delete</a></li>
                </ul>
            </label>
        );
        /* jshint ignore:end */
    }
});

var ListingStatus = React.createClass({
    render: function() {
        var className;

        switch (this.props.listing.approvalStatus) {
            case 'IN_PROGRESS':
                className = 'draft';
                break;
            case 'PENDING':
                className = 'pending';
                break;
            case 'REJECTED':
                className = 'needs-action';
                break;
            case 'APPROVED':
                className = 'published';
                break;
            default:
                className = '';
        }

        /* jshint ignore:start */
        return (
            <span className={className} />
        );
        /* jshint ignore:end */
    }
});

var InfoBar = React.createClass({
    render: function() {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <div className="MyListingTile__infoBar">
                <ListingStatus listing={listing} />
                <h4>{listing.title()}</h4>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = React.createClass({
    render: function() {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <li className="MyListingTile">
                <ActionMenu listing={listing} />
                <Link to="quickview-overview" params={{listingId: listing.id()}}>
                    <img className="MyListingTile__img" src={listing.imageLargeUrl()} />
                </Link>
                <InfoBar listing={listing} />
            </li>
        );
        /* jshint ignore:end */
    }
});
