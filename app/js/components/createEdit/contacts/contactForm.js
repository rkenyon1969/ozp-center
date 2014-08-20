/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    Dropdown  = require('../../input/dropdown'),
    $         = require('jquery');

var contactTypes = [
    'Technical POC',
    'Government Sponsor',
    'Optional Contact 1',
    'Optional Contact 2',
    'Required Contact 3'
];

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var contact = this.props.item;

        return (
            <div className="row contact-card">
                <div className="col-sm-12">
                    <button onClick={this.props.removeHandler} className="btn btn-link">
                        <i className="fa fa-times"></i>
                    </button>
                    <Dropdown ref="type" options={contactTypes} label="Contact Type" />
                    <TextInput ref="name" value={contact.name} label="Name" />
                    <TextInput ref="organization" value={contact.organization} label="Organization" />
                    <TextInput ref="email" value={contact.email} label="Email" />
                    <TextInput ref="securePhone" value={contact.securePhone} label="Secure Phone" />
                    <TextInput ref="unsecurePhone" value={contact.unsecurePhone} label="Unsecure Phone" />
                </div>
            </div>
        );
    }
    /*jshint ignore:end */
});
