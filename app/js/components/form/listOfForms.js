/** @jsx React.DOM */
'use strict';

var React = require('react');

var ListOfForms = React.createClass({
    propTypes: {
         /**
            A Cortex wrapped array - either empty or containing the existing items
          */
         items: React.PropTypes.object.isRequired,

         /**
            The schema describing the items in the list
          */
         itemSchema: React.PropTypes.func.isRequired,

         /**
            A React class that renders the form markup for an instance of itemSchema.
          */
         itemForm: React.PropTypes.func.isRequired,

        /**
            The indexes of any items which cannot be deleted from the list. In
            addition to checking the index before deleting in the handleDelete
            method, the ListOfForms component will also pass a locked=true
            prop to the forms at locked indexes which should be used to customize
            the form's markup as needed.
         */
        locked: React.PropTypes.arrayOf(React.PropTypes.number),

        /**
            Will be rendered as a <p> describing this component
         */
        description: React.PropTypes.string,

        /**
            Will be rendered as a <label> - the name of this component.
         */
        label: React.PropTypes.string,

        config: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {locked: [], config: {}};
    },

    render: function () {
        var ItemForm = this.props.itemForm,
            me = this,
            key = 0;

        var items = this.props.items.map(function (item) {
            var _key = key;
            key += 1;
            return (
                /*jshint ignore: start */
                <ItemForm locked={me.props.locked.indexOf(_key) > -1}
                        removeHandler={me.handleDelete.bind(me, _key)}
                        key={_key} item={item} config={me.props.config} />
                /*jshint ignore: end */
            );
        });

        return this.transferPropsTo(
            /*jshint ignore: start */
            <div className="item-form-list create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                <div className="input-form-container">
                    {items}
                </div>
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

    handleDelete: function (key, event) {
        event.preventDefault();
        if (this.props.locked.indexOf(key) === -1) {
            this.props.items.removeAt(key);
        }
    },

    handleNew: function (event) {
        event.preventDefault();
        var Item = this.props.itemSchema;
        this.props.items.push(new Item({}));
        return false;
    }
});

module.exports = ListOfForms;
