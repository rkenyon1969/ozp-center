'use strict';

var React = require('react');
var UserNotificationDropdown = require('ozp-react-commons/components/notification/UserNotificationDropdown.jsx');
var HelpModal = require('./helpmodal.jsx');
var ProfileLink = require('../profile/ProfileLink.jsx');
var ModalLink = require('../ModalLink.jsx');
var { HUD_URL, METRICS_URL, WEBTOP_URL, DEVELOPER_RESOURCES_URL} = require('ozp-react-commons/OzoneConfig');
var CreateEditActions = require('../../actions/CreateEditActions');

var SystemStateMixin = require('../../mixins/SystemStateMixin');

var ActiveState = require('../../mixins/ActiveStateMixin');
var { Navigation } = require('react-router');
var NavBar = React.createClass({

    mixins: [ SystemStateMixin, ActiveState, Navigation ],

    getInitialState: function() {
        return {
            showHelp: false
        };
    },

    componentDidMount: function(){
      $(this.refs.hastooltips.getDOMNode()).find('.tooltiped').each(function(){
        $(this).tooltip({
          delay: 400
        });
      });
    },

    render: function () {
        var Metrics = (this.isAdmin() || this.isOrgSteward()) ?
            <li><a href={METRICS_URL} target="_blank"><i className="icon-bar-graph-2-grayLightest"></i>Metrics</a></li> : '';

        var contactHref = this.makeHref( this.getActiveRoutePath(), this.getParams(), {
            contacts:true
        });

        return (
            <nav ref="hastooltips" className="navbar navbar-inverse navbar-fixed-top" id="globalNav">
                <div className="container-fluid" id="centered">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li className="tooltiped" data-toggle="tooltip" data-placement="bottom" title="HUD"><a className="lrg" href={HUD_URL}><i className="icon-home-grayLightest" alt=""></i></a></li>
                            <li className="active tooltiped" data-toggle="tooltip" data-placement="bottom" title="Center"><a className="lrg" href='#/home' ><i className="icon-shopping-grayLightest activeIcon" alt=""></i></a></li>
                            <li className="tooltiped" data-toggle="tooltip" data-placement="bottom" title="Webtop"><a className="lrg" href={WEBTOP_URL}><i className="icon-layout-grayLightest" alt=""></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <UserNotificationDropdown/>
                            <li className="tooltiped" data-toggle="tooltip" data-placement="bottom" title="Help">
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question-grayLightest"alt=""></i></a>
                            </li>
                            <li data-toggle="tooltip" data-placement="bottom" title="Menu" className="dropdown user-menu-dropdown tooltiped">
                                <a href="#" className="lrg" data-toggle="dropdown"><i className="icon-menu-grayLightest" alt=""></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href={HUD_URL}><i className="icon-ribbon-grayLightest"></i>Bookmarks</a></li>
                                    <li>
                                        <ProfileLink profileId="self">
                                            <i className="icon-head-grayLightest"/>Profile
                                        </ProfileLink>
                                    </li>
                                    <li>
                                        <ModalLink queryParams={{settings: true}}>
                                            <i className="icon-cog-grayLightest"></i>Settings
                                        </ModalLink>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={'#/edit'} onClick={()=>{
                                          CreateEditActions.resetForm();
                                      }}><i className="icon-square-plus-grayLightest"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL} target="_blank"><i className="icon-cloud-grayLightest"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={'#/user-management/my-listings'}><i className="icon-layers-grayLightest"></i>Listing Management</a></li>
                                    {
                                        this.isAdmin() &&
                                        <li><a href={'#/mall-management/categories'}><i className="icon-shopping-settings-grayLightest"></i>Center Settings</a></li>
                                    }
                                    { Metrics }
                                    <li><a href={contactHref} className="caboose" ><i className="icon-speech-bubble-grayLightest"></i>Contact</a></li>
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
        return (this.state.currentUser.highestRole === "ORG_STEWARD") ? true : false;
    },

    isAdmin: function() {
        return this.state.currentUser.isAdmin();
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }

});

module.exports = NavBar;
