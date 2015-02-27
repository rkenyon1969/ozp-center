'use strict';

var SelfStore = require('ozp-react-commons/stores/SelfStore');

var currentUser;
SelfStore.listen((profileData) => {
    currentUser = profileData.currentUser;
});

var transitionToHome = (transition) => {
    window.alert('You are not authorized to view this page.');
    transition.redirect('/');
};

var Admin = {
    statics: {
        willTransitionTo(transition) {
            if (!(currentUser && currentUser.isAdmin())) {
                transitionToHome(transition);
            }
        }
    }
};

var OrgSteward = {
    statics: {
        willTransitionTo(transition, params, query) {
            var { org } = params;
            if (org && !currentUser.isOrgSteward(org)) {
                transitionToHome(transition);
            }
        }
    }
};

module.exports.Admin = Admin;
module.exports.OrgSteward = OrgSteward;
