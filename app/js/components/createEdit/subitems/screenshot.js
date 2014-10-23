'use strict';

var React = require('react');
var TextInput = require('../../form/TextInput');
var DeleteBtnMixin = require('./deleteBtnMixin');

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var screenshot = this.props.item,
            me = this;

        function propSetter(prop, val) {
            screenshot[prop] = val;
            me.props.setter(me.props.item);
        }

        /*jshint ignore: start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <TextInput type="url" required label="Preview Image" maxLength={2083} defaultValue={screenshot.smallImageUrl}
                        setter={propSetter.bind(me, 'smallImageUrl')} description="600px wide by 375px tall" />
                    <TextInput type="url" required label="Full Size Image" maxLength={2083} defaultValue={screenshot.largeImageUrl}
                        setter={propSetter.bind(me, 'largeImageUrl')} description="960px wide by 600px tall" />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

module.exports.schema = function () {
    return {};
};
