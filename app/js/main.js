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
$.ajaxPrefilter(function ( options, originalOptions, jqXHR ) {
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
