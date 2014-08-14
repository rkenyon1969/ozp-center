/** @jsx React.DOM */

var React = require('react');

var Content = React.createClass({
    render: function () {
        return (
            <div className="content-section">
                <div className="row">
                    <div className="col-sm-12">
                        <a className="nav-anchor" id={this.props.id}></a>
                    </div>
                </div>
                <div className="row">
                    {this.props.children}
                    <div className="col-sm-2"></div>
                </div>
            </div>
        );
    }
});

module.exports = Content;
