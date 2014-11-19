'use strict';

var t = require('tcomb-form');
var { Arr, Str, maybe, Bool, subtype, struct, list, union, Num } = t;
var {EMAIL_REGEX, PHONE_REGEX, URL_REGEX} = require('../constants');

var testPhone = s => PHONE_REGEX.test(s),
    testUrl = s => URL_REGEX.test(s),
    testEmail = s => EMAIL_REGEX.test(s),
    strBlank = s => s.length === 0,
    strNotBlank = s => !!s;

var StringMax = max => subtype(Str, s => s.length <= max);

var NonBlankString = max => subtype(StringMax(max), strNotBlank);

var BlankString = subtype(Str, strBlank);

var Url = subtype(StringMax(2083), testUrl);

var Phone = subtype(StringMax(50), testPhone);

var Email = subtype(StringMax(100), testEmail);

var User = struct({
    username: NonBlankString(100)
});

var Screenshot = struct({
    smallImageUrl: Url,
    largeImageUrl: Url
});

var Resource = struct({
    name: NonBlankString(255),
    url: Url
});

var oneValidPhone = c => [c.securePhone, c.unsecurePhone].some(Phone.is);

var Contact = subtype(struct({
    name: NonBlankString(100),
    securePhone: maybe(union([BlankString, Phone])),
    unsecurePhone: maybe(union([BlankString, Phone])),
    email: Email,
    organization: maybe(StringMax(100)),
    type: NonBlankString(50)
}), oneValidPhone);

var Agency = struct({
    title: NonBlankString(255)
});

function getRequiredContactTypes (contactTypes) {
    return contactTypes.filter(t => t.required).map(t => t.title);
}

function hasRequiredContactTypes (requiredContactTypes, contacts) {
    return requiredContactTypes.every(type => contacts.some(contact => contact.type === type));
}

function ListingFull (requiredContactTypes) {
    return struct({
        title: NonBlankString(255),
        type: NonBlankString(50),
        categories: subtype(list(NonBlankString(50)), l => l.length > 0),
        tags: subtype(Arr, a => a.length > 0 && a.every(t => t.length > 0 && t.length < 17)),
        description: NonBlankString(4000),
        descriptionShort: NonBlankString(150),
        versionName: NonBlankString(255),
        launchUrl: Url,
        requirements: NonBlankString(1000),
        whatIsNew: maybe(StringMax(250)),
        intents: list(NonBlankString(127)),
        docUrls: list(Resource),
        imageXlargeUrl: Url,
        imageLargeUrl: Url,
        imageMediumUrl: Url,
        imageSmallUrl: Url,
        screenshots: subtype(list(Screenshot), l => l.length > 0),
        contacts: subtype(list(Contact), hasRequiredContactTypes.bind(null, requiredContactTypes)),
        owners: subtype(list(User), l => l.length > 0),
        agency: NonBlankString(255),
        height: maybe(Num),
        width: maybe(Num)
    });
}

var ListingDraft = struct({
    title: NonBlankString(255),
    type: NonBlankString(50),
    categories: list(NonBlankString(50)),
    tags: subtype(Arr, a => a.every(t => t.length > 0 && t.length < 17)),
    description: maybe(StringMax(4000)),
    descriptionShort: maybe(StringMax(150)),
    versionName: maybe(StringMax(255)),
    launchUrl: maybe(union([Url, BlankString])),
    requirements: maybe(StringMax(1000)),
    whatIsNew: maybe(StringMax(250)),
    intents: list(NonBlankString(127)),
    docUrls: list(Resource),
    imageXlargeUrl: maybe(union([Url, BlankString])),
    imageLargeUrl: maybe(union([Url, BlankString])),
    imageMediumUrl: maybe(union([Url, BlankString])),
    imageSmallUrl: maybe(union([Url, BlankString])),
    screenshots: list(Screenshot),
    contacts: list(Contact),
    owners: list(User),
    agency: maybe(StringMax(255)),
    height: maybe(Num),
    width: maybe(Num)
});

function validate (instance, options, type) {
    var validation = t.validate(instance, type),
        errors = {};

    if (validation.errors) {
        validation.errors.forEach(function (e) {
            var path = e.path.join('.');
            errors[path] = true;
        });
    }

    var firstError = validation.firstError() ? validation.firstError().path.join('.') : '';

    return {isValid: validation.isValid(), errors: errors, firstError: firstError};
}

function validateDraft (instance, options) {
    var validation = validate(instance, options, ListingDraft);

    //the following is not neccesarry to correctly validate the listing,
    //but for ensuring certain errors are reflected at the correct path

    instance.contacts.forEach(function (contact, index) {
        validation.errors['contacts.' + index + '.securePhone'] = !oneValidPhone(contact);
        validation.errors['contacts.' + index + '.unsecurePhone'] = !oneValidPhone(contact);
    });

    return validation;
}

function validateFull (instance, options) {
    var requiredContactTypes = getRequiredContactTypes((options || {}).contactTypes || []);
    var validation = validate(instance, options, ListingFull(requiredContactTypes));

    //the following is not neccesarry to correctly validate the listing,
    //but for ensuring certain errors are reflected at the correct path

    instance.contacts.forEach(function (contact, index) {
        validation.errors['contacts.' + index + '.securePhone'] = !oneValidPhone(contact);
        validation.errors['contacts.' + index + '.unsecurePhone'] = !oneValidPhone(contact);
    });

    validation.errors.contacts = !hasRequiredContactTypes(requiredContactTypes, instance.contacts);

    return validation;
}

module.exports = {
    validateFull: validateFull,
    validateDraft: validateDraft
};