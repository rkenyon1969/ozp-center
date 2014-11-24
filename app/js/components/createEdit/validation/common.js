'use strict';

var { Str, subtype } = require('tcomb-form');
var { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } = require('../../../constants');

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

module.exports = {
    StringMax: StringMax,
    NonBlankString: NonBlankString,
    BlankString: BlankString,
    Url: Url,
    Phone: Phone,
    Email: Email
};