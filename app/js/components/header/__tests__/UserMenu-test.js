'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('UserMenu', function () {

    var UserMenu = require('../UserMenu');

    it('renders management link for admins', function () {
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        userMenu.setState({
            currentUser: {
                isAdmin: true
            }
        });
        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.exist;
    });

    it('does not render management link for users', function () {
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        userMenu.setState({
            currentUser: {
                isAdmin: false
            }
        });

        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.not.exist;
    });

});
