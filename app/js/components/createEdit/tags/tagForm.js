/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Chosen    = require('react-chosen');

module.exports = React.createClass({

    handleSave: function () {
        var data = {
            tag: $('#tag_chosen').val()
        };

        this.props.saveHandler(data);
        this.handleClear();
    },

    handleClear:function() {
        $('#tag_chosen').val('').trigger('liszt:updated');
        this.props.clearHandler();
    },

    /*jshint ignore: start */
    render: function () {
        var currentItem = this.props.currentItem,
            tag         = currentItem ? currentItem.tag : '';

        return (
            <div>
                <Chosen data-placeholder="Add Tag" id="tag_chosen" width="100%">
                    <option></option>
                    <option value="tag1">tag1</option>
                    <option value="tag2">tag2</option>
                    <option value="tag3">tag3</option>
                    <option value="tag4">tag4</option>
                    <option value="tag5">tag5</option>
                    <option value="tag6">tag6</option>
                </Chosen>

                <button onClick={this.handleSave} className="btn btn-primary">+</button>
            </div>
        );
    }
    /*jshint ignore: end */
});
