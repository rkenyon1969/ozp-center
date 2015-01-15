'use strict';

var React = require('react');
var expect = require('chai').expect;
var TestUtils = React.addons.TestUtils;

describe('OrgListingsSidebar', function() {
    it('renders status filter', function() {
        var Sidebar = require('../shared/Sidebar');
        var sidebar = TestUtils.renderIntoDocument(
            <Sidebar
                counts = { {} }
                listings = { [] }
                value = { {approvalStatus: null, org: null, enabled: null} }
                organizations = { [] }
                view = 'adminView'
            />
        );

        expect($(sidebar.getDOMNode()).find('radioGroup[name="approvalStatus"]')).to.exist();
    });

    it('does not render organization filters', function() {
        var Sidebar = require('../shared/Sidebar');
        var sidebar = TestUtils.renderIntoDocument(
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
        expect($(sidebar.getDOMNode()).find('div[name="organization"]')[0]).to.be.empty;
    });

    it('renders enabled filter', function() {
        var Sidebar = require('../shared/Sidebar');
        var sidebar = TestUtils.renderIntoDocument(
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
        expect(
            $(sidebar.getDOMNode())
                .find('label[class="label-enabled"]')
                .find('strong[class="badge"]').text()
        ).to.equal('1');
    });

});
