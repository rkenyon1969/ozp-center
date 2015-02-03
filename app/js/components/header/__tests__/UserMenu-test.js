'use strict';

var expect = require('chai').expect;
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var { TestUtils } = React.addons;
var Routes = require('../../../components/Routes');
var TestLocation = require('react-router/modules/locations/TestLocation');
var ProfileMock = require('../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../__tests__/createRoutes');

describe('UserMenu', function () {
    var UserMenu = require('../UserMenu');
    var routes, userMenu, router;

    beforeEach(function () {
        routes = createRoutes(UserMenu);
        TestLocation.history = ['/test'];
    });

    it('renders management link for admins', function () {
        ProfileMock.mockAdmin();
        var userMenu;
        var router = Router.run(routes, TestLocation, function (Handler) {
            userMenu = TestUtils.renderIntoDocument(<Handler />);
        });
        expect($(userMenu.getDOMNode()).find('a[href="/mall-management/categories"]')[0]).to.exist;
        router.teardown();
        ProfileMock.restore();
    });

    it('does not render management link for users', function () {
        ProfileMock.mockUser();
        var userMenu;
        var router = Router.run(routes, TestLocation, function (Handler) {
            userMenu = TestUtils.renderIntoDocument(<Handler />);
        });
        expect(
            $(userMenu.getDOMNode()).find('a[href="/mall-management/categories"]')[0]
        ).to.not.exist;
        router.teardown();
        ProfileMock.restore();
    });

});
