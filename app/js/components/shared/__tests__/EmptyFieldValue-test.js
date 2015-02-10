'use strict';

var expect = require('chai').expect;
var React = require('react');
var { TestUtils } = React.addons;

describe('EmptyFieldValue', function () {

    var EmptyFieldValue = require('../EmptyFieldValue.jsx');

    it('supports `text` prop', function () {
        expect(EmptyFieldValue.defaultProps.text).to.equal('Not provided!');

        var emptyField = TestUtils.renderIntoDocument(
            <EmptyFieldValue />
        );
        expect(emptyField.getDOMNode().nodeName).to.equal('P');
        expect(emptyField.getDOMNode().textContent).to.equal('Not provided!');

        emptyField = TestUtils.renderIntoDocument(
            <EmptyFieldValue text="test" />
        );
        expect(emptyField.getDOMNode().textContent).to.equal('test');
    });

    it('supports `inline` prop', function () {
        expect(EmptyFieldValue.defaultProps.inline).to.equal(false);

        var emptyField = TestUtils.renderIntoDocument(
            <EmptyFieldValue />
        );
        expect(emptyField.getDOMNode().nodeName).to.equal('P');

        emptyField = TestUtils.renderIntoDocument(
            <EmptyFieldValue inline={true} />
        );
        expect(emptyField.getDOMNode().nodeName).to.equal('SPAN');
    });

});
