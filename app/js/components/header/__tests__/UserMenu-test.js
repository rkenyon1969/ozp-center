'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('UserMenu', function () {

    it('renders management link for admins', function () {
        var UserMenu = require('inject?../../mixins/SystemStateMixin!../UserMenu');
        UserMenu = UserMenu({
            '../../mixins/SystemStateMixin': {
                getInitialState: function() {
                    return {
                        currentUser: {
                            isAdmin: true
                        }
                    };
                },
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.exist;
    });

    it('does not render management link for users', function () {
        var UserMenu = require('inject?../../mixins/SystemStateMixin!../UserMenu');
        UserMenu = UserMenu({
            '../../mixins/SystemStateMixin': {
                getInitialState: function() {
                    return {
                        currentUser: {
                            isAdmin: false
                        }
                    };
                },
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        expect(
            $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
        ).to.not.exist;
    });

});
