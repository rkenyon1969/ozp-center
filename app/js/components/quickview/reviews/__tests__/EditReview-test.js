'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('EditReview', function () {
    var EditReview = require('../EditReview.jsx');
    var {
        userReview2,
        userReview,
        orgStewardReview,
        adminReview,
        reviews
    } = require('./reviews');
    var IconRating = require('../../../shared/IconRating.jsx');
    var ListingActions = require('../../../../actions/ListingActions');
    var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');
    var noop = $.noop;

    var render = function (listing, review, user, onSave, onCancel) {
        onSave = onSave || noop;
        onCancel = onCancel || noop;

        return TestUtils.renderIntoDocument(
            <EditReview
                listing={listing}
                review={review}
                user={user}
                onSave={onSave}
                onCancel={onSave} />
        );
    };

    it('accepts review prop', function () {
        ProfileMock.mockUser();
        var editReview = render({id: 1}, userReview, ProfileMock);

        var iconRating = TestUtils.findRenderedComponentWithType(editReview, IconRating);
        expect(iconRating).to.be.ok;
        expect(iconRating.props.currentRating).to.equal(4);

        expect(editReview.refs.text.getDOMNode().value).to.equal(userReview.text);

        ProfileMock.restore();
    });

    it('shows lock icon for non review owners', function () {
        var editReview = render({id: 1}, userReview, ProfileMock.mockUser());
        var $el = $(editReview.getDOMNode());
        expect($el.find('.icon-lock').length).to.equal(0);

        editReview = render({id: 1}, userReview, ProfileMock.mockOrgSteward());
        $el = $(editReview.getDOMNode());
        expect($el.find('.icon-lock').length).to.equal(1);

        editReview = render({id: 1}, userReview, ProfileMock.mockAdmin());
        $el = $(editReview.getDOMNode());
        expect($el.find('.icon-lock').length).to.equal(1);

        ProfileMock.restore();
    });

    it('executes onSave prop when review is saved', function (done) {
        var spy = sinon.spy();
        var editReview = render({id: 1}, userReview, ProfileMock.mockUser(), spy);

        ListingActions.saveReviewCompleted({id: 1}, userReview);

        setTimeout(function () {
            expect(spy.calledOnce).to.be.ok;
            done();
        }, 20);

        ProfileMock.restore();
    });

    it('saves >20 character review on Edit', function () {

        var editReview = render({id: 1}, userReview2, ProfileMock.mockUser(), spy);
        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(editReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.be.ok;

        spy.restore();
    });

    it('does not save <20 character review on Edit', function () {

        var editReview = render({id: 1}, userReview, ProfileMock.mockUser(), spy);
        var spy = sinon.stub(ListingActions, 'saveReview');

        TestUtils.Simulate.click($(editReview.getDOMNode()).find('.btn-success')[0]);

        expect(spy.calledOnce).to.not.be.ok;

        spy.restore();
    });


});
