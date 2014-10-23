'use strict';

var React = require('react');
var TextInput = require('../../form/TextInput');
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
                    <TextInput type="text" defaultValue={resource.name} requried label="Type of Resource" setter={propSetter.bind(me, 'name')} maxLength={2083} required />
                    <TextInput type="url" defaultValue={resource.url} requried label="URL" setter={propSetter.bind(me, 'url')} maxLength={2083} required />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

module.exports.schema = function () {
    return {};
};
