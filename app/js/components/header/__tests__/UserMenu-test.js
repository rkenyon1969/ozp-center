'use strict';

var expect = require('chai').expect;
var React = require('react');
var rewire = require('rewire');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('EmptyFieldValue', function () {

    var UserMenu = rewire('../UserMenu');

    it('renders management link for admins', function () {
        var adminStub = UserMenu.__set__('ProfileStore', {
            isAdmin: function () {
                return true;
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.exist;

        adminStub();
    });

    it('does not render management link for users', function () {
        var userStub = UserMenu.__set__('ProfileStore', {
            isAdmin: function () {
                return false;
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );

        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.not.exist;

        userStub();
    });

});
