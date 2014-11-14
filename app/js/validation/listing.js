'use strict';

var t = require('tcomb-form');
var { Str, maybe, Bool, subtype, struct, list, union, Num } = t;
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
	    description: NonBlankString(4000),
	    descriptionShort: NonBlankString(150),
	    screenshots: subtype(list(Screenshot), l => l.length > 0),
	    contacts: subtype(list(Contact), hasRequiredContactTypes.bind(null, requiredContactTypes)),
	    height: maybe(Num),
	    width: maybe(Num),
	    whatIsNew: NonBlankString(250),
	    categories: subtype(list(NonBlankString(255)), l => l.length > 0),
	    agency: NonBlankString(50),
	    docUrls: list(Resource),
	    intents: list(NonBlankString(127)),
	    launchUrl: Url,
	    imageXlargeUrl: Url,
	    imageLargeUrl: Url,
	    imageMediumUrl: Url,
	    imageSmallUrl: Url,
	    versionName: NonBlankString(1000),
	    requirements: NonBlankString(1000),
	    type: NonBlankString(50),
	    owners: subtype(list(User), l => l.length > 0)
	});
}

var ListingDraft = struct({
    title: NonBlankString(255),
    type: NonBlankString(50),
    screenshots: list(Screenshot),
    contacts: list(Contact),
    docUrls: list(Resource)
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

    return {isValid: validation.isValid(), errors: errors, firstError: validation.firstError()};
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