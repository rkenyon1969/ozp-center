'use strict';

if (!Object.assign) {
    Object.assign = require('object-assign');
}

require('./services');

var React = require('react');
var jQuery = require('jquery');
var Router = require('react-router');
require('bootstrap');
require('classification');
var _ = require('./utils/_');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ProfileActions = require('ozp-react-commons/actions/ProfileActions');
var { METRICS_URL } = require('ozp-react-commons/OzoneConfig');

window.jQuery = jQuery;
window.$ = jQuery;
window.React = React;
window.moment = require('moment');
window.Tether = require('tether');

// Enable withCredentials for all requests
$.ajaxPrefilter(function (options) {
    options.xhrFields = {
        withCredentials: true
    };
});

var Routes = require('./components/Routes.jsx'),
    routes = Routes();


/*
 * Render everything when we get our profile
 */
SelfStore.listen(_.once(function(profileData) {
    Router.run(routes, function (Handler) {
        var main = document.getElementById('main');

        if (profileData.currentUser) {
            React.render(<Handler />, main);
        }
        else if (profileData.currentUserError) {
            React.unmountComponentAtNode(main);
            alert('Something went wrong. Try again!');
        }
    });
}));

ProfileActions.fetchSelf();

(function initPiwik() {
    var _paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    (function() {
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0],
            u = METRICS_URL;

        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', 1]);

        g.type='text/javascript';
        g.async=true;
        g.defer=true;
        g.src=u+'piwik.js';
        s.parentNode.insertBefore(g,s);
    })();

    window._paq = _paq;
})();

// Classification
$(function() {
    $(document).classification({
        level: 'U'
    });
});
