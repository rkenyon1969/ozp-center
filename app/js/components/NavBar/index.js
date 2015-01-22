/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Alerts = require('../alerts');
var HelpModal = require('./helpmodal');

var ProfileStore = require('../../stores/ProfileStore');

var Role = require('../../constants').UserRole;

var NavBar = React.createClass({

    mixins: [Reflux.connect(ProfileStore, 'profile')],

    getInitialState: function() {
        return {
            showHelp: false
        };
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li><a className="lrg" href="#"><i className="icon-home"></i></a></li>
                            <li className="active"><a className="lrg" href={CENTER_URL}><i className="icon-shopping"></i></a></li>
                            <li><a className="lrg" href={WEBTOP_URL}><i className="icon-layout"></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown"><i className="icon-bell-filled active"></i></a>
                                <Alerts />
                            </li>
                            <li>
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question"></i></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="lrg" data-toggle="dropdown"><i className="icon-menu"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href="#"><i className="icon-ribbon"></i>Bookmarks</a></li>
                                    <li><a href="#"><i className="icon-head"></i>Profile</a></li>
                                    <li><a href="#"><i className="icon-cog"></i>Settings</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={CENTER_URL + '/edit'}><i className="icon-square-plus"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL}><i className="icon-cloud"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={CENTER_URL + '/user-management/my-listings'}><i className="icon-layers"></i>Listing Management</a></li>
                                    {
                                        this.isAdmin() &&
                                        <li><a href={CENTER_URL + '/mall-management/categories'}><i className="icon-shopping-settings"></i>Marketplace Settings</a></li>
                                    }
                                    <li><a href={METRICS_URL}><i className="icon-bar-graph-2"></i>Metrics</a></li>
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
        /*jshint ignore:end */
    },

    isAdmin: function() {
        var profile = this.state.profile;

        return this.state.profile && (Role[profile.highestRole] >= Role.APPSMALL_STEWARD);
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }

});

module.exports = NavBar;
