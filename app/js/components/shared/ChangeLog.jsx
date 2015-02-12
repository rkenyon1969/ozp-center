'use strict';
var React = require('react');
var uuid = require('../../utils/uuid');
var timeAgo = require('../../utils/timeAgo');
var fieldName = require('ozp-react-commons/constants/index').listingFieldName;

var { Navigation } = require('react-router');
var ProfileLink = require('../profile/ProfileLink.jsx');

var ActiveState = require('../../mixins/ActiveStateMixin');

var AuthorLink = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired
    },

    render: function() {
        var author = this.props.author;

        return (
            <ProfileLink profileId={author.id}>
                {author.displayName}
            </ProfileLink>
        );
    }
});

var ActionChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                <AuthorLink author={changeLog.author} />
                <span> { changeLog.action.toLowerCase() } </span>
                { this.props.listingName }
            </div>
        );
    }
});

var SetToChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                <AuthorLink author={changeLog.author} />
                <span> set </span>
                { this.props.listingName } to {changeLog.action.toLowerCase()}
            </div>
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

        return (
            <div>
                <div>
                    <AuthorLink author={changeLog.author} />
                    <span> rejected </span>
                    { this.props.listingName }
                </div>
                <a data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                    <i className="fa fa-plus"></i> Feedback
                </a>
                <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                    <li>{ details }</li>
                </ul>
            </div>
        );
    }
});

var OrgApprovalChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                <AuthorLink author={changeLog.author} />
                <span> approved </span>
                { this.props.listingName } for { changeLog.listing.agency }
            </div>
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

            extendedDetails[i] = (
                <li>{ changedField } changed from&nbsp;
                    <span className="OldValue">{ changeDetail.oldValue }</span>
                    <span> to </span>
                    <span className="NewValue">{ changeDetail.newValue }</span>
                </li>
            );
        });

        if (details.length) {
            details = details.join(', ');
            var id = uuid();

            return (
                <div>
                    <div>
                        <AuthorLink author={changeLog.author} /> modified {this.props.listingName}
                    </div>
                    <a data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                        <i className="fa fa-plus"></i> See {this.props.showListingName ? changeLog.listing.title : 'the listing'} changes
                    </a>
                    <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                        { extendedDetails }
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <AuthorLink author={changeLog.author} />
                    <span> modified </span>
                    { this.props.showListingName ? changeLog.listing.title : 'the listing' }
                </div>
            );
        }
    }
});

var ReviewEditedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                <AuthorLink author={changeLog.author} />
                <span> edited </span>
                { (changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].fieldName } in { this.props.listingName }
            </div>
        );
    }
});

var ReviewDeletedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                <AuthorLink author={changeLog.author} />
                <span> removed </span>
                { changeLog.changeDetails[0].newValue } review from { this.props.listingName }
            </div>
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
                <a href={ href }>{ this.props.changeLog.listing.title }</a>
            );
        } else {
            return 'the listing';
        }
    },

    render: function() {
        var icon, link;

        if(this.props.children !== undefined) {
            icon = this.props.children[0];
            link = this.props.children[1];
        }

        var time = timeAgo(this.props.changeLog.activityDate);
        var Handler = this.actionMapAdmin[this.props.changeLog.action];
        if(!Handler) {
            return;
        }
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
    }

});


module.exports = ChangeLog;
