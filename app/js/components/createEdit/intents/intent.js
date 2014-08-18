/** @jsx React.DOM */
'use scrict';

var React = require('react');

var Intent = React.createClass({
    /*jshint ignore: start */
    render: function () {
        return (
            <div>
                <div className="col-sm-4">{this.props.item.action.val()}</div>
                <div className="col-sm-4">{this.props.item.dataType.val()}</div>
                <div className="col-sm-4">
                    <button onClick={this.props.editHandler}>Edit</button>
                    <button onClick={this.props.removeHandler}>Remove</button>
                </div>
            </div>
        );
    }
    /*jshint ignore:end */
});

module.exports = Intent;
