/** @jsx React.DOM */
'use strict';

var React  = require('react'),
    Chosen = require('drmonty-chosen');

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

var Chosen = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var options = this.props.options.map(function (option) {
            return <option value={option.value}>{option.name}</option>;
        });

        return (
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                <select data-placeholder={this.props.placeholder} className="form-control" value={this.value()} ref="select" multiple={this.props.multiple}>
                    {options}
                </select>
            </div>
        );
    },
    /*jshint ignore:end */

    componentDidMount: function() {
        var me = this;
        var select = $(this.refs.select.getDOMNode());
        var chosen = select.chosen();
        select.on('change', function(evt, params) {

            me.handleChange(params);

        });

        this._$chosen = chosen;
        this._$select = select;
    },

    componentWillUnmount: function () {
        this._$select.off('change');
        this._$chosen.destroy();
    },
    /*jshint ignore:start */
    renderLabel: function () {
        return <label>{this.props.label}</label>;
    },
    /*jshint ignore:end */

    /*jshint ignore:start */
    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },
    /*jshint ignore:end */

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.value)) {
            return {};
        }

        return {value: this.props.value};
    },

    handleChange: function (params) {
        var me = this;
        var title = '';
        if(params.selected){
            title = $(me.refs.select.getDOMNode()).find('option[value=' + params.selected + ']').html();
            me.addToArray({
                id: params.selected,
                title: title
            });
        } else if (params.deselected) {
            title = $(me.refs.select.getDOMNode()).find('option[value=' + params.deselected + ']').html();
            me.removeFromArray({
                id: params.deselected,
                title: title
            });
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (!isWrappedValue(nextProps.value)) {
            this.setState({value: nextProps.value});
        }
    },

    value: function () {
        if (isWrappedValue(this.props.value)) {
            return this.props.value.val();
        } else {
            return this.state.value;
        }
    },

    addToArray: function (item) {
        if (isWrappedValue(this.props.value)) {
            this.props.value.push(item);
        } else {
            this.setState({value: item});
        }
    },

    removeFromArray: function (item) {
        if (isWrappedValue(this.props.value)) {
            var index = this.props.value.findIndex(function(wi, i, w) {
                return wi.val().id === item.id;
            });

            this.props.value.removeAt(index, 1);
        } else {
            this.setState({value: item});
        }
    }
});



module.exports = Chosen;
