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
                <Dropdown options={actions} ref="action" value={action} />
                <Dropdown options={types} ref="dataType" value={dataType} />
            </div>
            /*jshint ignore: end */
        );
    }
});

module.exports = IntentForm;
