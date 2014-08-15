/** @jsx React.DOM */
'use scrict';

var React    = require('react');

module.exports = React.createClass({
    /*jshint ignore: start */
    render: function () {
        return (
            <div key={this.props.key}>
                <div className="col-sm-4">{this.props.data.action}</div>
                <div className="col-sm-4">{this.props.data.dataType}</div>
                <div className="col-sm-4">
                    <button onClick={this.props.editHandler}>Edit</button>
                    <button onClick={this.props.removeHandler}>Remove</button>
                </div>
            </div>
        );
    }
    /*jshint ignore:end */
});
