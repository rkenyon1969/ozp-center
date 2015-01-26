'use strict';

var expect = require('chai').expect;
var React = require('react');
var { TestUtils } = React.addons;

describe('IconRating', function () {

    var IconRating = require('../IconRating');

    it('rounds rating correctly', function () {
        [1,2,3,4,5].forEach(function (num) {
            var iconRating = TestUtils.renderIntoDocument(<IconRating currentRating={num + 0.24}/>);
            expect(iconRating.state.rating).to.equal(num);

            iconRating = TestUtils.renderIntoDocument(<IconRating currentRating={num + 0.25}/>);
            expect(iconRating.state.rating).to.equal(num + 0.5);

            iconRating = TestUtils.renderIntoDocument(<IconRating currentRating={num + 0.74}/>);
            expect(iconRating.state.rating).to.equal(num + 0.5);

            iconRating = TestUtils.renderIntoDocument(<IconRating currentRating={num + 0.75}/>);
            expect(iconRating.state.rating).to.equal(num + 1);

            iconRating = TestUtils.renderIntoDocument(<IconRating currentRating={num + 0.99}/>);
            expect(iconRating.state.rating).to.equal(num + 1);
        });

    });

});
