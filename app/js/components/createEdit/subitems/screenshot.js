/** @jsx React.DOM */
'use strict';

var React          = require('react'),
    TextInput      = require('../../form/textInput'),
    DeleteBtnMixin = require('./deleteBtnMixin'),
    dataBinder     = require('../../../utils/binder');

module.exports = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var screenshot = this.props.item;
        var binder = function (cortex) {
            return dataBinder(function(){return cortex.val();}, function(val){cortex.set(val);});
        };

        /*jshint ignore: start */
        return (
            <div className="row screenshot-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <TextInput type="url" required label="Preview Image" maxLength={2083}
                            dataBinder={binder(screenshot.smallImageUrl)} description="600px wide by 375px tall" />
                    <TextInput type="url" required label="Full Size Image" maxLength={2083}
                            dataBinder={binder(screenshot.largeImageUrl)} description="960px wide by 600px tall" />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});
