'use strict';

var React = require('react');
var actions = require('../../constants/index').listingActions;
var timeAgo = require('../../utils/timeAgo');
var uuid = require('../../utils/uuid');
var fieldName = require('../../constants/index').listingFieldName;

var ChangeLogs = React.createClass({

    propTypes: {
        changeLogs: React.PropTypes.array,
        showListingName: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            changeLogs: [],
            showListingName: true
        };
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <ul className="list-unstyled RecentActivity">
                { this.renderChangeLogs() }
            </ul>
        );
        /* jshint ignore:end */
    },

    renderChangeLogs: function () {
        var me = this;

        return this.props.changeLogs.map(function (changeLog, i) {
            var time = timeAgo(changeLog.activityDate);
            var listingChange = me.getListingChange(changeLog, i);

            /* jshint ignore:start */
            return [
                <li>
                    <div className="row">
                        <div className="col-md-3">
                            <em>{ time }</em>
                        </div>
                        <div className="col-md-9">
                            { listingChange }
                        </div>
                    </div>
                </li>,
                <br/>
            ];
            /* jshint ignore:end */
        });
    },

    getListingChange: function (changeLog, index) {
        var action = changeLog.action.toLowerCase();
        var listingChange = changeLog.author.displayName;
        var listingName = (this.props.showListingName ? changeLog.serviceItem.title : 'the listing');

        switch (action) {
            case actions.MODIFIED:
                listingChange = this.renderModifiedLog(changeLog, index, listingName);
                break;
            case actions.ADD_RELATED_TO_ITEM:
                listingChange += ' added ' + listingName + ' as a requirement to ' + this.getRelatedItemsAsString(changeLog);
                break;
            case actions.REMOVE_RELATED_TO_ITEM:
                listingChange += ' removed ' + listingName + ' as a requirement to ' + this.getRelatedItemsAsString(changeLog);
                break;
            case actions.ADD_RELATED_ITEMS:
                listingChange += ' added ' + this.getRelatedItemsAsString(changeLog) + ' as a requirement to ' + listingName;
                break;
            case actions.REMOVE_RELATED_ITEMS:
                listingChange += ' removed ' + this.getRelatedItemsAsString(changeLog) + ' as a requirement to ' + listingName;
                break;
            case actions.OUTSIDE:
            case actions.INSIDE:
                listingChange += listingChange += ' set ' + listingName + ' to ' + action;
                break;
            case actions.REJECTED:
                listingChange = this.renderRejectedLog(changeLog, index, listingName);
                break;
            case actions.APPROVED:
            case actions.SUBMITTED:
            case actions.ENABLED:
            case actions.DISABLED:
            case actions.CREATED:
                listingChange += ' ' + action + ' ' + listingName;
                break;
            case actions.TAG_CREATED:
                listingChange += ' added tag ' + changeLog.changeDetails[0].newValue + ' to ' + listingName;
                break;
            case actions.TAG_DELETED:
                listingChange += ' removed tag ' + changeLog.changeDetails[0].newValue + ' from ' + listingName;
                break;
            case actions.REVIEW_EDITED:
                listingChange += ' edited ' + changeLog.changeDetails[0].fieldName + ' in ' + listingName;
                break;
            case actions.REVIEW_DELETED:
                listingChange += ' removed ' + changeLog.changeDetails[0].newValue + '\'s review from ' + listingName;
                break;
            case actions.LOCAL_SCORECARD_QUESTION_UPDATED:
                listingChange += ' updated local scorecard question in ' + listingName;
                break;
            case actions.EMS_INCLUDED:
            case actions.CLOUD_HOST_INCLUDED:
            case actions.SECURITY_SERVICES_INCLUDED:
            case actions.SCALE_INCLUDED:
            case actions.LICENSE_FREE_INCLUDED:
            case actions.CLOUD_STORAGE_INCLUDED:
            case actions.BROWSER_INCLUDED:
                listingChange += ' included ' + changeLog.action.description.split(' Included')[0] + ' in ' + listingName;
                break;
            case actions.EMS_NOT_INCLUDED:
            case actions.CLOUD_HOST_NOT_INCLUDED:
            case actions.SECURITY_SERVICES_NOT_INCLUDED:
            case actions.SCALE_NOT_INCLUDED:
            case actions.LICENSE_FREE_NOT_INCLUDED:
            case actions.CLOUD_STORAGE_NOT_INCLUDED:
            case actions.BROWSER_NOT_INCLUDED:
                listingChange += ' did not include ' + changeLog.action.description.split(' Not Included')[0] + ' in ' + listingName;
                break;
        }

        return listingChange;
    },

    renderModifiedLog: function (changeLog, index, listingName) {
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

            if (this.props.showListingName) {
                details += ' in ' + listingName;
            }

            /* jshint ignore:start */
            return [
                <div>{ changeLog.author.displayName } modified { details }</div>,
                <a href="javascript:;" data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                    <i className="fa fa-plus"></i> Changes
                </a>,
                <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                    { extendedDetails }
                </ul>
            ];
            /* jshint ignore:end */
        }
        else {
            return changeLog.author.displayName + ' modified ' + listingName;
        }
    },

    renderRejectedLog: function (changeLog, index, listingName) {
        var details = 'Details: ' + changeLog.rejectionDescription;
        var id = uuid();

        /* jshint ignore:start */
        return [
            <div>{ changeLog.author.displayName } rejected { listingName }</div>,
            <a href="javascript:;" data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                <i className="fa fa-plus"></i> Feedback
            </a>,
            <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                <li>{ details }</li>
            </ul>
        ];
        /* jshint ignore:end */
    },

    getRelatedItemsAsString: function (changeLog) {
        return changeLog.relatedItems.map(function (item, i) {
            if (i === changeLog.relatedItems.length - 1 && i !== 0) {
                return 'and ' + item.title;
            }
            return item.title;
        }).join(', ');
    },

    toggleIcon: function (e) {
        $(e.currentTarget).children('i').toggleClass('fa-minus fa-plus');
    }

});

module.exports = ChangeLogs;
