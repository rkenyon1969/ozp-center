'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('SubmitReview', function () {
    var SubmitReview = require('../SubmitReview.jsx');
    var ListingActions = require('../../../../actions/ListingActions');

    it('saves >20 character review on Submit', function () {
        var submitReview = TestUtils.renderIntoDocument(<SubmitReview listing={{id: 1}} />);
        var text = 'Out out brief candle';

        TestUtils.Simulate.change(submitReview.refs.text.getDOMNode(), {target: {value: 'Out out brief candle'}});
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.icon-star-filled-grayLighter')[0]);

        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.be.ok;
        expect(spy.calledWithMatch({id: 1}, {rate: 1, text: text})).to.be.ok;

        spy.restore();
    });

    it('does not save <20 character review on Submit', function () {
        var submitReview = TestUtils.renderIntoDocument(<SubmitReview listing={{id: 1}} />);
        var text = 'Hi';

        TestUtils.Simulate.change(submitReview.refs.text.getDOMNode(), {target: {value: 'Hi'}});
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.icon-star-filled-grayLighter')[0]);

        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.not.be.ok;

        spy.restore();
    });

    it('on reset clears rate and text', function () {
        var submitReview = TestUtils.renderIntoDocument(<SubmitReview listing={{id: 1}} />);
        var text = 'Out out brief candle';

        TestUtils.Simulate.change(submitReview.refs.text.getDOMNode(), {target: {value: 'Out out brief candle'}});
        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.icon-star-filled-grayLighter')[0]);

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-default')[0]);

        expect(submitReview.state.rate).to.be.equal(0);
        expect(submitReview.state.text).to.be.equal('');

        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(submitReview.getDOMNode()).find('.btn-success')[0]);

        // saveReview shouldn't be called with an empty review
        expect(spy.calledOnce).to.not.be.ok;
        spy.restore();
    });

});
