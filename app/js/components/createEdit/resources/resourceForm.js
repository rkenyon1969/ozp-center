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
        this.props.saveHandler({
            type: this.refs.type.value(),
            url: this.refs.url.value()
        });
    }
});
