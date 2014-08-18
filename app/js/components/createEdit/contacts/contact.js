/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var contact = this.props.item
        var phones = contact.phones.map(function (phone) {
            return <p>Phone: <small>{phone.val()}</small></p>;
        });
        return (
            <div>
                <h4>{contact.type.val()}</h4>
                <p>Name: <small>{contact.name.val()}</small></p>
                <p>Email: <small>{contact.email.val()}</small></p>
                {phones}
                <button onClick={this.props.editHandler}>Edit</button>
                <button onClick={this.props.removeHandler}>Remove</button>
            </div>
        );
    }
    /*jshint ignore:end */
});
