'use strict';

var expect = require('chai').expect;
var React = require('react');
var { TestUtils } = React.addons;
var moment = require('moment');
var sinon = require('sinon');
var NotificationActions = require('../../../../../actions/NotificationActions');

describe('CreateNotification', function () {

    var CreateNotification = require('../CreateNotification.jsx');

    it('displays 5 options for minutes', () => {
        expect(CreateNotification.defaultProps.minutes).to.eql(['00', '15', '30', '45', '59']);
    });

    it('creates a notification in UTC time', () => {
        var createNotification = TestUtils.renderIntoDocument(<CreateNotification />);
        var date = moment();
        var utcSpy = sinon.spy(Date, 'UTC');
        var createStub = sinon.stub(NotificationActions, 'createNotification');

        createNotification.onExpiresDateChange(date);

        TestUtils.Simulate.change(createNotification.refs.message.getDOMNode(), {target: {value: 'TEST'}});
        TestUtils.Simulate.change(createNotification.refs.hour.getDOMNode(), {target: {value: '06'}});
        TestUtils.Simulate.change(createNotification.refs.minute.getDOMNode(), {target: {value: '15'}});
        TestUtils.Simulate.click(createNotification.refs.send.getDOMNode());

        expect(utcSpy.calledWith(date.year(), date.month(), date.date(), 6, 15)).to.be.ok;
        expect(createStub.calledWithMatch(createNotification.state.uuid, {
            message: 'TEST'
        })).to.be.ok;

        utcSpy.restore();
        createStub.restore();
    });

    it('resets state when notification is created', () => {
        var createNotification = TestUtils.renderIntoDocument(<CreateNotification />);
        var resetSpy = sinon.spy(createNotification, 'onReset');
        var setStateSpy = sinon.spy(createNotification, 'setState');
        NotificationActions.createNotificationCompleted(createNotification.state.uuid);
        expect(resetSpy.calledOnce).to.be.ok;

        expect(setStateSpy.calledWithMatch({
            date: null,
            message: '',
            hour: '00',
            minute: '00'
        })).to.be.ok;

        resetSpy.restore();
        setStateSpy.restore();
    });

});
