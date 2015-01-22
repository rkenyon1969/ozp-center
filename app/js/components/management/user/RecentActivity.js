'use strict';

var React = require('react');
var Reflux = require('reflux');
var Sidebar = require('./RecentActivitySidebar');
var ListingActions = require('../../../actions/ListingActions');
var fetchAllChangeLogs = ListingActions.fetchAllChangeLogs;
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ChangeLog = require('../../shared/ChangeLog');


var RecentActivity = React.createClass({

    mixins: [Reflux.listenTo(GlobalListingStore, 'onChangeLogsReceived')],

    getInitialState: function () {
        return {
            changeLogs: []
        };
    },

    onChangeLogsReceived: function() {
        var logs = GlobalListingStore.getAllChangeLogs();
        this.setState({changeLogs: logs});
    },

    componentWillReceiveProps: function (newProps) {
        fetchAllChangeLogs();
    },

    componentDidMount: function () {
        fetchAllChangeLogs();
    },

    renderChangeLogs: function () {
        var me = this;

        return this.state.changeLogs.map(function (changeLog, i) {

            /* jshint ignore:start */
            return [
                <ChangeLog showListingName={true} changeLog={changeLog} />,
                <br/>
            ];
            /* jshint ignore:end */
        });
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="RecentActivity">
                <div className="RecentActivity__Sidebar col-md-3"><Sidebar /></div>
                <div className="RecentActivity__activities col-md-9">
                    <h2>Recent Activity</h2>
                    <ul className="list-unstyled RecentActivity">
                        { this.renderChangeLogs() }
                    </ul>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = RecentActivity;
