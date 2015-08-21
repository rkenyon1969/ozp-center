'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

/* global describe, it */
describe('UserReviews', function () {
    function makeProfile(admin, orgSteward, username) {
        return {
            isAdmin: () => admin,
            isOrgSteward: () => orgSteward,
            user: { username: username }
        };
    }

    var UserReviews = require('../UserReviews.jsx');
    var {
        userReview,
        orgStewardReview,
        adminReview,
        reviews
    } = require('./reviews');

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
            <UserReviews reviews={reviews} user={makeProfile(false, false)}
                listing={{}} onEdit={$.noop} />
        );
        var reviewComponents =
            TestUtils.scryRenderedComponentsWithType(userReviews, UserReviews.UserReview);
        expect(reviewComponents.length).to.equal(reviews.length);
    });

    it('shows edit icon for reviews to admins and org stewards', function () {
        var profile = makeProfile(true, false);
        var userReviews = TestUtils.renderIntoDocument(
            <UserReviews reviews={reviews} user={profile} listing={{}} onEdit={$.noop} />
        );
        expect($(userReviews.getDOMNode()).find('.icon-pencil').length).to.equal(3);

        profile = makeProfile(false, true);
        userReviews = TestUtils.renderIntoDocument(
            <UserReviews reviews={reviews} user={profile}
                listing={{agency:'Test Organization'}} onEdit={$.noop} />
        );
        expect($(userReviews.getDOMNode()).find('.icon-pencil').length).to.equal(3);
    });

    it('users can only edit their own review', function () {
        var profile = makeProfile(false, false, 'testUser1');
        var review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={userReview} user={profile}
                listing={{}} onEdit={$.noop} />
        );

        expect($(review.getDOMNode()).find('.icon-pencil').length).to.equal(1);

        review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={orgStewardReview} user={profile}
                listing={{}} onEdit={$.noop} />
        );
        expect($(review.getDOMNode()).find('.icon-pencil').length).to.equal(0);

        review = TestUtils.renderIntoDocument(
            <UserReviews.UserReview review={adminReview} user={profile}
                listing={{}} onEdit={$.noop} />
        );
        expect($(review.getDOMNode()).find('.icon-pencil').length).to.equal(0);
    });

});
