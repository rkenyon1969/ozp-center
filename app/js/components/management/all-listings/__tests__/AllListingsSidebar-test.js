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

    it('renders filters for each organization', function() {
        var AllListingsSidebar = require('../AllListingsSidebar');
        var allListingsSidebar = TestUtils.renderIntoDocument(
            <AllListingsSidebar
                counts = { {
                    'APPROVLED': 1,
                    'organizations': {
                        '1': 1
                    },
                    'total': 1,
                    'enabled': 1
                } }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [
                    {
                    'id' : 1,
                    'shortName' : 'TO1',
                    'title' : 'Test Organization'
                    }
                ] }
            />
        );

        var html = TestUtils.findRenderedDOMComponentWithTag(allListingsSidebar, 'form');
        expect($(html.getDOMNode()).find('input[id="all-listings-filter-organization-to1"]')).to.exist();
    });

    it('renders counts for each filter', function() {
        var AllListingsSidebar = require('../AllListingsSidebar');
        var allListingsSidebar = TestUtils.renderIntoDocument(
            <AllListingsSidebar
                counts = { {
                    'APPROVLED': 1,
                    'organizations': {
                        '1': 1
                    },
                    'total': 1,
                    'enabled': 1
                } }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [
                    {
                    'id' : 1,
                    'shortName' : 'TO1',
                    'title' : 'Test Organization'
                    }
                ] }
            />
        );
        var html = $(allListingsSidebar.getDOMNode()).find('label[class="label-enabled"]')[0];
        expect($(html).find('strong[class="badge"]').text()).to.equal('1');
    });
    
});
