'use strict';

var React = require('react');

var Time = React.createClass({
    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    render() {
        var { date } = this.props;
        return (
            <span className="Date">{date.toTimeString()}</span>
        );
    }
});

module.exports = Time;
