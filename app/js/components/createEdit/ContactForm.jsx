'use strict';

var React = require('react');
var { ValidatedFormMixin, TextInput, Select2Input } = require('./form');

var ContactForm = React.createClass({
    mixins: [ require('../../mixins/SystemStateMixin'), ValidatedFormMixin ],

    render: function () {
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <Select2Input { ...this.getFormComponentProps('type') }
                    options={ this.getOptionsForSystemObject(this.state.system.contactTypes) }/>
                <TextInput { ...this.getFormComponentProps('name') }/>
                <TextInput { ...this.getFormComponentProps('organization') } optional/>
                <TextInput { ...this.getFormComponentProps('email') }/>
                <TextInput { ...this.getFormComponentProps('securePhone') }/>
                <TextInput { ...this.getFormComponentProps('unsecurePhone') }/>
            </div>
        );
    }
});

module.exports = ContactForm;
