/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Chosen    = require('react-chosen');

module.exports = React.createClass({

    handleSave: function () {
        var data = {
            action: $('#action_chosen').val(),
            dataType: $('#dataType_chosen').val()
        };

        this.props.saveHandler(data);
        this.handleClear();
    },

    handleClear:function() {
        $('#action_chosen').val('').trigger('liszt:updated');
        $('#dataType_chosen').val('').trigger('liszt:updated');
        this.props.clearHandler();
    },

    /*jshint ignore: start */
    render: function () {
        var currentItem = this.props.currentItem,
            action      = currentItem ? currentItem.action : '',
            dataType    = currentItem ? currentItem.dataType : '';

        return (
            <div>
                <Chosen data-placeholder="Select Action" id="action_chosen" width="100%">
                    <option></option>
                    <option value="edit">edit</option>
                    <option value="pick">pick</option>
                    <option value="save">save</option>
                    <option value="share">share</option>
                    <option value="subscribe">subscribe</option>
                    <option value="view">view</option>
                </Chosen>

                <Chosen data-placeholder="Select Type" id="dataType_chosen" width="100%">
                    <option></option>
                    <option value="audio">audio</option>
                    <option value="image">image</option>
                    <option value="json">json</option>
                    <option value="text">text</option>
                    <option value="uri">uri</option>
                    <option value="video">view</option>
                </Chosen>
                <button onClick={this.handleClear} className="btn btn-primary">Clear</button>
                <button onClick={this.handleSave} className="btn btn-primary">Save</button>
            </div>
        );
    }
    /*jshint ignore: end */
});
