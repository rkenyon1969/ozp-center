/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Input = require('../../form/input');

module.exports = React.createClass({
    render: function () {
        var resource = this.props.item;
        /*jshint ignore: start */
        return (
            <div className="row resource-card">
                <div className="col-sm-12">
                    <button onClick={this.props.removeHandler} className="btn btn-link">
                        <i className="fa fa-times"></i>
                    </button>
                    <Input label="Type of Resource" itemValue={resource.name} />
                    <Input label="URL" itemValue={resource.url} />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});
