'use strict';

var React = require('react');
var Text = require('../../form/TextInput');
var Select = require('../../form/Select2Input');
var DeleteBtnMixin = require('./DeleteBtnMixin');

var phoneRegex = /(^\+\d((([\s.-])?\d+)?)+$)|(^(\(\d{3}\)\s?|^\d{3}[\s.-]?)?\d{3}[\s.-]?\d{4}$)/,
    NEED_ONE_PHONE = 'Please provide at least one valid phone number',
    INVALID_PHONE = 'Please enter a valid phone number (e.g. 555-5555, 555-555-5555)';

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var contactTypes = this.props.config.contactTypes.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.title}>{json.title}</option>;
            /*jshint ignore:end */
        });

        var contact = this.props.item,
            me = this;

        function propSetter(prop, val) {
            contact[prop] = val;
            me.props.setter(me.props.item);
        }

        /*jshint ignore:start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Select setter={propSetter.bind(me, 'type')} defaultValue={contact.type} 
                        label="Contact Type" disabled={this.props.locked} required data-placeholder="Select a Contact Type">
                        {contactTypes}
                    </Select>
                    <Text setter={propSetter.bind(me, 'name')} defaultValue={contact.name} label="Name" required maxLength={100} />
                    <Text setter={propSetter.bind(me, 'organization')} defaultValue={contact.organization} label="Organization" maxLength={100} />
                    <Text type="email" ref="email" setter={propSetter.bind(me, 'email')} defaultValue={contact.email} label="Email" required maxLength={100} />
                    <Text type="text" ref="securePhone" setter={propSetter.bind(me, 'securePhone')} defaultValue={contact.securePhone}
                            label="Secure Phone" error={this.state.securePhoneError} maxLength={50}
                            onFocus={this.validatePhone.bind(this, 'secure')} onBlur={this.validatePhone.bind(this, 'secure')} />
                    <Text type="text" ref="unsecurePhone" setter={propSetter.bind(me, 'unsecurePhone')} defaultValue={contact.unsecurePhone}
                            label="Unsecure Phone" error={this.state.unsecurePhoneError} maxLength={50}
                            onFocus={this.validatePhone.bind(this, 'unsecure')} onBlur={this.validatePhone.bind(this, 'unsecure')} />
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    validatePhone: function (refName, event) {
        var secure = this.props.item.securePhone,
            unsecure = this.props.item.unsecurePhone,
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

module.exports.schema = function () {
    return {};
};
