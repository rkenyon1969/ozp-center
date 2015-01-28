'use strict';

var React = require('react');
var moment = require('moment');
var { Link, Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');

var ActionMenu = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        /* jshint ignore:start */

        //TODO fill in hrefs
        var listing = this.props.listing,
            activeRoutePath = this.getActiveRoutePath(),
            overviewHref = this.makeHref(activeRoutePath, this.getParams(), {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            }),
            deleteHref = this.makeHref(activeRoutePath, this.getParams(), {
                listing: listing.id,
                action: 'delete'
            }),
            feedbackHref = this.makeHref(activeRoutePath, this.getParams(), {
                listing: listing.id,
                action: 'feedback'
            }),
            linkParams = {listingId: listing.id},
            edit = <li key="edit"><Link to="edit" params={linkParams}>Edit</Link></li>,
            preview = <li key="preview"><a href={overviewHref}>Preview</a></li>,
            del = <li key="del"><a href={deleteHref}>Delete</a></li>,
            view = <li key="view"><a href={overviewHref}>View</a></li>,
            feedback = <li key="feedback"><a href={feedbackHref}>Read Feedback</a></li>,
            links,
            approvalStatus = listing.approvalStatus;

        switch (approvalStatus) {
            case 'APPROVED':
                links = [edit, view, del];
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
            <label className="AdminOwnerListingTile__actionMenu">
                <input type="checkbox" />
                <span className="AdminOwnerListingTile__actionMenuButton" />
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
            <div className="approvalStatus"></div>
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
            <div className="approvalDate">{approvalDateString}</div>
        );
        /* jshint ignore:end */
    }
});

var InfoBar = React.createClass({
    render: function () {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <h5 className="AdminOwnerListingTile__infoBar">
                <ListingStatus listing={listing} />
                <p className="title">{listing.title}</p>
                <ApprovalDate listing={listing} />
            </h5>
        );
        /* jshint ignore:end */
    }
});

var AdminOwnerListingTile = React.createClass({

    mixins: [ Navigation, ActiveState ],

    statics: {
        fromArray: function (array) {
            /* jshint ignore:start */
            return array.map((listing) => <AdminOwnerListingTile listing={listing} key={listing.id} />);
            /* jshint ignore:end  */
        }
    },

    render: function () {
        var listing = this.props.listing,
            overview = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            }),
            approvalStatus = listing.approvalStatus,
            approvalStatusClasses = {};
        if(listing.view === 'adminView') {
            approvalStatusClasses = {
                'draft': approvalStatus === 'IN_PROGRESS',
                'pending': approvalStatus === 'PENDING',
                'needs-action': approvalStatus === 'APPROVED_ORG',
                'published': approvalStatus === 'APPROVED',
                'rejected': approvalStatus === 'REJECTED',
                'AdminOwnerListingTile': true
            };
        } else if(listing.view === 'orgView') {
            approvalStatusClasses = {
                'draft': approvalStatus === 'IN_PROGRESS',
                'pending': approvalStatus === 'APPROVED_ORG',
                'needs-action': approvalStatus === 'PENDING',
                'published': approvalStatus === 'APPROVED',
                'rejected': approvalStatus === 'REJECTED',
                'AdminOwnerListingTile': true
            };
        } else {
            approvalStatusClasses = {
              'draft': approvalStatus === 'IN_PROGRESS',
              'pending': approvalStatus === 'PENDING' || approvalStatus === 'APPROVED_ORG',
              'needs-action': approvalStatus === 'REJECTED',
              'published': approvalStatus === 'APPROVED',
              'AdminOwnerListingTile': true
            };
        }
        var classSet = React.addons.classSet(approvalStatusClasses);


        /* jshint ignore:start */
        return (
            <li className={classSet}>
                <ActionMenu listing={listing} />
                <a href={overview}>
                    <img className="AdminOwnerListingTile__img" src={listing.imageLargeUrl} />
                </a>
                <InfoBar listing={listing} />
            </li>
        );
        /* jshint ignore:end */
    }
});

module.exports = AdminOwnerListingTile;
