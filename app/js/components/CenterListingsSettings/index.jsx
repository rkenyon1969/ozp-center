'use strict';

var React = require('react');

var { Navigation } = require('react-router');

var Modal = require('ozp-react-commons/components/Modal.jsx');

var _ = require('../../utils/_');

var Toggle = React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <label className="switch">
                <input type="checkbox" className="ios"
                    onChange={this.props.onChange} checked={this.props.checked} />
                <div className="track"><div className="knob"/></div>
                {this.props.children}
            </label>
        );
    }
});

/**
 * A modal window that allows the user to update their preferences
 */
var AllListingsSettingsWindow = React.createClass({
    mixins: [ Navigation ],

    propsTypes: {
        backRoute: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        var config = {
                name: false,
                owner: false,
                org: false,
                comments: false,
                status: false,
                updated: false,
                enabled: false,
                featured: false,
                actions: false
            };
        var columns = sessionStorage.getItem(this.props.saveKey);
        if (columns) {
            columns = columns.split(',');
            columns.forEach( function (column) {
                config[column] = true;
            });
        }
        return {
            config: config
        };
    },

    render: function () {
        var organizationToggle = (this.props.saveKey === "orgListings-tableView-columns") ?
            null :
            this.makeToggle("Organization", this.state.config.org, this.toggleColumn.bind(this, "org"));

        return (
            <Modal ref="modal" className="settings-window" title="Column Settings"
                    cancel="Cancel" confirm="Save"
                    onCancel={this.close} onConfirm={this.save}>

                {this.makeFixedToggle("Name")}
                {this.makeToggle("Owner", this.state.config.owner, this.toggleColumn.bind(this, "owner"))}
                {organizationToggle}
                {this.makeToggle("Comments", this.state.config.comments, this.toggleColumn.bind(this, "comments"))}
                {this.makeToggle("Status", this.state.config.status, this.toggleColumn.bind(this, "status"))}
                {this.makeToggle("Updated", this.state.config.updated, this.toggleColumn.bind(this, "updated"))}
                {this.makeToggle("Enabled", this.state.config.enabled, this.toggleColumn.bind(this, "enabled"))}
                {this.makeToggle("Featured", this.state.config.featured, this.toggleColumn.bind(this, "featured"))}
                {this.makeFixedToggle("Actions")}

            </Modal>
        );
    },

    makeToggle: function (title, checked, onChange) {
        var launchText = checked ? "On" : "Off";
        return (
            <dl>
                <dt>{title}</dt>
                <dd>
                    <Toggle
                            onChange={onChange}
                            checked={checked}>
                        {launchText}
                    </Toggle>
                </dd>
            </dl>
        );
    },

    makeFixedToggle: function (title) {
        return (
            <dl>
                <dt>{title}</dt>
                <dd>
                    <h5>Always on</h5>
                </dd>
            </dl>
        );
    },

    toggleColumn: function (key, e) {
        var newConfig = this.state.config;
            newConfig[key] = e.target.checked;
        this.setState({config: newConfig});
    },

    close: function () {
        this.transitionTo(this.props.backRoute);
        $( this.getDOMNode() ).modal('hide');
    },

    save: function () {
        var columns = [];
        _.forEach(this.state.config, function (value, key) {
            if (value === true) {
                columns.push(key);
            }
        });
        sessionStorage.setItem(this.props.saveKey, columns);

        this.close();
    }
});

module.exports = AllListingsSettingsWindow;
