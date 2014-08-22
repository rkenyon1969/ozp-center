/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Dropdown    = require('../../input/dropdown');

module.exports = React.createClass({

    handleSave: function () {
        // var item = {
        //     action: $('#action_chosen').val(),
        //     dataType: $('#dataType_chosen').val()
        // };
        //
        // this.props.saveHandler(item);
        // this.handleClear();
    },

    handleClear:function() {
        // $('#action_chosen').val('').trigger('liszt:updated');
        // $('#dataType_chosen').val('').trigger('liszt:updated');
        this.props.clearHandler();
    },

    /*jshint ignore: start */
    render: function () {
        var actions = ['edit', 'pick', 'save', 'share', 'subscribe', 'view'];
        var types = ['audio', 'image', 'json', 'text', 'uri', 'video'];

        var currentItem = this.props.currentItem,
            action      = currentItem ? currentItem.action : '',
            dataType    = currentItem ? currentItem.dataType : '';

        return (
            <div>
                <div className="col-sm-8">
                    <Dropdown options={actions} ref="action" value={action} />
                    <Dropdown options={types} ref="dataType" value={dataType} />
                </div>

                <div className="col-sm-4">
                    <button className="btn btn-primary" onClick={this.props.removeHandler}>Remove</button>
                </div>
            </div>
        );
    }
    /*jshint ignore: end */
});
