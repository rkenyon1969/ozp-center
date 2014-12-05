'use strict';

module.exports = {
    PAGINATION_MAX: 24,

    FOCUSABLE_ELEMENTS: 'input, select, textarea',

    URL_REGEX: /^(((https|http|ftp|sftp|file):\/)|(\/)){1}(.*)+$/,
    PHONE_REGEX: /(^\+\d((([\s.-])?\d+)?)+$)|(^(\(\d{3}\)\s?|^\d{3}[\s.-]?)?\d{3}[\s.-]?\d{4}$)/,
    EMAIL_REGEX: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

    listingActions: {
        MODIFIED: 'modified',
        ADD_RELATED_TO_ITEM: 'addrelatedtoitem',
        REMOVE_RELATED_TO_ITEM: 'removerelatedtoitem',
        ADD_RELATED_ITEMS: 'addrelateditems',
        REMOVE_RELATED_ITEMS: 'removerelateditems',
        OUTSIDE: 'outside',
        INSIDE: 'inside',
        APPROVED_ORG: 'approved_org',
        APPROVED: 'approved',
        REJECTED: 'rejected',
        SUBMITTED: 'submitted',
        CREATED: 'created',
        ENABLED: 'enabled',
        DISABLED: 'disabled',
        TAG_CREATED: 'tag_created',
        TAG_DELETED: 'tag_deleted',
        REVIEW_EDITED: 'review_edited',
        REVIEW_DELETED: 'review_deleted',
        EMS_INCLUDED: 'ems_included',
        EMS_NOT_INCLUDED: 'ems_not_included',
        CLOUD_HOST_INCLUDED: 'cloud_host_included',
        CLOUD_HOST_NOT_INCLUDED: 'cloud_host_not_included',
        SECURITY_SERVICES_INCLUDED: 'security_services_included',
        SECURITY_SERVICES_NOT_INCLUDED: 'security_services_not_included',
        SCALE_INCLUDED: 'scale_included',
        SCALE_NOT_INCLUDED: 'scale_not_included',
        LICENSE_FREE_INCLUDED: 'license_free_included',
        LICENSE_FREE_NOT_INCLUDED: 'license_free_not_included',
        CLOUD_STORAGE_INCLUDED: 'cloud_storage_included',
        CLOUD_STORAGE_NOT_INCLUDED: 'cloud_storage_not_included',
        BROWSER_INCLUDED: 'browser_included',
        BROWSER_NOT_INCLUDED: 'browser_not_included',
        LOCAL_SCORECARD_QUESTION_UPDATED: 'local_scorecard_question_updated'
    },

    approvalStatus: {
        IN_PROGRESS: 'Draft',
        PENDING: 'Pending, Organization',
        APPROVED_ORG: 'Pending, AppsMall',
        APPROVED: 'Published',
        REJECTED: 'Returned to Owner'
    },

    UserRole: {
        USER: 1,
        ORG_STEWARD: 2,
        ADMIN: 3
    },

    listingFieldName: {
        title: 'Title',
        description: 'Description',
        descriptionShort: 'Short Description',
        screenshots: 'Screenshots',
        contacts: 'Contacts',
        height: 'Height',
        width: 'Width',
        tags: 'Tags',
        requirements: 'Requirements',
        categories: 'Categories',
        intents: 'Intents',
        launchUrl: 'Launch URL',
        agency: 'Organization',
        whatIsNew: 'What\'s New',
        owners: 'Owners',
        versionName: 'Version',
        singleton: 'Singleton',
        type: 'Type',
        imageLargeUrl: 'Banner URL',
        imageMediumUrl: 'Large Icon URL',
        imageSmallUrl: 'Small Icon URL',
        imageXlargeUrl: 'Featured Banner',
        docUrls: 'Resources',
        isFeatured: 'Featured Flag'
    }
};
