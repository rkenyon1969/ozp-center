'use strict';

var React = require('react');
var ModalLink = require('../ModalLink.jsx');

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

        return (
            <ModalLink queryParams={queryParams}>
                {this.props.children}
            </ModalLink>
        );
    }
});

module.exports = ProfileLink;
