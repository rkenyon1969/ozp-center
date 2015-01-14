'use strict';

var React = require('react');
var expect = require('chai').expect;
var TestUtils = React.addons.TestUtils;

describe('OrgListingsSidebar', function() {
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

    it('does not render organization filters', function() {
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
            view = 'orgView'
            />
        );
        expect($(Sidebar.getDOMNode()).find('div[name="organization"]')).to.be.empty;
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
            view = 'orgView'
            />
        );
        var html = $(Sidebar.getDOMNode()).find('label[class="label-enabled"]')[0];
        expect($(html).find('strong[class="badge"]').text()).to.equal('1');
    });

});
