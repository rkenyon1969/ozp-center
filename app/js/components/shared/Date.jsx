'use strict';

var React = require('react');
var moment = require('moment');

var _Date = React.createClass({
    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    render() {
        var { date } = this.props;
        return (
            <span className="Date">{moment(date).format('MM/DD/YY')}</span>
        );
    }
});

module.exports = _Date;
