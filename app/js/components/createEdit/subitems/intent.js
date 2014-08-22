/** @jsx React.DOM */
'use strict';

var React  = require('react'),
    Reflux = require('reflux'),
    Select = require('../../form/select'),
    merge  = require('react/lib/merge');

var ConfigStore = require('../../../stores/ConfigStore');

module.exports.form = React.createClass({
    mixins: [ Reflux.ListenerMixin ],

    render: function () {
        var dataTypes = [],
            actions = [];
        if (!this.state.config.loading) {
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
                    <Select label="Action" options={actions} value={intent.action.id} />
                    <Select label="Data Type" options={dataTypes} value={intent.dataType.id} />
                </div>
            </div>
        );
        /*jshint ignore: end */
    },

    renderDeleteBtn: function () {
        /*jshint ignore: start */
        return (
            <button onClick={this.props.removeHandler} className="btn btn-link">
                <i className="fa fa-times"></i>
            </button>
        );
        /*jshint ignore: end */
    },

    getInitialState: function () {
        return {config: ConfigStore.getConfig()};
    },

    _onChange: function () {
        this.replaceState({config: ConfigStore.getConfig()});
    },

    componentDidMount: function () {
        this.listenTo(ConfigStore, this._onChange);
    }
});

var schema = {
    dataType: {id: null},
    action: {id: null}
};

function Intent(json) {
    return merge(schema, json);
}

module.exports.schema = Intent;
