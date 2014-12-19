'use strict';

describe('AllListings', function() {
    it('', function() {
        var React = require('react');
        var AllListings = require('../index.js');
        var expect = require('chai').expect;
        var TestUtils = React.addons.TestUtils;

        var allListings = TestUtils.renderIntoDocument(React.createElement(AllListings));

        var html = TestUtils.findRenderedDOMComponentWithTag(allListings, 'form');
        expect(html.getDOMNode().find('radioGroup[name="approvalStatus"]')).to.exist;
    });
});
