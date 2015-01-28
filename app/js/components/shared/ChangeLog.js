'use strict';
var React = require('react');
var actions = require('../../constants/index').listingActions;
var uuid = require('../../utils/uuid');
var timeAgo = require('../../utils/timeAgo');
var fieldName = require('../../constants/index').listingFieldName;
var { Link, Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');

var ActionChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = changeLog.author.displayName + ' ' + changeLog.action.toLowerCase() + ' ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
            /* jshint ignore:end */
        );
    }
});

var SetToChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = changeLog.author.displayName +' set ' + (this.props.showListingName ? changeLog.listing.title : 'the listing') + ' to ' + changeLog.action.toLowerCase();
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
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
                <div>{ changeLog.author.displayName } rejected { (this.props.showListingName ? changeLog.listing.title : 'the listing') }</div>
                <a href="javascript:;" data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                    <i className="fa fa-plus"></i> Feedback
                </a>
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
        var listingChange = changeLog.author.displayName + ' approved ' + (this.props.showListingName ? changeLog.listing.title : 'the listing') + ' for ' + changeLog.listing.agency;
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
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
                    <div>{ changeLog.author.displayName } modified { details }</div>
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
                <div> { changeLog.author.displayName } modified { this.props.showListingName ? changeLog.listing.title : 'the listing' } </div>
            );
            /* jshint ignore:end */
        }
    }
});

var ReviewEditedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = changeLog.author.displayName + ' edited ' + ((changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].fieldName) + ' in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
            /* jshint ignore:end */
        );
    }
});

var ReviewDeletedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = changeLog.author.displayName + ' removed ' + changeLog.changeDetails[0].newValue + '\'s review from ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
            /* jshint ignore:end */
        );
    }
});

var ScorecardUpdateChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        var listingChange = changeLog.author.displayName + ' updated local scorecard question in ' + (this.props.showListingName ? changeLog.listing.title : 'the listing');
        return (
            /* jshint ignore:start */
            <div>{ listingChange }</div>
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
        'OUTSIDE' : SetToChangeLog,
        'INSIDE' : SetToChangeLog,
        'REJECTED' : RejectedChangeLog,
        'APPROVED_ORG' : OrgApprovalChangeLog,
        'REVIEW_EDITED' : ReviewEditedChangeLog,
        'REVIEW_DELETED' : ReviewDeletedChangeLog,
    },

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
                        { this.props.children }
                    </div>
                </div>
            </li>
        );
        /* jshint ignore:end */
    }

});


module.exports = ChangeLog;
