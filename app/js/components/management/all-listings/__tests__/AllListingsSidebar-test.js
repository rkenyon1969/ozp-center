'use strict';

var expect = require('chai').expect;
var React = require('react');
var $ = require('jquery');
var { TestUtils } = React.addons;

describe('AllListingsSidebar', function () {

    it('renders filters for AML listings', function () {
        var AllListingsSidebar = require('../AllListingsSidebar');

        var counts = {};
        var listings = [];
        var filter = {
            approvalStatus: null,
            org: null,
            enabled: null
        };

        var allListingsSidebar = TestUtils.renderIntoDocument(
            <AllListingsSidebar
                value={ this.filter }
                listings={ this.listings }
                counts={ this.counts }
                organizations={ this.listings } />
        );
        expect(
            $(allListingsSidebar.getDOMNode()).find('radioGroup[name="approvalStatus"]')
        ).to.exist;
    });

    // it('does not render management link for users', function () {
    //     var UserMenu = require('inject?../../mixins/SystemStateMixin!../UserMenu');
    //     UserMenu = UserMenu({
    //         '../../mixins/SystemStateMixin': {
    //             getInitialState: function () {
    //                 return {
    //                     currentUser: {
    //                         isAdmin: false
    //                     }
    //                 };
    //             },
    //         }
    //     });
    //     var userMenu = TestUtils.renderIntoDocument(
    //         <UserMenu />
    //     );
    //     expect(
    //         $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
    //     ).to.not.exist;
    // });

});
