'use strict';

var [adminReview, orgStewardReview, userReview, userReview2] = [
    {
        "id": 1,
        "author": {
            "id": 2,
            "displayName": "Test Admin 1",
            "username": "testAdmin1"
        },
        "text": "Test Admin 1 Review",
        "createdDate": "2015-01-22T17:27:30.418+0000",
        "editedDate": "2015-01-22T17:49:23.625+0000",
        "rate": 3,
        "_links": {
            "ozp:application": {
                "href": "https://localhost:8443/marketplace/api/listing/1"
            },
            "self": {
                "href": "https://localhost:8443/marketplace/api/listing/1/itemComment/1"
            },
            "via": {
                "href": "https://localhost:8443/marketplace/api/profile/2"
            }
        }
    },
    {
        "id": 2,
        "author": {
            "id": 3,
            "displayName": "Test Org Steward 1",
            "username": "testOrgSteward1"
        },
        "text": "Test Org Steward 1 Review",
        "createdDate": "2015-01-22T17:43:45.258+0000",
        "editedDate": "2015-01-22T17:49:15.856+0000",
        "rate": 2,
        "_links": {
            "ozp:application": {
                "href": "https://localhost:8443/marketplace/api/listing/1"
            },
            "self": {
                "href": "https://localhost:8443/marketplace/api/listing/1/itemComment/2"
            },
            "via": {
                "href": "https://localhost:8443/marketplace/api/profile/3"
            }
        }
    },
    {
        "id": 3,
        "author": {
            "id": 4,
            "displayName": "Test User 1",
            "username": "testUser1"
        },
        "text": "Test User 1 Review",
        "createdDate": "2015-01-22T21:01:05.645+0000",
        "editedDate": "2015-01-22T21:01:05.645+0000",
        "rate": 4,
        "_links": {
            "ozp:application": {
                "href": "https://localhost:8443/marketplace/api/listing/1"
            },
            "self": {
                "href": "https://localhost:8443/marketplace/api/listing/1/itemComment/3"
            },
            "via": {
                "href": "https://localhost:8443/marketplace/api/profile/4"
            }
        }
    },
    {
        "id": 4,
        "author": {
            "id": 4,
            "displayName": "Test User 1",
            "username": "testUser1"
        },
        "text": "Out out brief candle. Life is but a walking shadow.",
        "createdDate": "2015-01-22T21:01:05.645+0000",
        "editedDate": "2015-01-22T21:01:05.645+0000",
        "rate": 4,
        "_links": {
            "ozp:application": {
                "href": "https://localhost:8443/marketplace/api/listing/1"
            },
            "self": {
                "href": "https://localhost:8443/marketplace/api/listing/1/itemComment/4"
            },
            "via": {
                "href": "https://localhost:8443/marketplace/api/profile/4"
            }
        }
    }

]

module.exports = {
    userReview: userReview,
    userReview2: userReview2,
    orgStewardReview: orgStewardReview,
    adminReview: adminReview,
    reviews: [userReview, orgStewardReview, adminReview]
};
