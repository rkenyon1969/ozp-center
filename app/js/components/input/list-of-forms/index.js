/** @jsx React.DOM */
'use strict';

var React = require('react');

var ListOfForms = React.createClass({
    render: function () {
        var ItemForm = this.props.itemForm,
            me = this,
            key = 0;

        var items = this.props.items.map(function (item) {
            var _key = key;
            key += 1;
            return (
                /*jshint ignore: start */
                <ItemForm removeHandler={me.handleDelete.bind(me, _key)}
                        key={_key} item={item} />
                /*jshint ignore: end */
            );
        });

        return this.transferPropsTo(
            /*jshint ignore: start */
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {items}
                <button className="btn btn-primary" onClick={this.handleNew}>Add</button>
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

    handleDelete: function (key) {
        this.props.items.removeAt(key);
    },

    handleNew: function () {
        var Item = this.props.itemSchema;
        this.props.items.push(new Item({}));
    }
});

module.exports = ListOfForms;
