'use strict';

var listing = {
    "id": 1,
    "screenshots": [
        {
            "small_image": {
                "url": "http://localhost:8181/api/image/10/",
                "id": 10,
                "access_control": {
                    "title": "UNCLASSIFIED"
                }
            },
            "large_image": {
                "url": "http://localhost:8181/api/image/11/",
                "id": 11,
                "access_control": {
                    "title": "UNCLASSIFIED"
                }
            }
        }
    ],
    "doc_urls": [
        {
            "name": "wiki",
            "url": "http://www.google.com/wiki"
        },
        {
            "name": "guide",
            "url": "http://www.google.com/guide"
        }
    ],
    "owners": [
        {
            "user": {
                "username": "wsmith"
            },
            "display_name": "Winston Smith",
            "id": 1
        }
    ],
    "categories": [
        {
            "title": "Communication",
            "description": "Moving info between people and things"
        },
        {
            "title": "Productivity",
            "description": "Do more in less time"
        }
    ],
    "tags": [
        {
            "name": "demo"
        },
        {
            "name": "example"
        }
    ],
    "contacts": [
        {
            "id": 1,
            "contact_type": {
                "name": "Civillian"
            },
            "secure_phone": null,
            "unsecure_phone": "321-123-7894",
            "email": "osha@stark.com",
            "name": "Osha",
            "organization": "House Stark"
        },
        {
            "id": 3,
            "contact_type": {
                "name": "Military"
            },
            "secure_phone": null,
            "unsecure_phone": "222-324-3846",
            "email": "brienne@stark.com",
            "name": "Brienne Tarth",
            "organization": "House Stark"
        }
    ],
    "intents": [],
    "access_control": {
        "title": "UNCLASSIFIED"
    },
    "small_icon": {
        "url": "http://localhost:8181/api/image/6/",
        "id": 6,
        "access_control": {
            "title": "UNCLASSIFIED"
        }
    },
    "large_icon": {
        "url": "http://localhost:8181/api/image/7/",
        "id": 7,
        "access_control": {
            "title": "UNCLASSIFIED"
        }
    },
    "banner_icon": {
        "url": "http://localhost:8181/api/image/8/",
        "id": 8,
        "access_control": {
            "title": "UNCLASSIFIED"
        }
    },
    "large_banner_icon": {
        "url": "http://localhost:8181/api/image/9/",
        "id": 9,
        "access_control": {
            "title": "UNCLASSIFIED"
        }
    },
    "agency": {
        "url": "http://localhost:8181/api/agency/1/",
        "icon": {
            "url": "http://localhost:8181/api/image/2/",
            "id": 2,
            "access_control": {
                "title": "UNCLASSIFIED"
            }
        },
        "title": "Ministry of Truth",
        "short_name": "Minitrue"
    },
    "last_activity": {
        "action": "APPROVED"
    },
    "listing_type": {
        "title": "web application"
    },
    "title": "Air Mail",
    "approved_date": null,
    "description": "Sends mail via air",
    "launch_url": "https://www.google.com/airmail",
    "version_name": "1.0.0",
    "unique_name": "ozp.test.air_mail",
    "what_is_new": "Nothing really new here",
    "description_short": "Sends airmail",
    "requirements": "None",
    "approval_status": "APPROVED",
    "is_enabled": true,
    "is_featured": true,
    "avg_rate": "0.0",
    "total_votes": 0,
    "total_rate5": 0,
    "total_rate4": 0,
    "total_rate3": 0,
    "total_rate2": 0,
    "total_rate1": 0,
    "total_comments": 0,
    "singleton": false,
    "is_private": false,
    "required_listings": null
};

module.exports = {
    listing: listing
};
