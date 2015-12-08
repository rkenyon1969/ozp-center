'use strict';

var React = require('react');

var Toggle = React.createClass({
  getInitialState: function(){
    return {
      value: this.props.value || false
    };
  },
  render: function () {
      var isEnabled = this.state.value ? 'Enabled ' : 'Disabled ';
      var fullExplanation = isEnabled + this.props.explanation[1];
      if (!this.state.value) {
          fullExplanation = isEnabled + this.props.explanation[0];
      }

      return (
          <div id={this.props.id}>
              <label className="switchLabel">{this.props.label}</label><br />
              <p className="small">{this.props.description}</p>
              <label className="createEditSwitch">
                  <input ref="checkbox"
                         type="checkbox"
                         onClick={()=>{this.handleToggle();}}
                         className="ios brand-success"
                         defaultChecked={this.props.value}/>
                  <div className="track">
                      <div className="knob"></div>
                  </div>
              </label>
              <p className="switchExplain">{fullExplanation}</p>
          </div>
      );
  },
  handleToggle: function(){
    var items = this.refs.checkbox.getDOMNode().checked || false;
    this.props.setter(items);
    this.setState({value: this.refs.checkbox.getDOMNode().checked || false});
  }
});

module.exports = Toggle;
