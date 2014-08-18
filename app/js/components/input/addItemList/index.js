/** @jsx React.DOM */
'use strict';

var React = require('react'),
    merge = require('react/lib/merge');

module.exports = React.createClass({
    getInitialState: function () {
        return {items: [], currentItem: null};
    },

    handleSave: function (key, data) {
        var oldItems = this.state.items,
            newItems;

        if(key || key === 0) {
            newItems = oldItems.map(function (item) {
                if (item.key === key) {
                    return merge(data, {key: item.key});
                } else {
                    return item;
                }
            });
        } else {
            newItems = oldItems.concat(merge(data, {key: oldItems.length}));
        }

        this.setState({items: newItems, currentItem: null});
    },

    handleEdit: function (key) {
        var currentItem;
        this.state.items.forEach(function (intent) {
            if(intent.key === key) {
                currentItem = intent;
            }
        });

        this.setState({currentItem: currentItem});
    },

    handleClear: function () {
        this.setState({currentItem: null});
    },

    handleDelete: function (key) {
        var oldItems = this.state.items;
        var newItems = oldItems.filter(function (item) {
            return item.key !== key;
        });

        this.setState({items: newItems || []});
    },

    /*jshint ignore:start */
    render: function () {
        var ItemType = this.props.itemType;
        var items = this.state.items.map(function (item) {
            return (
                <ItemType removeHandler={this.handleDelete.bind(this, item.key)}
                        editHandler={this.handleEdit.bind(this, item.key)}
                        key={item.key} data={item} />
            );
        }, this);

        var ItemForm    = this.props.itemFormType,
            currentItem = this.state.currentItem,
            key         = currentItem && currentItem.key;

        return this.transferPropsTo(
            <div>
                <ItemForm currentItem={currentItem}
                        clearHandler={this.handleClear}
                        saveHandler={this.handleSave.bind(this, key)} />
                {items}
            </div>
        );
    }
    /*jshint ignore:end */
});
