'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('Reviews Tab', function () {
    var ReviewsTab = require('../index');
    var SubmitReview = require('../SubmitReview');
    var EditReview = require('../EditReview');
    var UserReviews = require('../UserReviews');

    var {
        userReview,
        orgStewardReview,
        adminReview,
        reviews
    } = require('./reviews');
    var CurrentListingStore = require('../../../../stores/CurrentListingStore');
    var ListingActions = require('../../../../actions/ListingActions');
    var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');

    it('displays SubmitRating if user does not have a review for the listing', function () {
        var spy = sinon.stub(CurrentListingStore, 'getReviews').returns([
            userReview, orgStewardReview
        ]);

        ProfileMock.mockAdmin();
        var reviewsTab = TestUtils.renderIntoDocument(
            <ReviewsTab listing={{id: 1}} />
        );

        expect(TestUtils.findRenderedComponentWithType(reviewsTab, SubmitReview)).to.be.ok;
        expect(TestUtils.findRenderedComponentWithType.bind(TestUtils, reviewsTab, EditReview)).to.throw(Error);

        spy.restore();
    });

    it('does not display EditReview by default if user has a review for the listing', function () {
        var spy = sinon.stub(CurrentListingStore, 'getReviews').returns([
            userReview, orgStewardReview, adminReview
        ]);

        ProfileMock.mockAdmin();
        var reviewsTab = TestUtils.renderIntoDocument(
            <ReviewsTab listing={{id: 1}} />
        );

        expect(TestUtils.findRenderedComponentWithType.bind(reviewsTab, SubmitReview)).to.throw(Error);
        expect(TestUtils.findRenderedComponentWithType.bind(TestUtils, reviewsTab, EditReview)).to.throw(Error);

        spy.restore();
    });

    it('displays EditReview when edit icon is clicked', function () {
        var spy = sinon.stub(CurrentListingStore, 'getReviews').returns([userReview]);

        ProfileMock.mockAdmin();
        var reviewsTab = TestUtils.renderIntoDocument(
            <ReviewsTab listing={{id: 1}} />
        );

        var review = TestUtils.findRenderedComponentWithType(reviewsTab, UserReviews.UserReview);
        var editIcon = $(review.getDOMNode()).find('.fa-pencil')[0];
        TestUtils.Simulate.click(editIcon);
        expect(TestUtils.findRenderedComponentWithType(reviewsTab, EditReview)).be.ok;

        spy.restore();
    });

});
