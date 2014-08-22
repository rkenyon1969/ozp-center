/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    Input     = require('../../form/input'),
    merge     = require('react/lib/merge'),
    DeleteBtn = require('./mixins/deleteBtn');

module.exports.form = React.createClass({
    mixins: [ DeleteBtn ],

    render: function () {
        var screenshot = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row screenshot-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input label="Preview Image" itemValue={screenshot.smallImageUrl}
                            description="600px wide by 375px tall" />
                    <Input label="Full Size Image" itemValue={screenshot.largeImageUrl}
                            description="960px wide by 600px tall" />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

var schema = {
    name: '',
    securePhone: '',
    unsecurePhone: '',
    email: '',
    type: {id: null}
};

function Contact(json) {
    return merge(schema, json);
}

module.exports.schema = Contact;
