'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}
var React = require('react');
var jQuery = require('jquery');
require('bootstrap');

//require all tests
//This snippet was pulled from the karma-webpack README
var testsContext = require.context("..", true, /-test$/);
testsContext.keys().forEach(testsContext);

window.jQuery = jQuery;
window.$ = jQuery;
window.React = React;
