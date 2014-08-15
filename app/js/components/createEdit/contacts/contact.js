/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        return (
            <div>
                {this.props.data.value}
            </div>
        );
    }
    /*jshint ignore:end */
});
