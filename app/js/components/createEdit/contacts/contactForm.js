/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    Dropdown  = require('../../input/dropdown'),
    $         = require('jquery');

var contactTypes = [
    {
        "id": 1,
        "title": "Technical POC",
        "createdBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedDate": "2014-08-21T06:21:14Z",
        "required": true,
        "createdDate": "2014-08-21T06:20:38Z"
    },
    {
        "id": 2,
        "title": "Government Sponsor",
        "createdBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedDate": "2014-08-21T06:20:58Z",
        "required": true,
        "createdDate": "2014-08-21T06:20:58Z"
    },
    {
        "id": 3,
        "title": "Marketing",
        "createdBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedDate": "2014-08-21T06:21:35Z",
        "required": false,
        "createdDate": "2014-08-21T06:21:35Z"
    },
    {
        "id": 4,
        "title": "Customer Service",
        "createdBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedDate": "2014-08-21T06:21:50Z",
        "required": false,
        "createdDate": "2014-08-21T06:21:50Z"
    },
    {
        "id": 5,
        "title": "SSO",
        "createdBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedBy": {
            "id": 2,
            "username": "testAdmin1",
            "name": "Test Administrator 1"
        },
        "editedDate": "2014-08-21T06:22:15Z",
        "required": true,
        "createdDate": "2014-08-21T06:22:15Z"
    }
].map(function (json) {
    return {value: json.id, name: json.title};
});

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
                    <Dropdown ref="type" options={contactTypes} value={contact.type.id} label="Contact Type" />
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
