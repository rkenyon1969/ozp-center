'use strict';

var expect = require('chai').expect;
var Router = require('react-router');
var $ = require('jquery');
var { TestUtils } = require('react').addons;
var TestLocation = require('react-router/lib/locations/TestLocation');
var ProfileMock = require('../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../__tests__/createRoutes');

describe ('AllListings', function () {
    var router,
        routes = createRoutes(),
        location= new TestLocation( ['/user-management/all-listings'] );
    var listingManagement,
        listingManagementPage;

    beforeEach( function () {
        ProfileMock.mockAdmin("Test Organization");
        sessionStorage.setItem("center-allListings-toggleView", false);
        router = Router.run(routes, location, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(
                <Handler/>
            );
        });
    });

    it('AllListings loads.', function () {
        listingManagementPage = listingManagement.getDOMNode();
        expect($(listingManagementPage).find('span[class="switchBox"]')[0]).to.exist;
    });

    it('Check that the toggleswitch switches between grid and tableview.', function () {
        listingManagementPage = listingManagement.getDOMNode();
        var switchBox = $(listingManagementPage).find('span[class="switchBox"]')[0];

        //Before click gridview (loadMore) should be loaded
        //After click gridview should not be loaded
        expect($(listingManagementPage).find('div[class="LoadMore AllListings__listings col-xs-9 col-lg-10 all"]')[0]).to.exist;

        TestUtils.Simulate.click(switchBox);
        
        expect($(listingManagementPage).find('div[class="LoadMore AllListings__listings col-xs-9 col-lg-10 all"]')[0]).to.not.exist;
    });

    afterEach( function () {
        router.stop()
        ProfileMock.restore();
    });
});
