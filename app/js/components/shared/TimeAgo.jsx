'use strict';

var React = require('react');
var timeAgo = require('../../utils/timeAgo');

var TimeAgo = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        className: React.PropTypes.string,
        time: React.PropTypes.string.isRequired,
        autoUpdate: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            autoUpdate: false
        };
    },

    getInitialState: function () {
        return {
            time: timeAgo(this.props.time)
        };
    },

    componentDidMount: function() {
        if (this.props.autoUpdate === true) {
            this.setAutoUpdateInterval();
        }
    },

    componentWillUnmount: function () {
        this.clearAutoUpdatInterval();
    },

    render: function () {
        var className = this.props.className || '';
        return (
            <em className={ className + " TimeAgo" }>
                { timeAgo(this.props.time) }
            </em>
        );
    },

    setAutoUpdateInterval: function () {
        this.interval = setInterval(function () {
            this.setState({ time: timeAgo(this.props.time) });
        }.bind(this), 1000);
    },

    clearAutoUpdatInterval: function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

});

module.exports = TimeAgo;
