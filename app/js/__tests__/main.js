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

var ProfileStore = require('../stores/ProfileStore');
var ProfileMock = require('./mocks/ProfileMock');
ProfileStore.onFetchSelfCompleted(ProfileMock);

//require all tests
//This snippet was pulled from the karma-webpack README
var testsContext = require.context("..", true, /-test$/);
testsContext.keys().forEach(testsContext);
