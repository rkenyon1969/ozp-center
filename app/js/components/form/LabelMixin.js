'use strict';

var React = require('react');
var {classSet} = React.addons;

module.exports = {

    renderLabel: function () {
        var classes = classSet({'input-optional': this.props.optional});
        /*jshint ignore:start */
        return <label htmlFor={this.props.id} className={classes}>{this.props.label}</label>;
        /*jshint ignore:end */
    },

    renderDescription: function () {
        /*jshint ignore:start */
        return <p className="small">{this.props.description}</p>;
        /*jshint ignore:end */
    },

    renderErrorMsg: function () {
        /*jshint ignore:start */
        return <p className="help-block small">{this.props.errorMsg}</p>;
        /*jshint ignore:end */
    }
};
