'use strict';

var React = require('react');
var ModalLink = require('../ModalLink');

var ProfileLink = React.createClass({
    propTypes: {
        profileId: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]).isRequired
    },

    render: function() {
        var queryParams = {
                profile: this.props.profileId,
            };

        /*jshint ignore:start */
        return (
            <ModalLink queryParams={queryParams}>
                {this.props.children}
            </ModalLink>
        );
        /*jshint ignore:end */
    }
});

module.exports = ProfileLink;
