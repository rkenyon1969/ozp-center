/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Dropdown    = require('../../input/dropdown');

var dataTypes = [
    {
        "id": 1,
        "title": "audio",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "Audio file. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "a5f41598-44c7-414c-a47e-2b12b33534b4",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 2,
        "title": "image",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "Image file. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "7c85d60c-5893-4038-b3cd-5ce5f32f46d0",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 3,
        "title": "json",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "JSON document. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "9c900161-4a72-45b4-82a1-2e7c809658cb",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 4,
        "title": "text",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "Textual information. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "591a45ed-42d5-4377-b6c9-9ede2645ccc7",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 5,
        "title": "uri",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "URI - Uniform Resource Identifier. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "8dea47f9-d146-43ff-b24c-0e088ad327bf",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 6,
        "title": "video",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "Video file. SAMPLE DATA TYPE.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "beaa46a9-38d1-4225-a7ea-0f4cd9f9c0ab",
        "createdDate": "2014-08-21T06:19:38Z"
    }
].map(function (json) {
    return {value: json.id, name: json.title};
});

var actions = [
    {
        "id": 2,
        "title": "edit",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The edit intent is designed to give applications the ability to offer a simple mechanism to edit data from the current page.",
            "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "5a231162-6813-4402-866a-2823d16fc46e",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 4,
        "title": "pick",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The pick intent is designed to give services the ability to allow their users pick files from their service for use in a client application.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "5283430b-c945-4665-a148-b4ff3aa19579",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 6,
        "title": "save",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The Save intent is designed to give applications the ability to offer a simple mechanism to save data in their application.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "bf492e18-cd05-4913-b9e1-e0c60ec68039",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 1,
        "title": "share",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The share intent is designed to give applications the ability to offer a simple mechanism for sharing data from the current page.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "e793db5b-8dd7-48d3-acb5-3f0606432c99",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 5,
        "title": "subscribe",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The subscribe intent is designed to give applications the ability to offer a simple mechanism for subscribing to data from the current page",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "251912f0-87fc-4333-af95-77637acfd362",
        "createdDate": "2014-08-21T06:19:38Z"
    },
    {
        "id": 3,
        "title": "view",
        "createdBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "description": "The view intent is designed to give applications the ability to offer a simple mechanism to view data in their application.",
        "editedBy": {
            "id": 1,
            "username": "System",
            "name": "System"
        },
        "editedDate": "2014-08-21T06:19:38Z",
        "uuid": "4c069314-1ff9-462f-be30-6165c2b1a6f5",
        "createdDate": "2014-08-21T06:19:38Z"
    }
].map(function (json) {
    return {name: json.title, value: json.id};
});

module.exports = React.createClass({
    /*jshint ignore: start */
    render: function () {
        var intent = this.props.item;
        return (
            <div className="row intent-card">
                <div className="col-sm-12">
                    <button onClick={this.props.removeHandler} className="btn btn-link">
                        <i className="fa fa-times"></i>
                    </button>
                    <Dropdown options={actions} value={intent.action.id} />
                    <Dropdown options={dataTypes} value={intent.dataType.id} />
                </div>
            </div>
        );
    }
    /*jshint ignore: end */
});
