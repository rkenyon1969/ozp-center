'use strict';
var Router = require('react-router');
var TestLocation = require('react-router/modules/locations/TestLocation');
var createRoutes = require('../../../__tests__/createRoutes');


describe('Sidebar', function() {
    it('renders the sidebar on the listing management page', function() {
        var React = require('react');
        var AllListings = require('../AllListings');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var allListings;

        var routes = createRoutes(AllListings);
        TestLocation.history = ['/test'];

        var router = Router.run(routes, TestLocation, function (Handler) {
            allListings = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(allListings.getDOMNode()).find('.AllListings__sidebar')[0]).to.exist();
        router.teardown();
    });

    it('renders the grid view on the all listings page', function() {
      var React = require('react');
      var AllListings = require('../AllListings');
      var expect = require('chai').expect;
      var TestUtils = React.addons.TestUtils;
      var allListings;

      var routes = createRoutes(AllListings);
      TestLocation.history = ['/test'];

      var router = Router.run(routes, TestLocation, function (Handler) {
          allListings = TestUtils.renderIntoDocument(<Handler />);
      });

      expect($(allListings.getDOMNode()).find('.AllListings__listings')[0]).to.exist();
      router.teardown(); 
    });
});
