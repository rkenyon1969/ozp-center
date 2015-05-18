'use strict';

var React = require('react');
//var InputMixin = require('./InputMixin.jsx');

var Toggle = React.createClass({
    render: function () {
        return (
          <div>
              <label className="switchLabel">{this.props.label}</label><br />
                  <p>{this.props.description}</p>
                  <label className="switch"><input type="checkbox" ref="checkbox" className="ios brand-success"
                      checked={this.props.checked} onChange={this.props.onChange} />

                  <div className="track">
                    <div className="knob"></div>
                  </div>

              </label>
          </div>
        );
    }
});

module.exports = Toggle;
