'use strict';
var React = require('react');
var actions = require('../../constants/index').listingActions;
var uuid = require('../../utils/uuid');
var timeAgo = require('../../utils/timeAgo');
var fieldName = require('../../constants/index').listingFieldName;

var { Navigation, CurrentPath } = require('react-router');
var ProfileLink = require('../profile/ProfileLink');

var ActiveState = require('../../mixins/ActiveStateMixin');

var AuthorLink = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired
    },

    render: function() {
        var author = this.props.author,
            queryParams = {profile: author.id};

        /* jshint ignore:start */
        return (
            <ProfileLink profileId={author.id}>
                {author.displayName}
            </ProfileLink>
        );
        /* jshint ignore:end */
    }
});

var ActionChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                <span> { changeLog.action.toLowerCase() } </span>
                { this.props.listingName }
            </div>
            /* jshint ignore:end */
        );
    }
});

var SetToChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                <span> set </span>
                { this.props.listingName } to {changeLog.action.toLowerCase()}
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
                    { this.props.listingName }
                </div>
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
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                <span> approved </span>
                { this.props.listingName } for { changeLog.listing.agency }
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
                    <span> to </span>
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

var ReviewEditedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                <span> edited </span>
                { (changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].fieldName } in { this.props.listingName }
            </div>
            /* jshint ignore:end */
        );
    }
});

var ReviewDeletedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            /* jshint ignore:start */
            <div>
                <AuthorLink author={changeLog.author} />
                <span> removed </span>
                { changeLog.changeDetails[0].newValue } review from { this.props.listingName }
            </div>
            /* jshint ignore:end */
        );
    }
});


var ChangeLog = React.createClass({


    mixins: [ Navigation, ActiveState],

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

    getListingName: function() {

        if(this.props.showListingName) {
            var href = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
                listing: this.props.changeLog.listing.id,
                action: 'view',
                tab: 'overview'
            });
            return (
                /* jshint ignore:start */
                <a href={ href }>{ this.props.changeLog.listing.title }</a>
                /* jshint ignore:end */
            );
        } else {
            return 'the listing';
        }
    },

    render: function() {

        if(this.props.children !== undefined) {
            var icon = this.props.children[0];
            var link = this.props.children[1];
        }

        var time = timeAgo(this.props.changeLog.activityDate);
        var Handler = this.actionMapAdmin[this.props.changeLog.action];
        if(!Handler) {
            return;
        }
        /* jshint ignore:start */
        return (
            <li>
                <div className="row">
                    <div className={this.props.showListingName? "col-md-2" : "col-md-3"}>
                        <em>{ time }</em>
                    </div>
                    <div className={this.props.showListingName ? "col-md-10" : "col-md-9"}>
                        { icon }
                        < Handler changeLog={ this.props.changeLog } listingName={ this.getListingName() } />
                        { link }
                    </div>
                </div>
            </li>
        );
        /* jshint ignore:end */
    }

});


module.exports = ChangeLog;
