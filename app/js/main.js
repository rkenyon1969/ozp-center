/** @jsx React.DOM */
'use strict';

var APP = require('./components/createEdit');
var React = require('react');
var jQuery = require('jquery');
var Cortex = require('cortexjs');

require('bootstrap');

// Enable React developer tools
window.React = React;

window.jQuery = jQuery;
window.$ = jQuery;

var data = {
    title: 'My Application',
    descriptionShort: "This is my application's short description",
    description: "This is my application's long, long, long, long description",
    launchUrl: 'https://www.google.com',
    requirements: 'This application goes great with bacon.',
    whatIsNew: 'now includes two strips of bacon.',
    intents: [{action: 'save', dataType: 'audio'}],
    contacts: [{type: 'Technical POC', email: 'me@here.com', name: 'Morpheus', phones: ['555-5555', '555-5556']}],
    docUrls: [{type: 'Configuration Guide', url: 'https://www.google.com'}]
};

var listingCortex = new Cortex(data);

/*jshint ignore:start */
var createEditPage = React.renderComponent(
    <APP listing={listingCortex} />, document.getElementById('main')
);
/*jshint ignore:end */

listingCortex.on('update', function () {
    createEditPage.setProps({listing: listingCortex});
});
