'use strict';

var React = require('react');
var moment = require('moment');
var { UserRole } = require('ozp-react-commons/constants');

var { Link, Navigation } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');

var ListingActions = require('../../actions/ListingActions');

var ProfileLink = require('../profile/ProfileLink.jsx');

var ActionMenu = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {

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
            edit = <Link key="link" to="edit" params={linkParams} title="Edit"><i className="icon-pencil-12-blueDark"/></Link>,
            preview = <a key="prev" href={overviewHref} title="Preview"><i className="icon-eye-12-blueDark"/></a>,
            del = <a key="del" href={deleteHref} title="Delete"><i className="icon-trash-12-blueDark"/></a>,
            view = <a key="view" href={overviewHref} title="View"><i className="icon-eye-12-blueDark"/></a>,
            feedback = <a key="feedback" href={feedbackHref} title="Feedback"><i className="icon-feedback-12-blueDark"/></a>,
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
                /* falls through */
            default:
                links = [edit, preview, del];
        }

        //use hidden checkbox to manage menu toggle state
        return (
            <label className="AdminOwnerListingTable__actionMenu">
                {links}
            </label>
        );
    }
});

var ListingRow = React.createClass({

    mixins: [ Navigation, ActiveState ],

    propTypes: {
        role: React.PropTypes.oneOf([UserRole.ADMIN, UserRole.ORG_STEWARD, null]),
        listing: React.PropTypes.object,
        saveKey: React.PropTypes.string.isRequired,
    },

    statics: {
        fromArray: function (array, role, saveKey) {
            return array.map( (listing) =>
                <ListingRow className="listingRow" listing={listing} key={"listing"+listing.id} role={role} saveKey={saveKey}/>
            );
        },

        filterBySearch: function (listings, searchKey) {

            return listings.filter( function (listing) {

                var key = String(searchKey).toLowerCase(),
                    title = String(listing.title).toLowerCase(),
                    inOwners = false;

                if (title.indexOf(key) >= 0) {
                    return true;
                }

                listing.owners.forEach( function (owner) {
                    var name = String(owner.displayName).toLowerCase();
                    if (name.indexOf(key) >= 0) {
                        inOwners = true;
                    }
                });

                if (inOwners) {
                    return true;
                }

                return false;
            });
        },

        sortListings: function (listings, sortKey) {
            var key = sortKey;
            return listings.sort( function (a,b) {
                var aValue,
                    bValue,
                    baseVal = "";
                switch (key){//sort status is using backend names not front end names.
                case "name":
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case "!name":
                    bValue = a.title.toLowerCase();
                    aValue = b.title.toLowerCase();
                    break;
                case "owner":
                    aValue = a.owners[0].displayName.toLowerCase();
                    bValue = b.owners[0].displayName.toLowerCase();
                    break;
                case "!owner":
                    bValue = a.owners[0].displayName.toLowerCase();
                    aValue = b.owners[0].displayName.toLowerCase();
                    break;
                case "organization":
                    aValue = a.agency.toLowerCase();
                    bValue = b.agency.toLowerCase();
                    break;
                case "!organization":
                    bValue = a.agency.toLowerCase();
                    aValue = b.agency.toLowerCase();
                    break;
                case "status":
                    aValue = ListingRow.convertStatus(a.approvalStatus);
                    bValue = ListingRow.convertStatus(b.approvalStatus);
                    break;
                case "!status":
                    bValue = ListingRow.convertStatus(a.approvalStatus);
                    aValue = ListingRow.convertStatus(b.approvalStatus);
                    break;
                case "updated":
                    bValue = moment(a.editedDate).format('YYYY/MM/DD HH:mm:ss');
                    aValue = moment(b.editedDate).format('YYYY/MM/DD HH:mm:ss');
                    baseVal = 0;
                    break;
                case "!updated":
                    aValue = moment(a.editedDate).format('YYYY/MM/DD HH:mm:ss');
                    bValue = moment(b.editedDate).format('YYYY/MM/DD HH:mm:ss');
                    baseVal = 0;
                    break;
                case "enabled":
                    bValue = a.isEnabled;
                    aValue = b.isEnabled;
                    baseVal = false;
                    break;
                case "!enabled":
                    aValue = a.isEnabled;
                    bValue = b.isEnabled;
                    baseVal = false;
                    break;
                case "featured":
                    bValue = a.isFeatured;
                    aValue = b.isFeatured;
                    baseVal = false;
                    break;
                case "!featured":
                    aValue = a.isFeatured;
                    bValue = b.isFeatured;
                    baseVal = false;
                    break;
                default:
                    aValue = 0;
                    bValue = 0;
                }

                if (aValue === null) {
                    aValue = baseVal;
                }
                if (bValue === null) {
                    bValue = baseVal;
                }

                if (aValue > bValue) {
                    return 1;
                } else if (aValue < bValue) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },

        convertStatus: function (approvalStatus) {
            if (approvalStatus === "APPROVED") {
                return 5;
            } else if (approvalStatus === "APPROVED_ORG") {
                return 4;
            } else if (approvalStatus === "PENDING") {
                return 3;
            } else if (approvalStatus === "IN_PROGRESS") {
                return 1;
            } else if (approvalStatus === "REJECTED") {
                return 2;
            }
            return "";
        },
    },

    toggleFeatured: function (listing) {
        ListingActions.setFeatured(!listing.isFeatured, this.props.listing);
    },

    renderColumns: function () {
        var me = this,
            columns = sessionStorage.getItem(this.props.saveKey);
        if (columns && columns !== 'buffer') {
            return columns.split(',').map( function (column) {
                return me.renderColumn(column);
            });
        }
        return null;
    },

    renderColumn: function (column) {
        var { listing } = this.props;
        switch (column){
        case "name":
            var overview = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            });
            return  (
                <td className="titleColumn" key={"name"+listing.id}>
                    <a href={overview}>
                        {listing.title}
                    </a>
                </td>
            );
        case "owner":
            var listingOwners = listing.owners;
            if (!Array.isArray(listingOwners)) {
                listingOwners = [listingOwners];
            }
            var owners = listingOwners.map( function (owner, index) {
                if (index) {
                    return (
                        <span>
                            {"; "}
                            <ProfileLink profileId={owner.id}>
                                {owner.displayName}
                            </ProfileLink>
                        </span>
                    );
                } else {
                    return (
                        <span>
                            <ProfileLink profileId={owner.id}>
                                {owner.displayName}
                            </ProfileLink>
                        </span>
                    );
                }
            });
            return <td className="ownersColumn" key={"owner"+listing.id}>{owners}</td>;
        case "org":
            return <td className="organizationColumn" key={"org"+listing.id}>{listing.agency}</td>;
        case "comments":
            return <td className="commentsColumn" key={"comments"+listing.id}>{listing.whatIsNew}</td>;
        case "status":
            var approvalStatus="";
            if (listing.approvalStatus === "APPROVED") {
                approvalStatus = "Published";
            } else if (listing.approvalStatus === "APPROVED_ORG") {
                approvalStatus = "Org Approved";
            } else if (listing.approvalStatus === "PENDING") {
                approvalStatus = "Pending, Org";
            } else if (listing.approvalStatus === "IN_PROGRESS") {
                approvalStatus = "Draft";
            } else if (listing.approvalStatus === "REJECTED") {
                approvalStatus = "Returned";
            }
            return <td className="statusColumn" key={"status"+listing.id}>{approvalStatus}</td>;
        case "updated":
            var updated = moment(listing.editedDate).format('MM/DD/YY');
            return <td className="updatedColumn" key={"updated"+listing.id}>{updated}</td>;
        case "enabled":
            var enabled = listing.isEnabled ? "Enabled" : "Disabled";
            return <td className="enabledColumn" key={"enabled"+listing.id}>{enabled}</td>;
        case "featured":
            var featured;
            if (this.props.saveKey==="orgListings-tableView-columns"){
                featured = (listing.isEnabled && (listing.approvalStatus === "APPROVED")) ?
                    <input type={"checkbox"} disabled={true} checked={listing.isFeatured}/> :
                    <input disabled type={"checkbox"} checked={false}/> ;
            } else {
                featured = (listing.isEnabled && (listing.approvalStatus === "APPROVED")) ?
                    <input type={"checkbox"} onChange={this.toggleFeatured.bind(this,listing)} checked={listing.isFeatured}/> :
                    <input disabled type={"checkbox"} checked={false}/> ;
            }

            return <td className="featuredColumn" key={"featured"+listing.id}>{featured}</td>;
        case "actions":
            return <td className="actionsColumn" key={"actions"+listing.id}><ActionMenu listing={listing} /></td>;
        case "buffer":
            return <td className="bufferColumn" key={"buffer"+listing.id}/>;
        }
    },

    render: function () {
        return (
            <tr>
                {this.renderColumns()}
            </tr>
        );
    }
});

module.exports = ListingRow;
