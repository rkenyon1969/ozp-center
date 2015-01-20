'use strict';

var React = require('react');
var { PropTypes } = React;
var timeAgo = require('../../utils/timeAgo');

var TimeAgo = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        className: React.PropTypes.string,
        time: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            time: timeAgo(this.props.time)
        };
    },

    componentDidMount: function() {
        this.interval = setInterval(function () {
            this.setState({ time: timeAgo(this.props.time) });
        }.bind(this), 1000);
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    render: function () {
        var className = this.props.className || '';
        /* jshint ignore:start */
        return (
            <span className={ className + " TimeAgo" }>
                { timeAgo(this.props.time) }
            </span>
        );
        /* jshint ignore:end */
    }

});

module.exports = TimeAgo;
