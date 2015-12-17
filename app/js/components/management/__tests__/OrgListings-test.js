'use strict';

var expect = require('chai').expect;
var Router = require('react-router');
var $ = require('jquery');
var { TestUtils } = require('react').addons;
var TestLocation = require('react-router/lib/locations/TestLocation');
var ProfileMock = require('../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../__tests__/createRoutes');

describe ('OrgListings', function () {
    var OrgListings = require('../OrgListings/index.jsx');
    var router,
        routes = createRoutes(OrgListings),
        location = new TestLocation( ['/test'] );
    var listingManagement,
        listingManagementPage;
    var mockOrg = {
        name: "TO Listings",
        to: "org-listings",
        params: {
            org: "Test Organization"
        }
    }

    beforeEach( function () {
        ProfileMock.mockOrgSteward(mockOrg);
        sessionStorage.setItem("center-orgListings-toggleView", false);
        router = Router.run(routes, location, function (Handler) {
            listingManagement = TestUtils.renderIntoDocument(
                <Handler org={mockOrg}/>
            );
        });
    });

    it('orgListings loads.', function () {
        listingManagementPage = listingManagement.getDOMNode();
        expect($(listingManagementPage).find('span[class="switchBox"]')[0]).to.exist;
    });

    it('Check that the toggleswitch switches between grid and tableview.', function () {
        listingManagementPage = listingManagement.getDOMNode();
        var switchBox = $(listingManagementPage).find('span[class="switchBox"]')[0];

        //Before click gridview (loadMore) should be loaded
        //After click gridview should not be loaded
        expect($(listingManagementPage).find('div[class="LoadMore ListingsManagement__LoadMore col-xs-9 col-lg-10 all"]')[0]).to.exist;

        TestUtils.Simulate.click(switchBox);

        expect($(listingManagementPage).find('div[class="LoadMore ListingsManagement__LoadMore col-xs-9 col-lg-10 all"]')[0]).to.not.exist;
    });

    afterEach( function () {
        router.stop()
        ProfileMock.restore();
    });
});
