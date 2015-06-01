'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');

var Toggle = React.createClass({
  render: function () {
        return (
          <div>
              <label className="switchLabel">{this.props.label}</label><br />
                  <p>{this.props.description}</p>

                  <label className="switch"><input type="checkbox" ref="checkbox" className="ios brand-success"
                       defaultChecked={this.props.checked}/>

                  <div className="track">
                    <div className="knob"></div>
                  </div>

              </label>
          </div>
        );
    }
});

module.exports = Toggle;
