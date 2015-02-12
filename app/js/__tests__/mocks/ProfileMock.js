'use strict';

var SelfStore = require('ozp-react-commons/stores/SelfStore');
var $ = require('jquery');

Object.assign = require('object-assign');

var profileBase = Object.freeze({
    'stewardedOrganizations': [],
    'organizations': [],
    'bio': '',
    'lastLogin': '2015-01-14T20:57:19.129+0000',
    'highestRole': 'ADMIN',
    'createdDate': '2015-01-07T17:16:51.000+0000',
    'email': 'testAdmin1@ozonePerfTesting.org',
    'displayName': 'testAdmin1',
    'username': 'testAdmin1',
    'id': 2,
    '_links': {
        'curies': {
            'href': 'http://ozoneplatform.org/docs/rels/{rel}',
            'name': 'ozp',
            'templated': true
        },
        'ozp:application-library': {
            'href': 'https://www.owfgoss.org/ng/dev/mp/api/profile/2/library'
        },
        'ozp:user-data': {
            'href': 'https://www.owfgoss.org/ng/dev/mp/api/profile/2/data'
        },
        'self': {
            'href': 'https://www.owfgoss.org/ng/dev/mp/api/profile/2'
        }
    }
});

function triggerStore(profile) {
    SelfStore.handleProfileChange($.Deferred().resolve(profile).promise());
}

module.exports = {
    mockAdmin: function (stewardedOrganizations) {
        var profile = Object.assign({}, profileBase, {
            username: 'testAdmin1',
            highestRole: 'ADMIN',
            stewardedOrganizations: stewardedOrganizations || []
        });

        triggerStore(profile);

        return profile;
    },

    mockOrgSteward: function (stewardedOrganizations) {
        var profile = Object.assign({}, profileBase, {
            username: 'testOrgSteward1',
            highestRole: 'ORG_STEWARD',
            stewardedOrganizations: stewardedOrganizations || []
        });

        triggerStore(profile);

        return profile;
    },

    mockUser: function (stewardedOrganizations) {
        var profile = Object.assign({}, profileBase, {
            username: 'testUser1',
            highestRole: 'USER',
            stewardedOrganizations: stewardedOrganizations || []
        });

        triggerStore(profile);

        return profile;
    },

    restore: function () {
        this.mockAdmin();
    },

    init: function() {
        this.mockAdmin();
    },

    getBaseUser: function() {
        return profileBase;
    }
};
