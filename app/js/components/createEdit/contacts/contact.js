/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var contact = this.props.data
        var phones = contact.phones.map(function (phone) {
            return <p>Phone: <small>phone</small></p>;
        });
        return (
            <div>
                <h4>{contact.type}</h4>
                <p>Name: <small>{contact.name}</small></p>
                <p>Email: <small>{contact.email}</small></p>
                {phones}
                <button onClick={this.props.editHandler}>Edit</button>
                <button onClick={this.props.removeHandler}>Remove</button>
            </div>
        );
    }
    /*jshint ignore:end */
});
