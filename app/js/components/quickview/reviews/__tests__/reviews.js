'use strict';

var [adminReview, orgStewardReview, userReview] = [
    {
        "author": {
            "user": {
                "username": "testAdmin1",
                "email": "testadmin1@oceania.gov"
            },
            "display_name": "Winston Smith"
        },
        "listing": 2,
        "rate": 3,
        "text": "Admin review",
        "id": 6
    },
    {
        "author": {
            "user": {
                "username": "testOrgSteward1",
                "email": "teststeward1@oceania.gov"
            },
            "display_name": "Julia Dixon"
        },
        "listing": 3,
        "rate": 5,
        "text": "Org steward review",
        "id": 7
    },
    {
        "author": {
            "user": {
                "username": "testUser1",
                "email": "testuser1@airstripone.com"
            },
            "display_name": "Jones"
        },
        "listing": 2,
        "rate": 4,
        "text": "This bread is stale!",
        "id": 4
    }
]

module.exports = {
    userReview: userReview,
    orgStewardReview: orgStewardReview,
    adminReview: adminReview,
    reviews: [userReview, orgStewardReview, adminReview]
};
