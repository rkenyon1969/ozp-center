'use strict';

var expect = require('chai').expect;
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var { TestUtils } = React.addons;
var Routes = require('../../../../components/Routes.jsx');
var TestLocation = require('react-router/lib/locations/TestLocation');
var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../../__tests__/createRoutes');

describe('ListingManagement', function () {
    var ListingManagement = require('../index.jsx');
    var routes, userMenu, router, location;

    beforeEach(function () {
        routes = createRoutes(ListingManagement);
        location = new TestLocation(['/test']);
    });

    it('renders all apps mall tab for admins', function () {
        ProfileMock.mockAdmin();
        var listingManagement;

        var router = Router.run(routes, location, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(<Handler />);
        });
        expect($(listingManagement.getDOMNode()).find('a[href="/user-management/all-listings"]')[0]).to.exist;
        router.stop();

        ProfileMock.restore();
    });

    it('does not render all apps mall tab for users', function () {
        ProfileMock.mockUser();
        var listingManagement;
        var router = Router.run(routes, location, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(<Handler />);
        });
        expect(
            $(listingManagement.getDOMNode()).find('a[href="/user-management/all-listings"]')[0]
        ).to.not.exist;
        router.stop();

        ProfileMock.restore();
    });

    // it('renders a tabs for org stewards', function () {
    //     ProfileMock.mockOrgSteward(['Test Org 1']);
    //     var listingManagement;
    //     var router = Router.run(routes, TestLocation, function (Handler) {
    //         listingManagement = TestUtils.renderIntoDocument(<Handler />);
    //     });
    //     expect($(listingManagement.getDOMNode()).find('a[href="/user-management/org-listings"]')[0]).to.exist;
    //
    // });

});
