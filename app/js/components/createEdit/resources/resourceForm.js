/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    $         = require('jquery');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var currentResource = this.props.currentItem,
            type = currentResource ? currentResource.type : '',
            url  = currentResource ? currentResource.url : '';

        return (
            <div>
                <TextInput ref="type" value={type} label="Type" />
                <TextInput ref="url" value={url} label="URL" />
                <button onClick={this.handleSave} className="btn btn-primary">Save</button>
            </div>
        );
    },
    /*jshint ignore:end */

    handleSave: function () {
        var type = $('.form-control', this.refs.type.getDOMNode())[0].value;
        var url = $('.form-control', this.refs.url.getDOMNode())[0].value;
        this.props.saveHandler({type: type, url: url});
    }
});
