/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        return this.props.type === 'textarea' ?
            this.renderTextArea() : this.renderTextInput();
    },

    /*jshint ignore:start */
    renderTextArea: function () {
        return (
            <textarea className="form-control" value={this.props.value.val()}
                    onChange={this.handleChange}>
            </textarea>
        );
    },

    renderTextInput: function () {
        return (
            <input type="text" className="form-control" value={this.props.value.val()}
                    onChange={this.handleChange} />
        );
    },
    /*jshint ignore:end */

    handleChange: function (event) {
        this.props.value.set(event.target.value);
    }
});
