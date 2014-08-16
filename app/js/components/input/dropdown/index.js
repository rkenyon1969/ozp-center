/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
require('select2');

var Dropdown = React.createClass({

  propTypes: {
    children: React.PropTypes.array,
    data: React.PropTypes.array,
    multiple: React.PropTypes.bool,
    // allowClear: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    // onChange: React.PropTypes.func,
    // defaultValue: React.PropTypes.string,
    // minimumInputLength: React.PropTypes.number,
    // ajax: React.PropTypes.object,
    className: React.PropTypes.string
  },

  render: function() {

    return this.props.data ? this.renderInputDropdown() : this.renderSelectDropdown();

  },

  /*jshint ignore:start */
  renderSelectDropdown: function () {
    return (
      <select className="select2" ref="element">
        { this.props.children }
      </select>
    );
  },

  renderInputDropdown: function () {
    return (<input className="select2" ref="element" />);
  },
  /*jshint ignore:end */

  componentDidMount: function() {
    var select = $(this.refs.element.getDOMNode());
    select.select2(this.props);
  },

  componentWillUnmount: function () {
    var rootNode = this.getDOMNode();
    $(rootNode).select2('destroy');
  }
});



module.exports = Dropdown;
