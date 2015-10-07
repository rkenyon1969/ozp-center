'use strict';

var chai = require('chai');
chai.config.includeStack = true;
chai.config.showDiff = true;
chai.config.truncateThreshold = 0;

var expect = require('chai').expect;


var PaginatedResponse = require('../PaginatedResponse');
var { apiActivity } = require('./test-activity-data');
var { notificationData, typeTransformer } = require('./test-notification-data');
var { parse } = require('../../Notification.js');

describe('PaginatedResponse', function () {
    describe('contstructor', function () {
        it('throws error when not called with new', function () {
            var fn = function () { PaginatedResponse(apiActivity); };
            expect(fn).to.throw(TypeError);
        });

        it('does not throw error when called with new', function () {
            var fn = function () { new PaginatedResponse(apiActivity); };
            expect(fn).to.not.throw(TypeError);
        });

        it('creates object that has _response', function () {
            var pr = new PaginatedResponse(apiActivity);
            expect(pr).to.have.property('_response');
        });

        it('creates object that has _results, with limit number of elements', function () {
            var pr = new PaginatedResponse(apiActivity);
            expect(pr).to.have.property('_results');
            expect(pr.getItemAsList().length).to.equal(2);
        });

        it('returns object that has _results transformed by (Date) parser', function () {
            var pr = new PaginatedResponse(notificationData, parse);

            expect(pr).to.have.property('_results');
            expect(pr.getItemAsList()[0].expiresDate).to.be.an.instanceof(Date);
        });
    });

    describe('getItemAsList', function () {
        it('returns a list', function () {
            var pr = new PaginatedResponse(apiActivity);
            expect(pr.getItemAsList()).to.be.an('array');
        });
    });

    describe('total', function () {
        it('is a number', function () {
            var pr = new PaginatedResponse(apiActivity);
            expect(pr.total()).to.be.a('number');
        });
    });

    describe('nextLink and prevLink', function () {
        it('return strings', function () {
            var pr = new PaginatedResponse(apiActivity);
            expect(pr.nextLink()).to.be.a('string');
            expect(pr.prevLink()).to.be.a('string');
        });
    });

});
