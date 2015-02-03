'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var ApprovalStatusFilter = require('./ApprovalStatusFilter');
var EnabledFilter = require('./EnabledFilter');
var OrgFilter = require('./OrgFilter');

var Sidebar = React.createClass({

    propTypes: {
        counts: React.PropTypes.object.isRequired
    },

    render: function () {
        /*jshint ignore:start */
        var filters = [
            <ApprovalStatusFilter { ...this.props }/>
        ];

        if(this.props.view === 'adminView') {
            filters.push(
                <OrgFilter { ...this.props } />
            );
        }

        if(this.props.view === 'adminView' || this.props.view === 'orgView') {
            var counts = this.props.counts || {};
            counts.disabled = counts.total - counts.enabled;
            this.props.counts = counts;

            filters.push(
                <EnabledFilter { ...this.props } />
            );
        }

        return (
            <form className="Listings__SidebarFilter">
                { filters }
            </form>
        );
        /*jshint ignore:end */
    }
});

module.exports = Sidebar;
