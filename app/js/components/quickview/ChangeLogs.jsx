'use strict';

var React = require('react');
var Reflux = require('reflux');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var ChangeLog = require('../shared/ChangeLog.jsx');

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
        return (
            <ul className="list-unstyled RecentActivity">
                { this.renderChangeLogs() }
            </ul>
        );
    },

    renderChangeLogs: function () {
        var me = this;

        return this.state.changeLogs.map(function (changeLog) {
            return [
                <ChangeLog showListingName={me.props.showListingName} changeLog={changeLog} />,
                <br />
            ];
        });
    }
});

module.exports = ChangeLogs;
