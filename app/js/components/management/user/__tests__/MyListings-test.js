'use strict';

var expect = require('chai').expect;
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var { TestUtils } = React.addons;
var Routes = require('../../../../components/Routes.jsx');
var TestLocation = require('react-router/modules/locations/TestLocation');
var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../../__tests__/createRoutes');

describe('MyListings', function () {
    var ListingManagement = require('../MyListings.jsx');
    var routes, userMenu, router;

    beforeEach(function () {
        routes = createRoutes(ListingManagement);
        TestLocation.history = ['/test'];
    });

    it('renders my listings sidebar', function () {
        ProfileMock.mockUser();
        var listingManagement;
        var router = Router.run(routes, TestLocation, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(<Handler />);
        });
        expect($(listingManagement.getDOMNode()).find('.MyListings__sidebar')[0]).to.exist;
        router.teardown();

        ProfileMock.restore();
    });

});
