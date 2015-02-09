'use strict';

var Router = require('react-router');
var TestLocation = require('react-router/modules/locations/TestLocation');
var createRoutes = require('../../../../__tests__/createRoutes');


describe('RecentActivity', function() {
    it('renders the recent activity sidebar', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);
        TestLocation.history = ['/test'];

        var router = Router.run(routes, TestLocation, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('.RecentActivity__Sidebar')[0]).to.exist();
        router.teardown();
    });

    it('renders the recent activity list', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);
        TestLocation.history = ['/test'];

        var router = Router.run(routes, TestLocation, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('.RecentActivity__activities')[0]).to.exist();
        router.teardown();
    });
});
