'use strict';

var profile = {
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
    },
    mockAdmin: function (stewardedOrganizations) {
        profile.username = 'testAdmin1';
        profile.highestRole = 'ADMIN';
        profile.isAdmin = true;
        profile.stewardedOrganizations = stewardedOrganizations || [];
        return profile;
    },
    mockOrgSteward: function (stewardedOrganizations) {
        profile.username = 'testOrgSteward1';
        profile.highestRole = 'ORG_STEWARD';
        profile.isAdmin = false;
        profile.stewardedOrganizations = stewardedOrganizations || [];
        return profile;
    },
    mockUser: function (stewardedOrganizations) {
        profile.username = 'testUser1';
        profile.highestRole = 'USER';
        profile.isAdmin = false;
        profile.stewardedOrganizations = stewardedOrganizations || [];
        return profile;
    }

};

module.exports = profile;
