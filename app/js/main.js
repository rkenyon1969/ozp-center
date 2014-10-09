/** @jsx React.DOM */
'use strict';

var React = require('react');
var jQuery = require('jquery');

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
        withCredentials: true
    };
});

require('bootstrap');

// Enable React developer tools
window.React = React;
window.jQuery = jQuery;
window.$ = jQuery;

require('./components/app');