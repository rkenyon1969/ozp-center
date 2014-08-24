/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Input            = require('../../form').Input,
    merge            = require('react/lib/merge'),
    DeleteBtnMixin   = require('./deleteBtnMixin'),
    ConfigStoreMixin = require('../../../stores/ConfigStore').mixin;

var phoneRegex = /(^\+\d((([\s.-])?\d+)?)+$)|(^(\(\d{3}\)\s?|^\d{3}[\s.-]?)?\d{3}[\s.-]?\d{4}$)/,
    NEED_ONE_PHONE = 'Please provide at least one valid phone number',
    INVALID_PHONE = 'Please enter a valid phone number (e.g. 555-5555, 555-555-5555)';

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
            <div className="row contact-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input elementType="select" options={contactTypes} itemValue={contact.type.id} label="Contact Type" required />
                    <Input elementType="input" type="text" itemValue={contact.name} label="Name" required />
                    <Input elementType="input" type="text" itemValue={contact.organization} label="Organization" />
                    <Input elementType="input" type="email" ref="email" itemValue={contact.email} label="Email" required />
                    <Input elementType="input" type="text" ref="securePhone" itemValue={contact.securePhone}
                            label="Secure Phone" error={this.state.securePhoneError}
                            onFocus={this.validatePhone.bind(this, 'secure')} onBlur={this.validatePhone.bind(this, 'secure')} />
                    <Input elementType="input" type="text" ref="unsecurePhone" itemValue={contact.unsecurePhone}
                            label="Unsecure Phone" error={this.state.unsecurePhoneError}
                            onFocus={this.validatePhone.bind(this, 'unsecure')} onBlur={this.validatePhone.bind(this, 'unsecure')} />
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    validatePhone: function (refName, event) {
        var secure = this.props.item.securePhone.val(),
            unsecure = this.props.item.unsecurePhone.val(),
            secureBlank = (!secure || secure === ''),
            unsecureBlank = (!unsecure || unsecure === '');

        var state = {
            securePhoneError: this.state.securePhoneError,
            unsecurePhoneError: this.state.unsecurePhoneError
        };

        //if leaving a phone input element, check that both are not blank
        //and that both are valid phone numbers
        if (event.type === 'blur') {
            if (secureBlank && unsecureBlank) {
                state.securePhoneError = NEED_ONE_PHONE;
                state.unsecurePhoneError = NEED_ONE_PHONE;
            } else {
                state.securePhoneError = phoneRegex.test(secure) || secureBlank ? null : INVALID_PHONE;
                state.unsecurePhoneError = phoneRegex.test(unsecure) || unsecureBlank ? null : INVALID_PHONE;
            }
        }

        //if focusing on a phone element when the 'both are blank' error state exists,
        //set the invalid error on the element receiving focus and clear the other
        if (event.type === 'focus' && this.state.securePhoneError === NEED_ONE_PHONE) {
            state.securePhoneError = refName === 'secure' ? INVALID_PHONE : null;
            state.unsecurePhoneError = refName === 'unsecure' ? INVALID_PHONE : null;
        }

        //on change clear any errors that are resolved with the change
        if (event.type === 'change') {
            if (this.state.securePhoneError && phoneRegex.test(secure)) {
                state.securePhoneError = null;
            }

            if (this.state.unsecurePhoneError && phoneRegex.test(unsecure)) {
                state.unsecurePhoneError = null;
            }
        }

        this.setState(state);
    },

    getInitialState: function () {
        return {unsecurePhoneError: null, securePhoneError: null};
    },

    componentWillReceiveProps: function () {
        //validate phone needs to be called somewhere it has access to the old
        //state and where it's safe to set state
        this.validatePhone(null, {type: 'change'});
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
