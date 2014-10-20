'use strict';

var React = require('react');

module.exports = {
    renderDeleteBtn: function () {
        /*jshint ignore: start */
        return (
            <button onClick={this.props.removeHandler} className="btn btn-link">
                <i className="fa fa-times"></i>
            </button>
        );
        /*jshint ignore: end */
    }
};
