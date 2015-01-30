'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('SubmitReview', function () {
    var SubmitReview = require('../SubmitReview');
    var ListingActions = require('../../../../actions/ListingActions');

    it('saves review on Submit', function () {
        var submitReview = TestUtils.renderIntoDocument(<SubmitReview listing={{id: 1}} />);
        var text = 'Hello, world';

        TestUtils.Simulate.change(submitReview.refs.text.getDOMNode(), {target: {value: 'Hello, world'}});
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.fa-star-o')[0]);

        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.be.ok;
        expect(spy.calledWithMatch({id: 1}, {rate: 1, text: text})).to.be.ok;

        spy.restore();
    });

    it('on reset clears rate and text', function () {
        var submitReview = TestUtils.renderIntoDocument(<SubmitReview listing={{id: 1}} />);
        var text = 'Hello, world';

        TestUtils.Simulate.change(submitReview.refs.text.getDOMNode(), {target: {value: 'Hello, world'}});
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.fa-star-o')[0]);

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-default')[0]);

        expect(submitReview.state.rate).to.be.equal(0);
        expect(submitReview.state.text).to.be.equal('');

        var spy = sinon.stub(ListingActions, 'saveReview');
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.be.ok;
        expect(spy.calledWithMatch({id: 1}, {rate: 0, text: ''})).to.be.ok;
        spy.restore();
    });

});
