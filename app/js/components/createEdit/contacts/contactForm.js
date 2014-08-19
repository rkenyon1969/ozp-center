/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    $         = require('jquery');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var contact = this.props.item;

        return (
            <div>
                <TextInput ref="type" value={contact.type} label="Type" />
                <TextInput ref="name" value={contact.name} label="Name" />
                <TextInput ref="email" value={contact.email} label="Email" />
                <TextInput ref="securePhone" value={contact.securePhone} label="Secure Phone" />
                <TextInput ref="unsecurePhone" value={contact.unsecurePhone} label="Unsecure Phone" />
            </div>
        );
    },
    /*jshint ignore:end */
});
