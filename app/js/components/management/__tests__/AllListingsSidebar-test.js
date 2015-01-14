'use strict';

var React = require('react');
var expect = require('chai').expect;
var TestUtils = React.addons.TestUtils;

describe('Sidebar', function() {
    it('renders status filter', function() {
        var Sidebar = require('../shared/Sidebar');
        var Sidebar = TestUtils.renderIntoDocument(
            <Sidebar
                counts = { {} }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [] }
                view = 'adminView'
            />
        );

        var html = TestUtils.findRenderedDOMComponentWithTag(Sidebar, 'form');
        expect($(html.getDOMNode()).find('radioGroup[name="approvalStatus"]')).to.exist();
    });

    it('renders organization filter', function() {
        var Sidebar = require('../shared/Sidebar');
        var Sidebar = TestUtils.renderIntoDocument(
            <Sidebar
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
                view = 'adminView'
            />
        );

        var html = TestUtils.findRenderedDOMComponentWithTag(Sidebar, 'form');
        expect($(html.getDOMNode()).find('input[id="all-listings-filter-organization-to1"]')).to.exist();
    });

    it('renders enabled filter', function() {
        var Sidebar = require('../shared/Sidebar');
        var Sidebar = TestUtils.renderIntoDocument(
            <Sidebar
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
                view = 'adminView'
            />
        );
        expect($(Sidebar.getDOMNode()).find('label[class="label-enabled"]')).to.not.be.empty();
        // var html = $(Sidebar.getDOMNode()).find('label[class="label-enabled"]')[0];
        // expect($(html).find('strong[class="badge"]').text()).to.equal('1');
    });

    it('renders counts for filters', function() {
        var Sidebar = require('../shared/Sidebar');
        var Sidebar = TestUtils.renderIntoDocument(
            <Sidebar
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
            view = 'adminView'
            />
        );
        var html = $(Sidebar.getDOMNode()).find('label[class="label-enabled"]')[0];
        expect($(html).find('strong[class="badge"]').text()).to.equal('1');
    });


});
