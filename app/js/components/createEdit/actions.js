/** @jsx React.DOM */

var React = require('react');

var ActionBar = React.createClass({
    render: function () {
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
    }
});

module.exports = ActionBar;
