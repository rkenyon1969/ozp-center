/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var ActionMenu = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <div className="MyListingTile__actionMenu">
                <button class="MyListingTile__actionMenuToggle"></button>
                //TODO fill in hrefs
                <ul>
                    <li><a className="feedback" href="">Read Feedback</a></li>
                    <li><a href="review">Review</a></li>
                    <li><a href="edit">Edit</a></li>
                    <li><a href="preview">Preview</a></li>
                    <li><a href="delete">Delete</a></li>
                </ul>
            </div>
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
        return this.transferPropsTo(
            <span className={className} />
        );
        /* jshint ignore:end */
    }
});

var InfoBar = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListingTile__infoBar">
                <ListingStatus listing={listing} />
                <h4>{listing.title}</h4>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return this.transferPropsTo(
            <li className="MyListingTile">
                <ActionMenu listing={listing} />
                <Link to="quickview-overview" params={{listingId: listing.id()}}>
                    <img src={listing.imageLargeUrl} />
                </Link>
                <InfoBar listing={listing} />
            </li>
        );
        /* jshint ignore:end */
    }
});
