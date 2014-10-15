/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var RecentActivity = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="RecentActivity">
                <div className="RecentActivity__sidebar col-md-3">Sidebar</div>
                <div className="RecentActivity__activities col-md-9">Activities</div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = RecentActivity;