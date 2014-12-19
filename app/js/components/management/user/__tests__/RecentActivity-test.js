'use strict';

describe('AllListings', function() {
    it('', function() {
        var React = require('react');
        var RecentActivity = require('../RecentActivity');
        var TestUtils = React.addons.TestUtils;
        var $ = require('jquery');
        var expect = require('chai').expect;

        var recentActivity = TestUtils.renderIntoDocument(React.createElement(RecentActivity));

        expect($(recentActivity.getDOMNode()).find('.RecentActivity__sidebar')[0]).to.exist();
    });
});
