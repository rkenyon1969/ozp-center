/** @jsx React.DOM */
'use strict';

var React          = require('react'),
    Input          = require('../../form').Input,
    merge          = require('react/lib/merge'),
    DeleteBtnMixin = require('./deleteBtnMixin');

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var resource = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row resource-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input elementType="input" type="url" requried label="Type of Resource" itemValue={resource.name} maxLength={2083} />
                    <Input elementType="input" type="url" requried label="URL" itemValue={resource.url} maxLength={2083} />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

function Resource(json) {
    var schema = {
        name: '',
        url: ''
    };

    return merge(schema, json);
}

module.exports.schema = Resource;
