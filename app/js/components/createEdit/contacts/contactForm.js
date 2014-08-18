/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    $         = require('jquery');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var currentContact = this.props.currentItem,
            type = currentContact ? currentContact.type : '',
            name = currentContact ? currentContact.name : '',
            email = currentContact ? currentContact.email : '';

        return (
            <div>
                <TextInput ref="type" value={type} label="Type" />
                <TextInput ref="name" value={name} label="Name" />
                <TextInput ref="email" value={email} label="Email" />
                <button onClick={this.props.clearHandler} className="btn btn-primary">Clear</button>
                <button onClick={this.handleSave} className="btn btn-primary">Save</button>
            </div>
        );
    },
    /*jshint ignore:end */

    handleSave: function () {
        this.props.saveHandler({
            type: this.refs.type.value(),
            name: this.refs.name.value(),
            email: this.refs.email.value(),
            phones: []
        });
    }
});
