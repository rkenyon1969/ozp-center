/** @jsx React.DOM */
'use strict';

var React          = require('react'),
    TextInput      = require('../../form/textInput'),
    DeleteBtnMixin = require('./deleteBtnMixin'),
    dataBinder     = require('../../../utils/binder');

module.exports = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var resource = this.props.item;
        var binder = function (cortex) {
            return dataBinder(function(){return cortex.val();}, function(val){cortex.set(val);});
        };
        
        /*jshint ignore: start */
        return (
            <div className="row resource-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <TextInput type="url" requried label="Type of Resource" dataBinder={binder(resource.name)} maxLength={2083} required />
                    <TextInput type="url" requried label="URL" dataBinder={binder(resource.url)} maxLength={2083} required />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});
