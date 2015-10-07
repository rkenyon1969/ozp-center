'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, enums, list } = t;
var Crud = require('../../shared/Crud.jsx');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var Stewards = React.createClass({

    mixins: [ require('../../../mixins/SystemStateMixin') ],

    getDefaultProps: function () {
        return {
            title: 'Steward',
            url: API_URL + '/api/profile?role=ORG_STEWARD',
            getDisplayName: function (selectedRecord) {
                return selectedRecord.displayName;
            },
            getUsername: (data) => {
              return data.map((user)=> {
                user.username = user.user.username;
                return user;
              });
            },
            getStweardOrgs: (data) => {
              return data.map((user)=> {
                user.stewardedOrganizations = user.stewardedOrganizations.map((org) => {
                  return org.title;
                });
                return user;
              });
            },
            structStewardOrgs: (data) => {
              var dataArray = [];
              data.stewardedOrganizations.map((org) => {
                dataArray.push({
                  title: org
                });
              });
              var newData = {
                displayName: data.displayName,
                stewardedOrganizations: dataArray
              };
              return newData;
            },
            form: {
                fields: {
                    username: {
                        disabled: true
                    },
                    displayName: {
                        disabled: true
                    },
                    stewardedOrganizations: {
                        disableOrder: true
                    }
                }
            },
            grid: {
                columns: [
                    { field: 'displayName', caption: 'Display Name', size: '34%' },
                    { field: 'username', caption: 'Username', size: '33%' },
                    { field: 'stewardedOrganizations', caption: 'Steward Organizations', size: '33%'}
                ],
                show: {
                    toolbar: true,
                    toolbarAdd: false,
                    toolbarEdit: true,
                    toolbarDelete: false,
                    toolbarSearch: false,
                    toolbarReload: false,
                    toolbarColumns: false
                }
            }
        };
    },

    getSchema: function () {
        // Steward Schema
        var organizations = this.state.system.organizations
          .map(function (org) {
            return org.title;
          });
        return struct({
            displayName: subtype(Str, function (s) {
                return s.length <= 255;
            }),
            stewardedOrganizations: list(enums.of(organizations))
        });
    },

    render: function () {
        return this.transferPropsTo(<Crud Schema={this.getSchema()} />);
    }

});

module.exports = Stewards;
