'use strict';
var React = require('react');
var actions = require('../../constants/index').listingActions;
var uuid = require('../../utils/uuid');
var timeAgo = require('../../utils/timeAgo');
var fieldName = require('../../constants/index').listingFieldName;
var { Link, Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');

var SeeListingSubmission = React.createClass({
    render: function() {
        var href = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
            listing: this.props.changeLog.listing.id,
            action: 'view',
            tab: 'overview'
        });
        return (
            /* jshint ignore:start */
            <a href={href}>See {this.props.changeLog.listing.title} Submission <i className="fa fa-angle-right"></i></a>
            /* jshint ignore:end */
        );
    }
});

var AuthorLink = React.createClass({
    mixins: [ActiveState],

    propTypes: {
        author: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            activeRoute: this.getActiveRoute(),
            routeParams: this.getParams()
        };
    },

    render: function() {
        var author = this.props.author,
            queryParams = {profile: author.id};

        /* jshint ignore:start */
        return (
            <Link to={this.state.activeRoute.name} params={this.state.routeParams}
                    query={queryParams}>
                {author.displayName}
            </Link>
        );
        /* jshint ignore:end */
    }
});

var ActionChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' ' + changeLog.action.toLowerCase() + ' ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var RelatedToItemChangeLog = React.createClass({
    getRelatedItemsAsString: function (changeLog) {
        if(changeLog.relatedItems === undefined) {
            return;
        }

        return changeLog.relatedItems.map(function (item, i) {
            if (i === changeLog.relatedItems.length - 1 && i !== 0) {
                return 'and ' + item.title;
            }
            return item.title;
        }).join(', ');
    },

    render: function() {
        var changeLog = this.props.changeLog;
        var action = (changeLog.action === 'REMOVE_RELATED_ITEMS')? ' removed ' : ' added ';
        var listingChange = ' ' + action + (this.props.showListingName ? changeLog.listing.title : 'the listing') + ' as a requirement to ' + this.getRelatedItemsAsString(changeLog);
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var RelatedItemChangeLog = React.createClass({

    getRelatedItemsAsString: function (changeLog) {
        if(changeLog.relatedItems === undefined) {
            return;
        }

        return changeLog.relatedItems.map(function (item, i) {
            if (i === changeLog.relatedItems.length - 1 && i !== 0) {
                return 'and ' + item.title;
            }
            return item.title;
        }).join(', ');
    },

    render: function() {
        var changeLog = this.props.changeLog;
        var action = (changeLog.action === 'REMOVE_RELATED_TO_ITEM')? ' removed ' : ' added ';
        var listingChange = ' ' + action + this.getRelatedItemsAsString(changeLog) + ' as a requirement to ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var SetToChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' set ' + (this.props.showListingName ? changeLog.listing.title : 'the listing') + ' to ' + changeLog.action.toLowerCase();
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var RejectedChangeLog = React.createClass({
    toggleIcon: function (e) {
        $(e.currentTarget).children('i').toggleClass('fa-minus fa-plus');
    },
    render: function () {
        var changeLog = this.props.changeLog;
        var details = 'Details: ' + changeLog.rejectionDescription;
        var id = uuid();

        /* jshint ignore:start */
        return (
            <div>
                <div>
                    <AuthorLink author={changeLog.author} />
                    <span> rejected </span>
                    { (this.props.showListingName ? changeLog.listing.title : 'the listing') }
                </div>,
                <a href="javascript:;" data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                    <i className="fa fa-plus"></i> Feedback
                </a>,
                <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                    <li>{ details }</li>
                </ul>
            </div>
        );
        /* jshint ignore:end */
    }
});

var OrgApprovalChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' approved ' + (this.props.showListingName ? changeLog.listing.title : 'the listing') + ' for ' + changeLog.listing.agency;
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var ModifiedChangeLog = React.createClass({
    toggleIcon: function (e) {
        $(e.currentTarget).children('i').toggleClass('fa-minus fa-plus');
    },

    render: function () {
        var changeLog = this.props.changeLog;
        var details = [], extendedDetails = [];
        changeLog.changeDetails.forEach(function (changeDetail, i) {
            var changedField = fieldName[changeDetail.fieldName] || changeDetail.fieldName;

            if (i === changeLog.changeDetails.length - 1 && i !== 0) {
                details[i] =  'and ' + changedField;
            }
            else {
                details[i] = changedField;
            }

            /* jshint ignore:start */
            extendedDetails[i] = (
                <li>{ changedField } changed from&nbsp;
                    <span className="OldValue">{ changeDetail.oldValue }</span>
                    &nbsp;to&nbsp;
                    <span className="NewValue">{ changeDetail.newValue }</span>
                </li>
            );
            /* jshint ignore:end */
        });

        if (details.length) {
            details = details.join(', ');
            var id = uuid();

           /* jshint ignore:start */
            return (
                <div>
                    <div>
                        <AuthorLink author={changeLog.author} /> modified { details }
                    </div>
                    <a href="javascript:;" data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                        <i className="fa fa-plus"></i> See {this.props.showListingName ? changeLog.listing.title : 'the listing'} changes
                    </a>
                    <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                        { extendedDetails }
                    </ul>
                </div>
            );
            /* jshint ignore:end */
        } else {
            /* jshint ignore:start */
            return (
                <div>
                    <AuthorLink author={changeLog.author} />
                    <span> modified </span>
                    { this.props.showListingName ? changeLog.listing.title : 'the listing' }
                </div>
            );
            /* jshint ignore:end */
        }
    }
});

var TagChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var action = (changeLog.action === 'TAG_DELETED')? 'removed' : ' added ';
        var location = (changeLog.action === 'TAG_DELETED')? 'from' : ' to ';
        var listingChange = ' ' + action + 'tag ' + (changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].newValue + location + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var ReviewEditedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' edited ' + (changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].fieldName + ' in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var ReviewDeletedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' removed ' + changeLog.changeDetails[0].newValue + '\'s review from ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var ScorecardUpdateChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' updated local scorecard question in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var NotIncludedScorecardChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' did not include ' + changeLog.action.description.split(' Not Included')[0] + ' in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});

var IncludedScorecardChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = ' included ' + changeLog.action.description.split(' Included')[0] + ' in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                { listingChange }
            </div>
            /* jshint ignore:end */
        );
    }
});



