'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../utils/_');

var SystemStateMixin = require('../mixins/SystemStateMixin');

var { fetchLibrary } = require('../actions/ProfileActions');

var Quickview = require('../components/quickview');
var CreateEditListing = require('./createEdit');
var FeedbackModal = require('./management/user/FeedbackModal');
var { ListingDeleteConfirmation } = require('./shared/DeleteConfirmation');

var App = React.createClass({

    mixins: [ SystemStateMixin ],

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="App">
                <this.props.activeRouteHandler { ..._.pick(this.state, 'system', 'currentUser') } />
                { this.renderModal() }
            </div>
        );
        /*jshint ignore:end */
    },

    renderModal: function () {
        var { listing, tab, action } = this.props.query;

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
        /*jshint ignore:end */
    },

    componentWillMount: function () {
        fetchLibrary();
    }
});

module.exports = App;
