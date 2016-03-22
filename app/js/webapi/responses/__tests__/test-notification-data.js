'use strict';

// result of call: http://localhost:8181/api/notification/?offset=0&limit=3
var notificationData = {
    "count": 5,
    "next": "http://localhost:8181/api/notification/?limit=3&offset=3",
    "previous": null,
    "results": [
        {
            "id": 1,
            "created_date": "2015-10-05T13:07:31.647226Z",
            "message": "System will be going down for         approximately 30 minutes on X/Y at 1100Z",
            "expires_date": "2015-10-12T17:07:31.629405Z",
            "author": {
                "user": {
                    "username": "wsmith"
                }
            },
            "listing": null
        },
        {
            "id": 2,
            "created_date": "2015-10-05T13:07:31.648673Z",
            "message": "System will be functioning in a         degredaded state between 1800Z-0400Z on A/B",
            "expires_date": "2015-10-12T17:07:31.629405Z",
            "author": {
                "user": {
                    "username": "julia"
                }
            },
            "listing": null
        },
        {
            "id": 3,
            "created_date": "2015-10-05T13:07:31.650193Z",
            "message": "System will be going down for         approximately 30 minutes on C/D at 1700Z",
            "expires_date": "2015-09-28T17:07:31.649783Z",
            "author": {
                "user": {
                    "username": "wsmith"
                }
            },
            "listing": null
        }
    ]
};

module.exports = {
    notificationData: notificationData
};
