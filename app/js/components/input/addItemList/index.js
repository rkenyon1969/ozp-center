/** @jsx React.DOM */
'use strict';

var React = require('react');

/**
    Renders a list of items and a form to add new items to the list.

*/
module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        var key = 0,
            ItemType = this.props.itemType,
            me = this;

        var items = this.props.items.map(function (item) {
            var _key = key;
            key += 1;
            return (
                <ItemType removeHandler={me.handleDelete.bind(me, _key)}
                        editHandler={me.handleEdit.bind(me, _key)}
                        key={_key} item={item} />
            );
        });

        var ItemForm = this.props.itemFormType,
            currentItem = this.state.currentItem,
            currentKey = this.state.currentKey;

        return this.transferPropsTo(
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                <ItemForm currentItem={currentItem}
                        clearHandler={this.handleClear}
                        saveHandler={this.handleSave.bind(this, currentKey)} />
                {items}
            </div>
        );
    },

    renderLabel: function () {
        return <label>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p className="small">Title of the listing</p>;
    },

    /*jshint ignore:end */

    getInitialState: function () {
        return {currentItem: null, currentKey: -1};
    },

    handleSave: function (key, data) {
        if (key > -1) {
            this.props.items[key].set(data);
        } else {
            this.props.items.push(data);
        }
        this.handleClear();
    },

    handleEdit: function (key) {
        this.setState({currentItem: this.props.items[key].val(), currentKey: key});
    },

    handleClear: function () {
        this.setState({currentItem: null, currentKey: -1});
    },

    handleDelete: function (key) {
        this.props.items.removeAt(key);
    }
});
