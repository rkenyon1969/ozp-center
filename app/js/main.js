'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}
var React = require('react');
var jQuery = require('jquery');
var Router = require('react-router');
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
    Router.run(Routes, function (Handler) {
        /* jshint ignore:start */
        React.render(<Handler />, document.getElementById('main'));
        /* jshint ignore:end */
    });
};

ProfileActions.selfLoaded.listen(_.once(mount));
ProfileActions.fetchSelfFailed.listen(_.once(function () {
    if (!isMounted) {
        alert('Something went wrong. Try again!');
    }
}));
ProfileActions.fetchSelf();
