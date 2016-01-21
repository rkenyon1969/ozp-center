'use strict';

var chai = require('chai');
// chai.config.includeStack = true;
// chai.config.showDiff = true;
chai.config.truncateThreshold = 0;

var expect = require('chai').expect;


var _ = require('../../utils/_');
var { FIELDS, SAVE_FORMAT_FIELDS, Listing } = require('../Listing');
var { listing } = require('./api-listing-response');
var unfilledListing = {
    "owners": [
        {
            "user": {
                "username": "wsmith"
            },
            "display_name": "Winston Smith",
            "id": 1
        }
    ]};

describe('Listing constructor', function () {

    it('throws error when not called with new', function () {
        var fn = function () { Listing({}); };
        expect(fn).to.throw(Error);
    });

    it('does not throw error when called with new', function () {
        var fn = function () { new Listing(listing); };
        expect(fn).to.not.throw(Error);
    });

    it('creates object with each field from FIELDS', function () {
        var newListing = new Listing(listing);

        FIELDS.forEach((key) => {
            expect(_.has(newListing, key));
        });
    });

    it('creates object even if the listing only has owner info', function () {
        var newListing = new Listing(unfilledListing);

        FIELDS.forEach((key) => {
            expect(_.has(newListing, key));
        });
    });

    describe('saveFormat(),', function () {
        it('returns an object with all the keys for saving to the backend', function () {
            var centerFormatListing = new Listing(listing);
            var apiFormatListing = centerFormatListing.saveFormat();

            var apiFormatKeys = _.keys(apiFormatListing);
            var diff = _.difference(SAVE_FORMAT_FIELDS, apiFormatKeys);

            expect(diff).to.deep.equal([]);
        });

        // it('converts the listing to format for saving to the backend via API', function () {
        //     var centerFormatListing = new Listing(listing);
        //     var apiFormatListing = centerFormatListing.saveFormat();

        //     SAVE_FORMAT_FIELDS.forEach((key) => {
        //         expect(apiFormatListing[key], "Problem with " + key).to.deep.equal(listing[key]);
        //     });
        // });

    });
});
