'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../utils/_');
var { RouteHandler, State } = require('react-router');
var SystemStateMixin = require('../mixins/SystemStateMixin');

var { fetchLibrary } = require('../actions/SelfActions');

var Quickview = require('../components/quickview');
var CenterProfileWindow = require('./profile/CenterProfileWindow');
var CreateEditListing = require('./createEdit');
var FeedbackModal = require('./management/user/FeedbackModal');
var { ListingDeleteConfirmation } = require('./shared/DeleteConfirmation');

var App = React.createClass({

    mixins: [ SystemStateMixin, State ],

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="App">
                <RouteHandler system={this.state.system} currentUser={this.state.currentUser} />
                { this.renderModal() }
            </div>
        );
        /*jshint ignore:end */
    },

    renderModal: function () {
        var { listing, profile, tab, action } = this.getQuery();

        /*jshint ignore:start */
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
            return <CenterProfileWindow profileId={parseInt(profile, 10)} />
        }
        /*jshint ignore:end */
    },

    componentWillMount: function () {
        fetchLibrary();
    }
});

module.exports = App;
