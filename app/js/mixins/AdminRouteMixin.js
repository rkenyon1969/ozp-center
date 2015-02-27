'use strict';

var SelfStore = require('ozp-react-commons/stores/SelfStore');

var currentUser;
SelfStore.listen(function(profileData) {
    currentUser = profileData.currentUser;
});

var AdminRouteMixin = {

    statics: {
        willTransitionTo: function (transition) {
            if (!(currentUser && currentUser.isAdmin())) {
                window.alert('You are not authorized to view this page.');
                transition.redirect('/');
            }
        }
    }

};

module.exports = AdminRouteMixin;
