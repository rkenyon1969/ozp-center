/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var UserNotifications = require('./UserNotifications.jsx');
var HelpModal = require('./helpmodal.jsx');
var ProfileLink = require('../profile/ProfileLink.jsx');
var { HUD_URL, METRICS_URL, HELP_URL, WEBTOP_URL, DEVELOPER_RESOURCES_URL } = require('ozp-react-commons/OzoneConfig');

var SystemStateMixin = require('../../mixins/SystemStateMixin');

var NavBar = React.createClass({

    mixins: [ SystemStateMixin ],

    getInitialState: function() {
        return {
            showHelp: false
        };
    },

    render: function () {
        var Metrics = (this.isAdmin() || this.isOrgSteward()) ?
            <li><a href={METRICS_URL}><i className="icon-bar-graph-2"></i>Metrics</a></li> : '';

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" id="globalNav">
                <div className="container-fluid container" id="centered">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li><a className="lrg" href={HUD_URL}><i className="icon-home"></i></a></li>
                            <li className="active"><a className="lrg" href='#/home' ><i className="icon-shopping activeIcon"></i></a></li>
                            <li><a className="lrg" href={WEBTOP_URL}><i className="icon-layout"></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown"><i className="icon-bell-filled activeIcon"></i></a>
                                <UserNotifications />
                            </li>
                            <li>
                                <a onClick={this.showHelpModal}><i className="icon-question"></i></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="lrg" data-toggle="dropdown"><i className="icon-menu"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href={HUD_URL}><i className="icon-ribbon"></i>Bookmarks</a></li>
                                    <li>
                                        <ProfileLink profileId="self">
                                            <i className="icon-head"/>Profile
                                        </ProfileLink>
                                    </li>
                                    <li><a href="#"><i className="icon-cog"></i>Settings</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={'#/edit'}><i className="icon-square-plus"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL}><i className="icon-cloud"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={'#/user-management/my-listings'}><i className="icon-layers"></i>Listing Management</a></li>
                                    {
                                        this.isAdmin() &&
                                        <li><a href={'#/mall-management/categories'}><i className="icon-shopping-settings"></i>Marketplace Settings</a></li>
                                    }
                                    { Metrics }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.showHelp && <HelpModal onHidden={this.onModalHidden} />
                }
            </nav>
        );
    },

    isOrgSteward: function(){
        return this.state.currentUser.isOrgSteward();
    },

    isAdmin: function() {
        return this.state.currentUser.isAdmin;
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }

});

module.exports = NavBar;
