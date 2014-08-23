/** @jsx React.DOM */
'use strict';

var React      = require('react'),
    InputMixin = require('./inputMixin');

module.exports.TabSelect    = require('./tabSelect');
module.exports.FormWithList = require('./formWithList');
module.exports.ListOfForms  = require('./listOfForms');
module.exports.Chosen       = require('./chosen');

module.exports.Select = React.createClass({
    mixins: [InputMixin],

    /*jshint ignore:start */
    renderInputElement: function () {
        var options = this.props.options.map(function (option) {
            return <option value={option.value}>{option.name}</option>;
        });

        options.unshift(<option value="" disabled>Choose an option</option>);

        return this.transferPropsTo(
            <select className="form-control" onChange={this.handleChange} value={this.value()} multiple={this.props.multiple}>
                {options}
            </select>
        );
    },
    /*jshint ignore:end */
});

module.exports.Input = React.createClass({
    mixins: [InputMixin],

    /*jshint ignore:start */
    renderInputElement: function () {
        return this.transferPropsTo(<input className="form-control" onChange={this.handleChange} value={this.value()} />);
    },
    /*jshint ignore:end */
});

module.exports.TextArea = React.createClass({
    mixins: [InputMixin],

    /*jshint ignore:start */
    renderInputElement: function () {
        return this.transferPropsTo(<textarea className="form-control" onChange={this.handleChange} value={this.value()} />);
    },
    /*jshint ignore:end */
});
