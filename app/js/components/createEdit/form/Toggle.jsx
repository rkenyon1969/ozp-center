'use strict';

var React = require('react');

var Toggle = React.createClass({
  getInitialState: function(){
    return {
      value: false
    };
  },
  render: function () {
      return (
        <div>
            <label className="switchLabel">{this.props.label}</label><br />
                <p>{this.props.description}</p>


                <h5>{this.state.value ? 'Enabled': 'Disabled'}</h5>
                <p>{this.state.value? this.props.explanation[1] : this.props.explanation[0]}</p>
                <label className="switch"><input ref="checkbox" type="checkbox" onClick={()=>{this.handleToggle();}} className="ios brand-success"
                     defaultChecked={this.props.value}/>

                <div className="track">
                  <div className="knob"></div>
                </div>

            </label>
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
