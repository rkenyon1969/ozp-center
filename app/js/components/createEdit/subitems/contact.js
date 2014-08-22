/** @jsx React.DOM */
'use strict';

var React       = require('react'),
    Reflux      = require('reflux'),
    Input       = require('../../form/input'),
    Select      = require('../../form/select'),
    merge       = require('react/lib/merge'),
    DeleteBtn   = require('./mixins/deleteBtn'),
    ConfigStore = require('./mixins/configStore');

module.exports.form = React.createClass({
    mixins: [ Reflux.ListenerMixin, DeleteBtn, ConfigStore ],

    render: function () {
        var contactTypes = [];
        if (!this.configIsLoading()) {
            contactTypes = this.state.config.contactTypes.map(function (json) {
                return {value: json.id, name: json.title};
            });
        }

        var contact = this.props.item;
        /*jshint ignore:start */
        return (
            <div className="row contact-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
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
    }
});

var schema = {
    name: '',
    securePhone: '',
    unsecurePhone: '',
    email: '',
    type: {id: null}
};

function Contact(json) {
    return merge(schema, json);
}

module.exports.schema = Contact;
