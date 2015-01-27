'use strict';

var React = require('react');
var Reflux = require('reflux');
<<<<<<< HEAD
=======
var TimeAgo = require('../../components/shared/TimeAgo');
var actions = require('../../constants/index').listingActions;
var uuid = require('../../utils/uuid');
var fieldName = require('../../constants/index').listingFieldName;
>>>>>>> master
var CurrentListingStore = require('../../stores/CurrentListingStore');
var ChangeLog = require('../shared/ChangeLog');

var ChangeLogs = React.createClass({

    propTypes: {
        changeLogs: React.PropTypes.array,
        showListingName: React.PropTypes.bool
    },

    mixins: [Reflux.listenTo(CurrentListingStore, 'changeLogsReceived')],

    getInitialState: function () {
        return {
            changeLogs: []
        };
    },

    getDefaultProps: function () {
        return {
            showListingName: true
        };
    },

    changeLogsReceived: function () {
        var logs = CurrentListingStore.getChangeLogs();
        this.setState({changeLogs: logs});
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

        return this.state.changeLogs.map(function (changeLog, i) {
            /* jshint ignore:start */
            return (
                <ChangeLog showListingName={me.props.showListingName} changeLog={changeLog} />
            );
            /* jshint ignore:end */
        });
    }
});

module.exports = ChangeLogs;
