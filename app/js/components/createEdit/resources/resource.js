/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        return (
            <div>
                <a href={this.props.item.url.val()}>{this.props.item.type.val()}</a>
                <button onClick={this.props.removeHandler} className="btn btn-primary">x</button>
            </div>
        );
    }
    /*jshint ignore:end */
});
