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

                <label className="switch"><input ref="singletonCheck" type="checkbox" onClick={()=>{this.handleToggle();}} className="ios brand-success"
                     defaultChecked={this.props.value}/>

                <div className="track">
                  <div className="knob"></div>
                </div>

            </label>
        </div>
      );
  },
  handleToggle: function(){
    var items = this.refs.singletonCheck.getDOMNode().checked || false;
    this.props.setter(items);
  }
});

module.exports = Toggle;
