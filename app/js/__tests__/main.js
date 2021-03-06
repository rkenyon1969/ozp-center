'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}
var React = require('react');
var jQuery = require('jquery');

window.jQuery = jQuery;
window.$ = jQuery;
window.React = React;
window.moment = require('moment');
window.Tether = require('tether');

var ProfileMock = require('./mocks/ProfileMock');

//fake the loading of the current user's information
ProfileMock.init();

//require all tests
//This snippet was pulled from the karma-webpack README
var testsContext = require.context("..", true, /-test$/);
testsContext.keys().forEach(testsContext);
