'use strict';

var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var Link = Router.Link;

var ActionMenu = React.createClass({
    render: function() {
        /* jshint ignore:start */

        //TODO fill in hrefs
        var listing = this.props.listing,
            feedbackHref = "#/user-management/listings/feedback/" + listing.id(),
            deleteHref = "#/user-management/listings/delete/" + listing.id(),
            review = <li><a href="review">Review</a></li>,
            edit = <li><a href="edit">Edit</a></li>,
            preview = <li><a href={listing.launchUrl()} target="_blank">Preview</a></li>,
            del = <li><a href={deleteHref}>Delete</a></li>,
            view = <li><a href={listing.launchUrl()} target="_blank">View</a></li>,
            disable = <li><a href="disable">Disable</a></li>,
            readFeedback = <li><a href={feedbackHref}>Read Feedback</a></li>,
            links,
            approvalStatus = listing.approvalStatus();

        switch (approvalStatus) {
            case 'APPROVED':
                links = [edit, view, disable, del];
                break;
            case 'PENDING':
                links = [edit, preview, del];
                break;
            case 'REJECTED':
                links = [edit, readFeedback, preview, del];
                break;
            case 'DRAFT':
            default:
                links = [edit, preview, del];
        }

        //use hidden checkbox to manage menu toggle state
        return (
            <label className="MyListingTile__actionMenu">
                <input type="checkbox" />
                <span className="MyListingTile__actionMenuButton" />
                <ul>{links}</ul>
            </label>
        );
        /* jshint ignore:end */
    }
});

var ListingStatus = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <span className="MyListingTile__approvalStatus" />
        );
        /* jshint ignore:end */
    }
});

var ApprovalDate = React.createClass({
    render: function() {
        var approvalDate = this.props.listing.approvalDate,
            approvalDateString = moment(approvalDate).format('MM/DD/YY');

        /* jshint ignore:start */
        return (
            <span className="MyListingTile__approvalDate">{approvalDateString}</span>
        );
        /* jshint ignore:end */
    }
});

var InfoBar = React.createClass({
    render: function() {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <h5 className="MyListingTile__infoBar">
                <span className="title">{listing.title()}</span>
                <ListingStatus listing={listing} />
                <ApprovalDate listing={listing} />
            </h5>
        );
        /* jshint ignore:end */
    }
});

module.exports = React.createClass({
    render: function() {
        var listing = this.props.listing,
            approvalStatus = listing.approvalStatus(),
            classSet = React.addons.classSet({
                'draft': approvalStatus === 'IN_PROGRESS',
                'pending': approvalStatus === 'PENDING',
                'needs-action': approvalStatus === 'REJECTED',
                'published': approvalStatus === 'APPROVED',
                'MyListingTile': true
            });


        /* jshint ignore:start */
        return (
            <li className={classSet}>
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
