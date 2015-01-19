'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

/**
 * Everything here is commented out since the current version of sinon does not support
 * fake XMLHttpRequests in webpack/browserify style environments
 */
describe('Image API', function() {
    var xhr;

    //beforeEach(function() {
        //xhr = sinon.useFakeXMLHttpRequest();
    //});

    //afterEach(function() {
        //xhr.restore();
    //});

    //it('sends the blob as the entire request body', function() {
        //var ImageApi = require('../Image'),
            //blob = new Blob([1,2,3,4], {type: 'image/png'}),
            //successCallback = sinon.spy();

        //xhr.onCreate = sinon.spy(function(request) {
            //request.respond(200, {'Content-Type': 'application/json'}, '{"id": 1}');
        //});

        //ImageApi.save(blob).then(successCallback);

        //expect(xhr.onCreate.calledOnce).to.be.true();

        //var request = xhr.onCreate.args[0][0];

        //expect(request.requestHeader['Content-Type']).to.equal('image/png');
        //expect(request.requestBody).to.equal(blob);


        //expect(successCallback.calledOnce).to.be.true();
        //expect(successCallback.calledWithMatch({id: 1})).to.be.true();
    //});

    //it('passes the response and status text in the event of failure', function() {
        //var ImageApi = require('../Image'),
            //blob = new Blob([1,2,3,4], {type: 'image/png'}),
            //failureCallback = sinon.spy();

        //xhr.onCreate = sinon.spy(function(request) {
            //request.respond(400, {'Content-Type': 'text/plain'}, 'request error');
        //});

        //ImageApi.save(blob).fail(failureCallback);


        //expect(failureCallback.calledOnce).to.be.true();
        //expect(failureCallback.calledWithMatch({
            //responseText: 'request error'
        //}, undefined, 'Bad Request')).to.be.true();
    //});
});
