'use strict';

var React = require('react');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var Modal = require('../shared/Modal');
var { Link, Navigation, CurrentPath } = require('react-router');

var UserMenu = React.createClass({

    mixins: [ SystemStateMixin ],

    getInitialState: function () {
        return {
            showHelp: false
        };
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="user-menu" className="dropdown navbar-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="fa fa-bars"></i>
                </a>
                <ul className="dropdown-menu" role="menu">
                <li>
                    <h4>Personalize</h4>
                    <ul className="list-unstyled">
                        <li><a href="http://ozone-development.github.io/hud-ui/"><i className="icon-ribbon"></i> Bookmarks</a></li>
                        <li><a href="#profile"><i className="icon-head"></i> Profile</a></li>
                        <li><a href="#settings"><i className="icon-cog"></i> Settings</a></li>
                    </ul>
                </li>
                <li>
                    <h4>Create</h4>
                    <ul className="list-unstyled">
                        <li><Link to="edit"><i className="icon-square-plus"></i> Submit a Listing</Link></li>
                        {
                            this.state.currentUser.isAdmin &&
                            <li><a href="#new"><i className="icon-box"></i> Create a Suite</a></li>
                        }
                    </ul>
                </li>
                <li>
                    <h4>Manage</h4>
                    <ul className="list-unstyled">
                        <li><Link to="my-listings"><i className="icon-stack"></i> Listing Managment</Link></li>
                        {
                            this.state.currentUser.isAdmin &&
                            <li><Link to="mall-management"><i className="icon-shopping-settings"></i> AppsMall Management</Link></li>
                        }
                        <li><a href={METRICS_URL}><i className="icon-bar-graph"></i> Metrics</a></li>
                    </ul>
                </li>
                <li>
                    <ul className="goback list-unstyled">
                        <li className="backToHud">
                            <a href="http://ozone-development.github.io/hud-ui/"><i className="icon-arrow-right"></i> Back to HUD</a>
                        </li>
                    </ul>
                </li>

                </ul>
                {
                    this.state.showHelp ?
                    <Modal className="HelpModal" title="OZONE Help Zone" onHidden={this.onModalHidden}>
                        <iframe style={{width:"100%", height:"500px", border: 'none'}} src={HELP_URL} />
                    </Modal> : null
                }
            </div>
        );
        /*jshint ignore:end */
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }

});

module.exports = UserMenu;
