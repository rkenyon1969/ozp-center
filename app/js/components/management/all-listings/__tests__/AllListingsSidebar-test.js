'use strict';

var React = require('react');
var expect = require('chai').expect;
var TestUtils = React.addons.TestUtils;

describe('AllListingsSidebar', function() {
    it('renders sidebar filters', function() {
        var AllListingsSidebar = require('../AllListingsSidebar');
        var allListingsSidebar = TestUtils.renderIntoDocument(
            <AllListingsSidebar
                counts = { {} }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [] }
            />
        );

        var html = TestUtils.findRenderedDOMComponentWithTag(allListingsSidebar, 'form');
        expect($(html.getDOMNode()).find('radioGroup[name="approvalStatus"]')).to.exist();
    });
});
