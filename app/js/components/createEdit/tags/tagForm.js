/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    Dropdown = require('../../input/dropdown'),
    $        = require('jquery');

module.exports = React.createClass({

    handleSave: function () {
        var data = {
            tag: $(this.getDOMNode()).find('select').val()
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
        var tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
        var currentItem = this.props.currentItem,
            tag         = currentItem ? currentItem.tag : '';

        return (
            <div>
                <Dropdown label="Select" options={tags} ref="dropdown" />
                <button onClick={this.handleSave} className="btn btn-primary">+</button>
            </div>
        );
    }
    /*jshint ignore: end */
});
