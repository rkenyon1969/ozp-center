/** @jsx React.DOM */

var React = require('react/addons');
require('select2');

var Dropdown = React.createClass({

  render: function() {

    return this.props.data ? this.renderInputDropdown() : this.renderSelectDropdown();

  },

  renderSelectDropdown: function () {
    return (
      <select class="select2" ref="element">{ this.props.children }</select>
    );
  },


  renderInputDropdown: function () {
    return (<input class="select2" ref="element" />)
  },

  componentDidMount: function() {
    var select = $(this.refs.element.getDOMNode());
    select.select2(this.props);
  },

  componentWillUnmount: function () {
    $(this.refs.element.getDOMNode()).off('')
  }
});



module.exports = Dropdown;
