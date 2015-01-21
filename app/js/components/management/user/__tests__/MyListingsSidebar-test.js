'use strict';

var React = require('react');
var expect = require('chai').expect;
var TestUtils = React.addons.TestUtils;

describe('MyListingsSidebar', function() {
    it('renders status filter', function() {
        var Sidebar = require('../MyListingsSidebar');
        var sidebar = TestUtils.renderIntoDocument(
            <Sidebar
                listings = { [] }
            />
        );
        expect($(sidebar.getDOMNode()).find('radioGroup[name="approvalStatus"]')).to.exist();
    });

    it('does not render organization filter', function() {
        var Sidebar = require('../MyListingsSidebar');
        var sidebar = TestUtils.renderIntoDocument(
            <Sidebar
            listings = { [] }
            />
        );
        expect($(sidebar.getDOMNode()).find('div[name="organization"]')[0]).to.be.empty;
    });

});
