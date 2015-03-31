'use strict';

var createActions = require('../utils/createActions');
var ProfileApi = require('../webapi/Profile');

var ProfileActions = createActions({

    fetchOrgStewards() {
        ProfileApi.getStewards()
            .then(ProfileActions.fetchOrgStewardsCompleted);
    }

});

module.exports = ProfileActions;
