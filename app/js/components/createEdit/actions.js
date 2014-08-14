/** @jsx React.DOM */
'use strict';

var React = require('react');

var ActionBar = React.createClass({
    render: function () {
        /*jshint ignore:start */
        return (
            <div id="actions">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="btn-group">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = ActionBar;
