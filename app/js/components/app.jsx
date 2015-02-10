'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../utils/_');
var { RouteHandler, State } = require('react-router');
var SystemStateMixin = require('../mixins/SystemStateMixin');

var { fetchLibrary } = require('ozp-react-commons/actions/ProfileActions');

var Quickview = require('../components/quickview/index.jsx');
var CenterProfileWindow = require('./profile/CenterProfileWindow.jsx');
var CreateEditListing = require('./createEdit/index.jsx');
var FeedbackModal = require('./management/user/FeedbackModal.jsx');
var { ListingDeleteConfirmation } = require('./shared/DeleteConfirmation.jsx');

var App = React.createClass({

    mixins: [ SystemStateMixin, State ],

    render: function () {
        return (
            <div id="App">
                <RouteHandler system={this.state.system} currentUser={this.state.currentUser} {...this.props} />
                { this.renderModal() }
            </div>
        );
    },

    renderModal: function () {
        var { listing, profile, tab, action } = this.getQuery();

        if (listing) {
            if (tab) {
                var preview = action === 'preview';
                return <Quickview listingId={ listing } tab={tab} preview={ preview } system={this.state.system} currentUser={this.state.currentUser} />;
            }
            else if (action === 'feedback') {
                return <FeedbackModal listing={listing} />;
            }
            else if (action === 'delete') {
                return <ListingDeleteConfirmation listing={listing} />;
            }
        }
        else if (profile) {
            return <CenterProfileWindow profileId={profile} />;
        }
    },

    componentWillMount: function () {
        fetchLibrary();
    }
});

module.exports = App;
