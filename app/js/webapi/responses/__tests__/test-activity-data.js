'use strict';

// result of call: localhost:8181/api/listings/activity?offset=2&limit=2
var apiActivity = {
  "count": 32,
  "next": "http://localhost:8181/api/listings/activity/?limit=2&offset=4",
  "previous": "http://localhost:8181/api/listings/activity/?limit=2",
  "results": [
    {
      "action": "APPROVED_ORG",
      "activity_date": "2015-09-17T12:35:58.865311Z",
      "description": null,
      "author": {
        "user": {
          "username": "wsmith",
          "email": "wsmith@oceania.gov"
        },
        "display_name": "Winston Smith"
      },
      "listing": {
        "unique_name": "ozp.test.air_mail",
        "title": "Air Mail"
      },
      "change_details": []
    },
    {
      "action": "APPROVED",
      "activity_date": "2015-09-17T12:35:58.887069Z",
      "description": null,
      "author": {
        "user": {
          "username": "wsmith",
          "email": "wsmith@oceania.gov"
        },
        "display_name": "Winston Smith"
      },
      "listing": {
        "unique_name": "ozp.test.air_mail",
        "title": "Air Mail"
      },
      "change_details": []
    }
  ]
};

module.exports = {
    apiActivity: apiActivity
};
