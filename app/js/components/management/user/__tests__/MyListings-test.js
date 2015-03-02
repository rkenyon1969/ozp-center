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

describe('MyListings', function () {
    var ListingManagement = require('../MyListings.jsx');
    var routes, userMenu, router, location;

    beforeEach(function () {
        routes = createRoutes(ListingManagement);
        location = new TestLocation(['/test']);
    });

    it('renders my listings sidebar', function () {
        ProfileMock.mockUser();
        var listingManagement;
        var router = Router.run(routes, location, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(<Handler />);
        });
        expect($(listingManagement.getDOMNode()).find('.Listings__Sidebar')[0]).to.exist;
        router.stop();

        ProfileMock.restore();
    });

});
