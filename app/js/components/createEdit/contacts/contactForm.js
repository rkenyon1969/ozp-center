/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    $         = require('jquery');

module.exports = React.createClass({
    handleSave: function () {
        var type  = $('.form-control', this.refs.type.getDOMNode())[0].value,
            name  = $('.form-control', this.refs.name.getDOMNode())[0].value,
            email = $('.form-control', this.refs.email.getDOMNode())[0].value;

        var data = {
            type: type,
            name: name,
            email: email,
            phones: []
        };

        this.props.saveHandler(data);
    },

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
    }
    /*jshint ignore:end */
});
