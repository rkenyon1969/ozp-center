/** @jsx React.DOM */
var APP = require('./components/app');
var React = require('react');

// Enable React developer tools
window.React = React;

React.renderComponent(<APP />, document.getElementById('main'));