var ChangeLog = React.createClass({

    actionMapAdmin: {
        'MODIFIED' : ModifiedChangeLog,
        'APPROVED' : ActionChangeLog,
        'SUBMITTED' : ActionChangeLog,
        'ENABLED' : ActionChangeLog,
        'DISABLED' : ActionChangeLog,
        'CREATED' : ActionChangeLog,
        'ADD_RELATED_TO_ITEM' : RelatedToItemChangeLog,
        'REMOVE_RELATED_TO_ITEM' : RelatedToItemChangeLog,
        'ADD_RELATED_ITEMS' : RelatedItemChangeLog,
        'REMOVE_RELATED_ITEMS' : RelatedItemChangeLog,
        'OUTSIDE' : SetToChangeLog,
        'INSIDE' : SetToChangeLog,
        'REJECTED' : RejectedChangeLog,
        'APPROVED_ORG' : OrgApprovalChangeLog,
        'TAG_CREATED' : TagChangeLog,
        'TAG_DELETED' : TagChangeLog,
        'REVIEW_EDITED' : ReviewEditedChangeLog,
        'REVIEW_DELETED' : ReviewDeletedChangeLog,
        'LOCAL_SCORECARD_QUESTION_UPDATED' : ScorecardUpdateChangeLog,
        'EMS_INCLUDED' : IncludedScorecardChangeLog,
        'CLOUD_HOST_INCLUDED' : IncludedScorecardChangeLog,
        'SECURITY_SERVICES_INCLUDED' : IncludedScorecardChangeLog,
        'SCALE_INCLUDED' : IncludedScorecardChangeLog,
        'LICENSE_FREE_INCLUDED' : IncludedScorecardChangeLog,
        'CLOUD_STORAGE_INCLUDED' : IncludedScorecardChangeLog,
        'BROWSER_INCLUDED' : IncludedScorecardChangeLog,
        'EMS_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'CLOUD_HOST_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'SECURITY_SERVICES_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'SCALE_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'LICENSE_FREE_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'CLOUD_STORAGE_NOT_INCLUDED' : NotIncludedScorecardChangeLog,
        'BROWSER_NOT_INCLUDED' : NotIncludedScorecardChangeLog
    },

    mixins: [ Navigation, ActiveState ],

    render: function() {

        var time = timeAgo(this.props.changeLog.activityDate);
        var Handler = this.actionMapAdmin[this.props.changeLog.action];
        if(!Handler) {
            return;
        }
        /* jshint ignore:start */
        return (
            <li>
                <div className="row">
                    <div className="col-md-3">
                        <em>{ time }</em>
                    </div>
                    <div className="col-md-9">
                        < Handler changeLog={ this.props.changeLog } showListingName={ this.props.showListingName } />
                    </div>
                </div>
            </li>
        );
        /* jshint ignore:end */
    }

});


module.exports = ChangeLog;
