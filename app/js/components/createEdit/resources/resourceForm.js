/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    TextInput = require('../../input/text'),
    $         = require('jquery');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var resource = this.props.item,
            type = resource ? resource.type : '',
            url  = resource ? resource.url : '';

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
