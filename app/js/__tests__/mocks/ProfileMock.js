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
    mockAdmin: function () {
        profile.highestRole = 'ADMIN';
        profile.isAdmin = true;
    },
    mockOrgSteward: function () {
        profile.highestRole = 'ORG_STEWARD';
        profile.isAdmin = false;
    },
    mockUser: function () {
        profile.highestRole = 'USER';
        profile.isAdmin = false;
    }

};

module.exports = profile;
