/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Select           = require('../../form/select'),
    DeleteBtnMixin   = require('./deleteBtnMixin'),
    ConfigStoreMixin = require('../../../stores/ConfigStore').mixin,
    dataBinder       = require('../../../utils/binder');

module.exports = React.createClass({
    mixins: [DeleteBtnMixin, ConfigStoreMixin],

    render: function () {
        var optionMap = function (json) {
            /*jshint ignore:start */
            return <option value={json.id}>{json.title}</option>;
            /*jshint ignore:end */
        };

        var actions = this.state.config.intentActions.map(optionMap);
        var dataTypes = this.state.config.intentDataTypes.map(optionMap);

        var intent = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Select required label="Action" dataBinder={dataBinder.idBinder(intent.action.id)}>
                        {actions}
                    </Select>
                    <Select required label="Data Type" dataBinder={dataBinder.idBinder(intent.dataType.id)}>
                        {dataTypes}
                    </Select>
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});
