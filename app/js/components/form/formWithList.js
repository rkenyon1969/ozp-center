'use strict';

var React = require('react');

/**
    Renders a list of items and a form to add new items to the list.

*/
var FormWithList = React.createClass({
    render: function () {
        var key = 0,
            ItemMarkup = this.props.itemMarkup,
            me = this;

        var items = this.props.items.map(function (item) {
            var _key = key;
            key += 1;
            return (
                /*jshint ignore: start */
                <ItemMarkup removeHandler={me.handleDelete.bind(me, _key)}
                        editHandler={me.handleEdit.bind(me, _key)}
                        key={_key} item={item} />
                /*jshint ignore: end */
            );
        });

        var ItemForm = this.props.itemForm,
            formItem = this.state.formItem,
            currentKey = this.state.currentKey;

        return this.transferPropsTo(
            /*jshint ignore: start */
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                <ItemForm item={formItem}
                        clearHandler={this.handleClear}
                        saveHandler={this.handleSave.bind(this, currentKey)} />
                {items}
            </div>
            /*jshint ignore: end */
        );
    },

    renderLabel: function () {
        /*jshint ignore: start */
        return <label>{this.props.label}</label>;
        /*jshint ignore: end */
    },

    renderDescription: function () {
        /*jshint ignore: start */
        return <p className="small">{this.props.description}</p>;
        /*jshint ignore: end */
    },

    getInitialState: function () {
        return {formItem: null, currentKey: -1};
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
        this.setState({formItem: this.props.items[key].val(), currentKey: key});
    },

    handleClear: function () {
        this.setState({formItem: null, currentKey: -1});
    },

    handleDelete: function (key) {
        this.props.items.removeAt(key);
    }
});

module.exports = FormWithList;
