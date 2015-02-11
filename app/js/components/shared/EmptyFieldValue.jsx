'use strict';

var React = require('react');

var EmptyFieldValue = React.createClass({

    propTypes: {
        text: React.PropTypes.string,
        inline: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            text: 'Not provided!',
            inline: false
        };
    },

    render: function () {
        var text = this.props.text;

        return (
            this.props.inline ?
                <span className="text-muted">{ text }</span> :
                <p className="text-muted">{ text }</p>
        );
    }

});

module.exports = EmptyFieldValue;
