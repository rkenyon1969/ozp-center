/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Input            = require('../../form').Input,
    merge            = require('react/lib/merge'),
    DeleteBtnMixin   = require('./deleteBtnMixin'),
    ConfigStoreMixin = require('../../../stores/ConfigStore').mixin;

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin, ConfigStoreMixin],

    render: function () {
        var contactTypes = [];
        if (this.state.config) {
            contactTypes = this.state.config.contactTypes.map(function (json) {
                return {value: json.id, name: json.title};
            });
        }

        var contact = this.props.item;
        /*jshint ignore:start */
        return (
            <div className="row contact-card" onBlur={this.handleBlur} onFocus={this.handleFocus}>
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input elementType="select" required options={contactTypes} itemValue={contact.type.id} label="Contact Type" />
                    <Input elementType="input" required type="text" itemValue={contact.name} label="Name" />
                    <Input elementType="input" type="text" itemValue={contact.organization} label="Organization" />
                    <Input elementType="input" required type="email" itemValue={contact.email} label="Email" />
                    <Input elementType="input" type="text" ref="securePhone" itemValue={contact.securePhone} label="Secure Phone" error={this.state.phoneError} />
                    <Input elementType="input" type="text" ref="unsecurePhone" itemValue={contact.unsecurePhone} label="Unsecure Phone" error={this.state.phoneError} />
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    handleFocus: function (event) {
        var focused = event.target,
            securePhoneDOM = this.refs.securePhone.getDOMNode(),
            unsecurePhoneDOM = this.refs.unsecurePhone.getDOMNode();

        if (securePhoneDOM.contains(focused) || unsecurePhoneDOM.contains(focused)) {
            this.setState({phoneError: null});
        }
    },

    handleBlur: function (event) {
        var blurred = event.target,
            securePhoneDOM = this.refs.securePhone.getDOMNode(),
            unsecurePhoneDOM = this.refs.unsecurePhone.getDOMNode(),
            securePhoneVal = this.refs.securePhone.value(),
            unsecurePhoneVal = this.refs.unsecurePhone.value();

        var leavingAPhoneField = securePhoneDOM.contains(blurred) || unsecurePhoneDOM.contains(blurred),
            phoneFieldsAreBlank = (!securePhoneVal || securePhoneVal === '') && (!unsecurePhoneVal || unsecurePhoneVal === '');

        if (leavingAPhoneField && phoneFieldsAreBlank) {
            this.setState({phoneError: 'Please provide at least one valid phone number'});
        }
    },

    getInitialState: function () {
        return {
            phoneError: null
        };
    }
});

function Contact(json) {
    var schema = {
        name: '',
        securePhone: '',
        unsecurePhone: '',
        email: '',
        organization: '',
        type: {id: null}
    };

    return merge(schema, json);
}

module.exports.schema = Contact;
