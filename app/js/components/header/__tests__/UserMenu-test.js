'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('UserMenu', function () {

    it('renders management link for admins', function () {
        var MockLink = React.createClass({
            render: function() {
                return (
                    <a href={this.props.to}>{this.props.children}</a>
                );
            }
        });
        var UserMenu = require('inject?../../mixins/SystemStateMixin&react-router!../UserMenu');
        UserMenu = UserMenu({
            '../../mixins/SystemStateMixin': {
                getInitialState: function () {
                    return {
                        currentUser: {
                            isAdmin: true
                        }
                    };
                },
            },
            'react-router' : {
                Link: MockLink
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        expect(
            $(userMenu.getDOMNode()).find('a[href="mall-management"]')[0]
        ).to.exist;
    });

    it('does not render management link for users', function () {
        var MockLink = React.createClass({
            render: function() {
                return (
                    <a href={this.props.to}>{this.props.children}</a>
                );
            }
        });
        var UserMenu = require('inject?../../mixins/SystemStateMixin&react-router!../UserMenu');
        UserMenu = UserMenu({
            '../../mixins/SystemStateMixin': {
                getInitialState: function () {
                    return {
                        currentUser: {
                            isAdmin: false
                        }
                    };
                },
            },
            'react-router' : {
                Link: MockLink
            }
        });
        var userMenu = TestUtils.renderIntoDocument(
            <UserMenu />
        );
        expect(
            $(userMenu.getDOMNode()).find('a[href="mall-management"]')[0]
        ).to.not.exist;
    });

});
