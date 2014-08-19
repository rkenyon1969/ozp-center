/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Dropdown = require('../../input').Select;

var actions = [
    'edit',
    'pick',
    'save',
    'share',
    'subscribe',
    'view'
];

var types = [
    'audio',
    'image',
    'json',
    'text',
    'uri',
    'video'
];

var IntentForm = React.createClass({
    render: function () {
        var intent = this.props.item,
            action = intent ? intent.action : 'edit',
            dataType = intent ? intent.dataType : 'audio';

        return (
            /*jshint ignore: start */
            <div>
                <div className="col-sm-10">
                    <Dropdown options={actions} ref="action" value={action} />
                    <Dropdown options={types} ref="dataType" value={dataType} />
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary" onClick={this.props.removeHandler}>Remove</button>
                </div>
            </div>
            /*jshint ignore: end */
        );
    }
});

module.exports = IntentForm;
