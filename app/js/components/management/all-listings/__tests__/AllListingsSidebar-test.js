'use strict';

describe('AllListingsSidebar', function() {
    it('renders sidebar filters', function() {
        var React = require('react');
        var AllListingsSidebar = require('../AllListingsSidebar');
        var TestUtils = React.addons.TestUtils;

        var allListingsSidebar = TestUtils.renderIntoDocument(
            <AllListingsSidebar
                counts = { {} }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [] }
            />
        );

        var html = TestUtils.findRenderedDOMComponentWithTag(allListingsSidebar, 'form');
        expect(html.getDOMNode().find('radioGroup[name="approvalStatus"]')).to.exist;
    });
});

//
//
//
//
// var expect = require('chai').expect;
// var React = require('react');
// var $ = require('jquery');
// var { TestUtils } = React.addons;
//
// var AllListingsSidebar = require('../AllListingsSidebar');
//
// describe('AllListingsSidebar', function() {
//     var html;
//
//     describe('#render', function() {
//         beforeEach(function() {
//             var counts = {};
//             var listings = [];
//             var filter = {
//                 approvalStatus: null,
//                 org: null,
//                 enabled: null
//             };
//             console.log('settings');
//             var component = AllListingsSidebar();
//             console.log('create component');
//             var componentInstance = TestUtils.renderIntoDocument(
//                 <AllListingsSidebar
//                     value={ filter }
//                     listings={ listings }
//                     counts={ counts }
//                     organizations={ listings }
//                 />
//             );
//             // componentInstance.setState({
//             //     counts: {},
//             //     listings: [],
//             //     filter : {
//             //         approvalStatus: null,
//             //         org: null,
//             //         enabled: null
//             //     }
//             // });
//
//             html = componentInstance.getDOMNode();
//         });
//
//         it('renders filters for AML listing sidebar', function() {
//             expect(html.find('radioGroup[name="approvalStatus"]')).to.exist;
//         });
//     });
// });
//
// // describe('AllListingsSidebar', function () {
// //     beforeEach(function() {
// //
// //         it('renders filters for AML listings', function () {
// //             var AllListingsSidebar = require('../AllListingsSidebar');
// //             console.log('component imported');
// //             var counts = {};
// //             var listings = [];
// //             var filter = {
// //                 approvalStatus: null,
// //                 org: null,
// //                 enabled: null
// //             };
// //         var allListingsSidebar = TestUtils.renderIntoDocument(
// //             <AllListingsSidebar
// //                 value={ filter }
// //                 listings={ listings }
// //                 counts={ counts }
// //                 organizations={ listings }
// //             />
// //             );
// //         });
// //     });
// //     expect(
// //         $(allListingsSidebar.getDOMNode()).find('radioGroup[name="approvalStatus"]')
// //     ).to.exist;
// // });
//
//     // it('does not render management link for users', function () {
//     //     var UserMenu = require('inject?../../mixins/SystemStateMixin!../UserMenu');
//     //     UserMenu = UserMenu({
//     //         '../../mixins/SystemStateMixin': {
//     //             getInitialState: function () {
//     //                 return {
//     //                     currentUser: {
//     //                         isAdmin: false
//     //                     }
//     //                 };
//     //             },
//     //         }
//     //     });
//     //     var userMenu = TestUtils.renderIntoDocument(
//     //         <UserMenu />
//     //     );
//     //     expect(
//     //         $(userMenu.getDOMNode()).find('a[href="#mall-management/categories"]')[0]
//     //     ).to.not.exist;
//     // });
