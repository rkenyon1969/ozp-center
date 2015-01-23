'use strict';

describe('AllListings', function() {
    it('renders the sidebar on the listing management page', function() {
        var React = require('react');
        var AllListings = require('../AllListings');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;

        var allListings = TestUtils.renderIntoDocument(React.createElement(AllListings));

        expect($(allListings.getDOMNode()).find('.AllListings__sidebar')[0]).to.exist();

    });

    it('renders the grid view on the all listings page', function() {
        var React = require('react');
        var AllListings = require('../AllListings');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;

        var allListings = TestUtils.renderIntoDocument(React.createElement(AllListings));

        expect($(allListings.getDOMNode()).find('.AllListings__listings')[0]).to.exist();

    });
});
