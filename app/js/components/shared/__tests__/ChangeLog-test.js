'use strict';

var React = require('react');
var Router = require('react-router');
var TestLocation = require('react-router/modules/locations/TestLocation');
var createRoutes = require('../../../__tests__/createRoutes');
var { TestUtils } = React.addons;
var expect = require('chai').expect;

describe('ChangeLog', function () {

    var ChangeLog = require('inject?../profile/ProfileLink!../ChangeLog')({
        '../profile/ProfileLink': React.createClass({
            render: function() {
                /* jshint ignore:start */
                return <a href="profile">{this.props.children}</a>;
                /* jshint ignore:end */
            }
        })
    });

    var expect = require('chai').expect;

    it('renders a change log with no listing name', function () {
      var changeLog = TestUtils.renderIntoDocument(
        <ChangeLog
          showListingName={false}
          changeLog={
            {
              "id":112,
              "action":"APPROVED",
              "author": {
                "id":2,
                "displayName":"Test Admin 1",
                "username":"testAdmin1"
                },
              "listing":{
                  "id":28,
                  "iconUrl":"https://localhost:8443/marketplace/api/image/cacbb033-40f1-49ac-9e53-b964b968a92f.png",
                  "title":"FrameIt",
                  "agency":"Test Organization"
              },
              "activityDate":"2015-01-30T17:43:45.365+0000",
              "changeDetails":[]
            }}
        />
      );

      expect(
        $(changeLog.getDOMNode()).find('div.col-md-9 > div').text()
      ).to.equal('Test Admin 1 approved the listing');
    });

    it('renders a change log with a listing name', function() {
      var changeLog;
      var routes = createRoutes(ChangeLog);
      TestLocation.history = ['/test'];
      var router = Router.run(routes, TestLocation, function (Handler) {
        changeLog = TestUtils.renderIntoDocument(
          <Handler
            showListingName={true}
            changeLog={
              {
                "id":112,
                "action":"APPROVED",
                "author": {
                  "id":2,
                  "displayName":"Test Admin 1",
                  "username":"testAdmin1"
                  },
                "listing":{
                    "id":28,
                    "iconUrl":"https://localhost:8443/marketplace/api/image/cacbb033-40f1-49ac-9e53-b964b968a92f.png",
                    "title":"FrameIt",
                    "agency":"Test Organization"
                },
                "activityDate":"2015-01-30T17:43:45.365+0000",
                "changeDetails":[]
              }}
          />
        );
      });

      expect($(changeLog.getDOMNode()).find('a:last-of-type').text()).to.equal('FrameIt');
      router.teardown();

    });



});
