'use strict';

var {CENTER_REVIEWS_CHAR_LIMIT} = require('ozp-react-commons/OzoneConfig');
var t = require('tcomb-form');
var {struct, Str, subtype } = t;


var StringRange = (min, max) => subtype(Str, s => s.length <= max && s.length >= min);
var Review = struct({
    text: StringRange(CENTER_REVIEWS_CHAR_LIMIT, 4000)
});

module.exports = Review;
