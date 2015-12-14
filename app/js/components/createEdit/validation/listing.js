'use strict';

var _ = require('../../../utils/_');
var t = require('tcomb-form');
var { maybe, subtype, struct, list, union, Num } = t;
var {
      StringMax,
      NonBlankString,
      Url,
      Phone,
      Email,
      BlankString
  } = require('./common');

var User = struct({
    username: NonBlankString(100)
});

var Screenshot = struct({
    smallImageId: Num,
    largeImageId: Num
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

var securityMarking = NonBlankString(60),
    title = NonBlankString(60),
    type = NonBlankString(50),
    whatIsNew = maybe(StringMax(250)),
    categories = list(NonBlankString(50)),
    tags = list(StringMax(16)),
    intents = list(NonBlankString(127)),
    screenshots = list(Screenshot),
    contacts = list(Contact),
    docUrls = list(Resource),
    owners = list(User),
    atLeastOne = l => l.length > 0;

function getRequiredContactTypes (contactTypes) {
    return contactTypes.filter(t => t.required).map(t => t.name);
}

function hasRequiredContactTypes (requiredContactTypes, contacts) {
    return requiredContactTypes.every(type => contacts.some(contact => contact.type === type));
}

function ListingFull (requiredContactTypes) {
    return struct({
        securityMarking: securityMarking,
        title: title,
        type: type,
        categories: subtype(categories, atLeastOne),
        tags: subtype(tags, atLeastOne),
        description: NonBlankString(4000),
        descriptionShort: NonBlankString(100),
        versionName: NonBlankString(255),
        launchUrl: Url,
        requirements: NonBlankString(1000),
        whatIsNew: whatIsNew,
        intents: intents,
        docUrls: docUrls,
        smallIconId: Num,
        largeIconId: Num,
        bannerIconId: Num,
        featuredBannerIconId: Num,
        screenshots: subtype(screenshots, atLeastOne),
        contacts: subtype(contacts, hasRequiredContactTypes.bind(null, requiredContactTypes)),
        owners: subtype(owners, atLeastOne),
        agency: NonBlankString(255),
        height: maybe(Num),
        width: maybe(Num)
    });
}

var ListingDraft = struct({
    securityMarking: securityMarking,
    title: title,
    type: type,
    categories: categories,
    tags: tags,
    description: maybe(StringMax(4000)),
    descriptionShort: maybe(StringMax(100)),
    versionName: maybe(StringMax(255)),
    launchUrl: maybe(union([Url, BlankString])),
    requirements: maybe(StringMax(1000)),
    whatIsNew: whatIsNew,
    intents: intents,
    docUrls: docUrls,
    contacts: contacts,
    owners: subtype(owners, atLeastOne),
    agency: maybe(StringMax(255)),
    height: maybe(Num),
    width: maybe(Num),
    screenshots: screenshots
});

/**
 * Images are a special case - the field to validate (the id) isn't actually the field in
 * the form, but rather is derived from it (the field in the form contains the file itself,
 * which can't really be validated).  Therefore what we need to do is let tcomb validate the
 * id, and then copy the validation errors from the id fields to the file fields so that
 * they display in the form.
 * @param validation The validation object.  This object will be modified so that it's image
 * file fields are brought into sync with it's image id fields
 */
function copyImageValidations(validation) {
    //attach validation errors from image ids to image fields
    var screenshotKeys = Object.keys(validation.errors).filter(
            k => k.indexOf('screenshots.') === 0
        ),
        screenshotErrors = _.zipObject(screenshotKeys.map(
            k => [k.replace(/Id$/,''), validation.errors[k]]
        ));

    Object.assign(validation.errors, {
        smallIcon: validation.errors.smallIconId,
        largeIcon: validation.errors.largeIconId,
        bannerIcon: validation.errors.bannerIconId,
        featuredBannerIcon: validation.errors.featuredBannerIconId
    }, screenshotErrors);
}

//the following is not neccesarry to correctly validate the listing,
//but for ensuring certain errors are reflected at the correct path
function validateContacts(validation, instance) {
    instance.contacts.forEach(function (contact, index) {
        ['secure', 'unsecure'].forEach(function(suffix) {
            var path = `contacts.${index}.${suffix}Phone`;
            validation.errors[path] = validation.errors[path] || !oneValidPhone(contact);
        });
    });
}

function validate (instance, options, type) {
    var validation = t.validate(instance, type),
        errors = {};

    if (validation.errors) {
        validation.errors.forEach(function (e) {
            if(e.path[0] === 'tags'){
                errors[e.path[0]] = true;
            }
            else{
                errors[e.path.join('.')] = true;
            }
        });
    }

    var firstError = validation.firstError() ? validation.firstError().path.join('.') : '';

    return {isValid: validation.isValid(), errors: errors, firstError: firstError};
}

function validateDraft (instance, options) {
    var validation = validate(instance, options, ListingDraft);

    validateContacts(validation, instance);
    copyImageValidations(validation);

    return validation;
}

function validateFull (instance, options) {
    var requiredContactTypes = getRequiredContactTypes((options || {}).contactTypes || []);
    var validation = validate(instance, options, ListingFull(requiredContactTypes));

    validateContacts(validation, instance);
    validation.errors.contacts = !hasRequiredContactTypes(requiredContactTypes, instance.contacts);

    copyImageValidations(validation);
    return validation;
}

module.exports = {
    validateFull: validateFull,
    validateDraft: validateDraft
};
