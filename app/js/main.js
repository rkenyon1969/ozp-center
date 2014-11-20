'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}
var React = require('react');
var jQuery = require('jquery');
require('bootstrap');
var _ = require('./utils/_');
var ProfileActions = require('./actions/ProfileActions');

window.jQuery = jQuery;
window.$ = jQuery;
window.React = React;

// Enable withCredentials for all requests
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
        withCredentials: true
    };
});

var Routes = require('./components/Routes');

var isMounted = false;
var mount = function () {
    isMounted = true;
    React.renderComponent(Routes, document.getElementById('main'));
};

ProfileActions.selfFetched.listen(_.once(mount));
ProfileActions.fetchSelfFailed.listen(_.once(function () {
    if (!isMounted) {
        alert('Something went wrong. Try again!');
    }
}));
ProfileActions.fetchSelf();
