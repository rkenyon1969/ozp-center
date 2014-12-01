'use strict';

var React = require('react');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var Modal = require('../shared/Modal');

// TODO: figure out where to pull in production. build time config? CDN?
var helpPDF = '../hud-ui/assets/PlaceholderUserGuide.pdf';

var UserMenu = React.createClass({

    mixins: [ SystemStateMixin ],

    getInitialState: function() {
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
                    <li><a href="javascript:;" onClick={this.showHelpModal}><i className="fa fa-question" style={{width: "29px"}}></i>Help</a></li>
                    <li><a href="#user-management/my-listings"><i className="fa fa-list"></i>My Listings</a></li>
                    {
                        this.state.currentUser.isAdmin &&
                            <li><a href="#mall-management/categories"><i className="fa fa-wrench"></i>AppsMall Management</a></li>
                    }
                    <li><a href={ LOGOUT_URL }><i className="fa fa-sign-out"></i>Logout</a></li>
                </ul>
                {
                    this.state.showHelp ?
                        <Modal className="HelpModal" title="OZONE Help Zone" onHidden={this.onModalHidden}>
                            <embed width="100%" height="500px" name="plugin" src={helpPDF} type="application/pdf"></embed>
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
