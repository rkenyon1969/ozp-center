'use strict';

var expect = require('chai').expect;
var React = require('react');
var { TestUtils } = React.addons;

describe('IconRating', function () {

    var IconRating = require('../IconRating.jsx');

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

    it('updates on props change', function () {
        var TestComponent = React.createClass({
            getInitialState: function () {
                return {
                    currentRating: this.props.currentRating
                };
            },
            setCurrentRating: function (rating) {
                this.setState({ currentRating: rating });
            },
            render: function () {
                return <IconRating currentRating={this.state.currentRating} />
            }
        });
        var testComponent = TestUtils.renderIntoDocument(<TestComponent currentRating={1}/>);
        var iconRating = TestUtils.findRenderedComponentWithType(testComponent, IconRating);
        expect(iconRating.state.rating).to.equal(1);
        testComponent.setCurrentRating(2);
        expect(iconRating.state.rating).to.equal(2);
    });

});
