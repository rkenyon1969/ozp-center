/** @jsx React.DOM */
'use strict';

var React          = require('react'),
    Input          = require('../../form').Input,
    merge          = require('react/lib/merge'),
    DeleteBtnMixin = require('./deleteBtnMixin');

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var screenshot = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row screenshot-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input elementType="input" type="url" required label="Preview Image"
                            itemValue={screenshot.smallImageUrl} description="600px wide by 375px tall" />
                    <Input elementType="input" type="url" required label="Full Size Image"
                            itemValue={screenshot.largeImageUrl} description="960px wide by 600px tall" />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

function Contact(json) {
    var schema = {smallImageUrl: '', largeImageUrl: ''};

    return merge(schema, json);
}

module.exports.schema = Contact;
