/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var EmptyFieldValue = React.createClass({

    render: function () {
        var text = this.props.text || 'Not provided!';

        /* jshint ignore:start */
        return (
            this.props.inline ?
                <span className="text-muted">{ text }</span> :
                <p className="text-muted">{ text }</p>
        );
        /* jshint ignore:end */
    }

});

module.exports = EmptyFieldValue;