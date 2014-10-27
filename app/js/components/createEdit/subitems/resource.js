'use strict';

var React = require('react');
var Text = require('../../form/TextInput');
var Url = require('../../form/UrlInput');
var DeleteBtnMixin = require('./deleteBtnMixin');

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var resource = this.props.item,
            me = this;

        function propSetter(prop, val) {
            resource[prop] = val;
            me.props.setter(me.props.item);
        }

        /*jshint ignore: start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Text type="text" defaultValue={resource.name} label="Type of Resource" setter={propSetter.bind(me, 'name')} required />
                    <Url defaultValue={resource.url} label="URL" setter={propSetter.bind(me, 'url')} required />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

module.exports.schema = function () {
    return {};
};
