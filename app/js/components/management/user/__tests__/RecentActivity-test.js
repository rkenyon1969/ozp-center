'use strict';

var Router = require('react-router');
var TestLocation = require('react-router/lib/locations/TestLocation');
var createRoutes = require('../../../../__tests__/createRoutes');
var ProfileMock = require('../../../../__tests__/mocks/ProfileMock');



describe('RecentActivity', function() {
    var location = new TestLocation(['/test']);

    it('renders the recent activity sidebar', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);

        var router = Router.run(routes, location, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('.RecentActivity__Sidebar')[0]).to.exist();
        router.stop();
    });

    it('renders the recent activity list', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);

        var router = Router.run(routes, location, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('.RecentActivity__activities')[0]).to.exist();
        router.stop();
    });

    it('renders the organization steward filters', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);

        ProfileMock.mockOrgSteward();
        var router = Router.run(routes, location, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('RadioGroup[name="recent-activity-org-listings"]')).to.exist();

        router.stop();
        ProfileMock.restore();
    });

    it('renders the marketplace steward filters', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity.jsx');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;
        var recentActivity;

        var routes = createRoutes(RecentActivity);

        ProfileMock.mockAdmin();
        var router = Router.run(routes, location, function (Handler) {
            recentActivity = TestUtils.renderIntoDocument(<Handler />);
        });

        expect($(recentActivity.getDOMNode()).find('RadioGroup[name="recent-activity-all-listings"]')).to.exist();

        router.stop();
        ProfileMock.restore();
    });

});
