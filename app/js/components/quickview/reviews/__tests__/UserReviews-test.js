'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('UserReviews', function () {
    var UserReviews = require('../UserReviews');
    var {
        userReview,
        orgStewardReview,
        adminReview,
        reviews
    } = require('./reviews');
    var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');

    it('renders no reviews text when there are no reviews', function () {
        var userReviews = TestUtils.renderIntoDocument(<UserReviews reviews={null} />);
        expect(
            $(userReviews.getDOMNode()).find('h4').text()
        ).to.equal('There are no user reviews yet.');

        userReviews = TestUtils.renderIntoDocument(<UserReviews reviews={[]} />);
        expect(
            $(userReviews.getDOMNode()).find('h4').text()
        ).to.equal('There are no user reviews yet.');
    });

    it('renders reviews', function () {
        var userReviews = TestUtils.renderIntoDocument(
            <UserReviews reviews={reviews} user={ProfileMock} listing={{}} onEdit={$.noop} />
        );
        var reviewComponents = TestUtils.scryRenderedComponentsWithType(userReviews, UserReviews.UserReview);
        expect(reviewComponents.length).to.equal(reviews.length);
    });

    it('shows edit icon for reviews to admins and org stewards', function () {
        ProfileMock.mockAdmin();
        var userReviews = TestUtils.renderIntoDocument(
            <UserReviews reviews={reviews} user={ProfileMock} listing={{}} onEdit={$.noop} />
        );
        expect($(userReviews.getDOMNode()).find('.fa-pencil').length).to.equal(3);

        ProfileMock.mockOrgSteward(['Test Organization']);
        var userReviews = TestUtils.renderIntoDocument(
            <UserReviews reviews={reviews} user={ProfileMock} listing={{agency:'Test Organization'}} onEdit={$.noop} />
        );
        expect($(userReviews.getDOMNode()).find('.fa-pencil').length).to.equal(3);
    });

    it('users can only edit their own review', function () {
        ProfileMock.mockUser();
        var review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={userReview} user={ProfileMock} listing={{}} onEdit={$.noop} />
        );
        expect($(review.getDOMNode()).find('.fa-pencil').length).to.equal(1);

        review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={orgStewardReview} user={ProfileMock} listing={{}} onEdit={$.noop} />
        );
        expect($(review.getDOMNode()).find('.fa-pencil').length).to.equal(0);

        review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={adminReview} user={ProfileMock} listing={{}} onEdit={$.noop} />
        );
        expect($(review.getDOMNode()).find('.fa-pencil').length).to.equal(0);
    });

});
