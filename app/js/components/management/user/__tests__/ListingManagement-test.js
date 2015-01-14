'use strict';

describe('ListingManagement', function() {

    // it('renders default tabs for user', function () {
    //     var React = require('react');
    //     var expect = require('chai').expect;
    //     var TestUtils = React.addons.TestUtils;
    //
    //     var ListingManagement = require('inject?../../../mixins/SystemStateMixin&../../../mixins/TabMixin!../index.js');
    //     debugger;
    //     ListingManagement = ListingManagement({
    //         '../../../mixins/SystemStateMixin': {
    //             getInitialState: function () {
    //                 return {
    //                     currentUser: {
    //                         isAdmin: false,
    //                         stewardedOrganizations: []
    //                     }
    //                 };
    //             }
    //         },
    //         '../../../mixins/TabMixin': {
    //             renderTabs: function(links) {
    //                 var me = this;
    //
    //                 /* jshint ignore:start */
    //                 var linkComponents = links.map(function (link) {
    //                     return (
    //                         <li>
    //                         </li>
    //                     );
    //                 });
    //
    //                 return (
    //                     <ul className="nav nav-tabs" role="tablist">
    //                         { linkComponents }
    //                     </ul>
    //                 );
    //                 /* jshint ignore:end */
    //             }, isActive: function(string) {
    //                 return true;
    //             }
    //         }
    //     });
    //     var listingManagement = TestUtils.renderIntoDocument(
    //         <ListingManagement />
    //     );
    //     expect(
    //         $(listingManagement.getDOMNode()).find('ul[className="nav-tabs"]').find('li')
    //     ).to.be.empty;
    // });

});
