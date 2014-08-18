/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {value: this.props.value};
    },

    handleChange: function (event) {
        this.setState({value: event.target.value});
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({value: nextProps.value});
    },

    /*jshint ignore:start */
    render: function () {
        return (
            <div>
                <label>{this.props.label}</label>
                {this.props.type === 'textarea' ?
                    this.renderTextArea() : this.renderTextInput()}
            </div>
        );
    },

    renderTextArea: function () {
        return (
            <textarea className="form-control" value={this.state.value}
                    onChange={this.handleChange}>
            </textarea>
        );
    },

    renderTextInput: function () {
        return (
            <input type="text" className="form-control" value={this.state.value}
                    onChange={this.handleChange} />
        );
    }
    /*jshint ignore:end */
});
