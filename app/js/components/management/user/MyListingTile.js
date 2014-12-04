'use strict';

var React = require('react');
var moment = require('moment');
var { Link, Navigation, CurrentPath } = require('react-router');

var ActiveState = require('../../../mixins/ActiveStateMixin');

var ActionMenu = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        /* jshint ignore:start */

        //TODO fill in hrefs
        var listing = this.props.listing,
            activeRoutePath = this.getActiveRoutePath(),
            overviewHref = this.makeHref(activeRoutePath, null, {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            }),
            editHref = this.makeHref(activeRoutePath, null, {
                listing: listing.id,
                action: 'edit'
            }),
            deleteHref = this.makeHref(activeRoutePath, null, {
                listing: listing.id,
                action: 'delete'
            }),
            feedbackHref = this.makeHref(activeRoutePath, null, {
                listing: listing.id,
                action: 'feedback'
            }),
            linkParams = {listingId: listing.id},
            review = <li><a href="review">Review</a></li>,
            edit = <li><Link to="edit" params={linkParams}>Edit</Link></li>,
            preview = <li><a href={overviewHref}>Preview</a></li>,
            del = <li><a href={deleteHref}>Delete</a></li>,
            view = <li><a href={overviewHref}>View</a></li>,
            disable = <li><a href="disable">Disable</a></li>,
            feedback = <li><a href={feedbackHref}>Read Feedback</a></li>,
            links,
            approvalStatus = listing.approvalStatus;

        switch (approvalStatus) {
            case 'APPROVED':
                links = [edit, view, disable, del];
                break;
            case 'APPROVED_ORG':
                links = [edit, preview, del];
                break;
            case 'PENDING':
                links = [edit, preview, del];
                break;
            case 'REJECTED':
                links = [edit, feedback, preview, del];
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
    render: function () {
        /* jshint ignore:start */
        return (
            <span className="MyListingTile__approvalStatus" />
        );
        /* jshint ignore:end */
    }
});

var ApprovalDate = React.createClass({
    render: function () {
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
    render: function () {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <h5 className="MyListingTile__infoBar">
                <span className="title">{listing.title}</span>
                <ListingStatus listing={listing} />
                <ApprovalDate listing={listing} />
            </h5>
        );
        /* jshint ignore:end */
    }
});

module.exports = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        var listing = this.props.listing,
            overview = this.makeHref(this.getActiveRoutePath(), null, {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            }),
            approvalStatus = listing.approvalStatus,
            classSet = React.addons.classSet({
                'draft': approvalStatus === 'IN_PROGRESS',
                'pending': approvalStatus === 'PENDING' || approvalStatus === 'APPROVED_ORG',
                'needs-action': approvalStatus === 'REJECTED',
                'published': approvalStatus === 'APPROVED',
                'MyListingTile': true
            });


        /* jshint ignore:start */
        return (
            <li className={classSet}>
                <ActionMenu listing={listing} />
                <a href={overview}>
                    <img className="MyListingTile__img" src={listing.imageLargeUrl} />
                </a>
                <InfoBar listing={listing} />
            </li>
        );
        /* jshint ignore:end */
    }
});
