/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        return (
            <div>
                <a href={this.props.data.url}>{this.props.data.type}</a>
                <button onClick={this.props.removeHandler} className="btn btn-primary">x</button>
            </div>
        );
    }
    /*jshint ignore:end */
});
