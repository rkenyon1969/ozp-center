/** @jsx React.DOM */
'use strict';

var React  = require('react'),
    Reflux = require('reflux'),
    Input  = require('../../form/input'),
    Select = require('../../form/select'),
    $      = require('jquery');

var ConfigStore = require('../../../stores/ConfigStore');

module.exports = React.createClass({
    mixins: [ Reflux.ListenerMixin ],

    render: function () {
        var contactTypes = [];
        if (!this.state.config.loading) {
            contactTypes = this.state.config.contactTypes.map(function (json) {
                return {value: json.id, name: json.title};
            });
        }

        var contact = this.props.item;
        /*jshint ignore:start */
        return (
            <div className="row contact-card">
                <div className="col-sm-12">
                    <button onClick={this.props.removeHandler} className="btn btn-link">
                        <i className="fa fa-times"></i>
                    </button>
                    <Select ref="type" options={contactTypes} value={contact.type.id} label="Contact Type" />
                    <Input type="text" ref="name" itemValue={contact.name} label="Name" />
                    <Input type="text" ref="organization" itemValue={contact.organization} label="Organization" />
                    <Input type="text" ref="email" itemValue={contact.email} label="Email" />
                    <Input type="text" ref="securePhone" itemValue={contact.securePhone} label="Secure Phone" />
                    <Input type="text" ref="unsecurePhone" itemValue={contact.unsecurePhone} label="Unsecure Phone" />
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    getInitialState: function () {
        return {config: ConfigStore.getConfig()};
    },

    _onChange: function () {
        this.replaceState({config: ConfigStore.getConfig()});
    },

    componentDidMount: function () {
        this.listenTo(ConfigStore, this._onChange);
    }
});
