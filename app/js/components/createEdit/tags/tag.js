/** @jsx React.DOM */
'use scrict';

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore: start */
    render: function () {
        return (
            <div className="tag">
                <span>{this.props.data.tag}</span>
                <button onClick={this.props.removeHandler}>-</button>
            </div>
        );
    }
    /*jshint ignore:end */
});
