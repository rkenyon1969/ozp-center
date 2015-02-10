'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}
var React = require('react');
var jQuery = require('jquery');
require('bootstrap');

window.jQuery = jQuery;
window.$ = jQuery;
window.React = React;

var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ProfileMock = require('./mocks/ProfileMock');

//fake the loading of the current user's information
SelfStore.handleProfileChange(jQuery.Deferred().resolve(ProfileMock).promise());

//require all tests
//This snippet was pulled from the karma-webpack README
var testsContext = require.context("..", true, /-test$/);
testsContext.keys().forEach(testsContext);
