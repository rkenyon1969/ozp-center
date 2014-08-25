/** @jsx React.DOM */
'use strict';

var APP = require('./components/app');
var React = require('react');
var jQuery = require('jquery');

require('bootstrap');

// Enable React developer tools
window.React = React;

window.jQuery = jQuery;
window.$ = jQuery;

/*jshint ignore:start */
React.renderComponent(
    <APP />, document.getElementById('main')
);
/*jshint ignore:end */
