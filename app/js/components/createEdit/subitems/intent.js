/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Input            = require('../../form').Input,
    merge            = require('react/lib/merge'),
    DeleteBtnMixin   = require('./deleteBtnMixin'),
    ConfigStoreMixin = require('../../../stores/ConfigStore').mixin;

module.exports.form = React.createClass({
    mixins: [DeleteBtnMixin, ConfigStoreMixin],

    render: function () {
        var dataTypes = [],
            actions = [];

        if (this.state.config) {
            actions = this.state.config.intentActions.map(function (json) {
                return {name: json.title, value: json.id};
            });
            dataTypes = this.state.config.intentDataTypes.map(function (json) {
                return {value: json.id, name: json.title};
            });
        }

        var intent = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row intent-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Input elementType="select" required label="Action" options={actions} itemValue={intent.action.id} />
                    <Input elementType="select" required label="Data Type" options={dataTypes} itemValue={intent.dataType.id} />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});

function Intent(json) {
    var schema = {
        dataType: {id: null},
        action: {id: null}
    };

    return merge(schema, json);
}

module.exports.schema = Intent;
