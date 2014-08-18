/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Dropdown = require('../../input/select');

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
    /*jshint ignore: start */
    render: function () {
        var currentItem = this.props.currentItem,
            action = currentItem ? currentItem.action : '',
            dataType = currentItem ? currentItem.dataType : '';

        return (
            <div>
                <Dropdown data={actions} ref="action" value={action} />
                <Dropdown data={types} ref="dataType" value={dataType} />
                <button onClick={this.props.clearHandler} className="btn btn-primary">Clear</button>
                <button onClick={this.handleSave} className="btn btn-primary">Save</button>
            </div>
        );
    },
    
    /*jshint ignore: end */
    handleSave: function () {
        this.props.saveHandler({
            action: this.refs.action.getDOMNode().value,
            dataType: this.refs.dataType.getDOMNode().value
        });
    }
});

module.exports = IntentForm;
