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
                transition.abort();
                transition.redirect('/');
            }
        }
    }

};

module.exports = AdminRouteMixin;
