'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('AdministrationTab', function () {
    it('renders an isFeatured toggle iff the user is an admin and the listing is published',
            function () {
        var AdministrationTab = require('../AdministrationTab');

        /* jshint ignore:start */
        var adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED'}}
                    currentUser={{highestRole: 'ADMIN'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.featured-toggle')[0]).to.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED'}}
                    currentUser={{highestRole: 'ORG_STEWARD'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.featured-toggle')[0]).to.not.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED'}}
                    currentUser={{highestRole: 'USER'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.featured-toggle')[0]).to.not.exist();
    });

    it('calls ListingAction.setFeatured when the Featured toggle is clicked', function () {
        var setFeaturedSpy = sinon.spy(),
            AdministrationTab =
                    require('inject?../../actions/ListingActions!../AdministrationTab')({
                '../../actions/ListingActions': {
                    setFeatured: setFeaturedSpy,
                    enable: sinon.spy(),
                    disable: sinon.spy()
                }
            }),
            listing = {approvalStatus: 'APPROVED', isFeatured: false};

        /* jshint ignore:start */
        var adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={listing}
                    currentUser={{highestRole: 'ADMIN'}} />
        );
        /* jshint ignore:start */

        var node = adminTab.getDOMNode(),
            checkbox = node.querySelector('.featured-toggle input[type=checkbox]');

        expect(checkbox.checked).to.be.false();
        checkbox.checked = true;
        TestUtils.Simulate.change(checkbox, {target: checkbox});

        expect(setFeaturedSpy.calledOnce).to.be.ok();
        expect(setFeaturedSpy.calledWith(true, listing)).to.be.true();

        listing.isFeatured = true
        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={listing}
                    currentUser={{highestRole: 'ADMIN'}} />
        );
        /* jshint ignore:start */

        node = adminTab.getDOMNode();
        checkbox = node.querySelector('.featured-toggle input[type=checkbox]');
        expect(checkbox.checked).to.be.true();
        checkbox.checked = false;
        TestUtils.Simulate.change(checkbox, {target: checkbox});

        expect(setFeaturedSpy.calledTwice).to.be.ok();
        expect(setFeaturedSpy.calledWith(false, listing)).to.be.true();
    });

    it('renders Approve and Reject buttons if the user is an org steward of the org (or admin) and the listing is pending',
            function () {
        var AdministrationTab = require('../AdministrationTab');

        /* jshint ignore:start */
        var adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'PENDING'}}
                    currentUser={{highestRole: 'ADMIN'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'PENDING', agency: 'Test Org'}}
                    currentUser={{highestRole: 'ORG_STEWARD', stewardedOrganizations: 'Test Org'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'PENDING'}}
                    currentUser={{highestRole: 'USER'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.not.exist();
    });

    it('renders Approve and Reject buttons if the user is an admin and the listing is approved_org',
            function () {
        var AdministrationTab = require('../AdministrationTab');

        /* jshint ignore:start */
        var adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED_ORG'}}
                    currentUser={{highestRole: 'ADMIN'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED_ORG', agency: 'Test Org'}}
                    currentUser={{highestRole: 'ORG_STEWARD', stewardedOrganizations: 'Test Org'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.not.exist();

        /* jshint ignore:start */
        adminTab = TestUtils.renderIntoDocument(
                <AdministrationTab listing={{approvalStatus: 'APPROVED_ORG'}}
                    currentUser={{highestRole: 'USER'}} />
        );
        /* jshint ignore:end */
        expect($(adminTab.getDOMNode()).find('.review-listing')[0]).to.not.exist();
    });
});
