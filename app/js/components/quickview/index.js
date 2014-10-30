'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var CurrentPath = Router.CurrentPath;
var Navigation = Router.Navigation;
var Tab = require('../../mixins/TabMixin');

// component dependencies
var Modal = require('../shared/Modal');
var IconRating = require('../shared/IconRating');
var Header = require('./Header');
var ChangeLogTab = require('./ChangeLogTab');

var GlobalListingStore = require('../../stores/GlobalListingStore');

/**
*
* Quickview Component.
* Displays listing info in a modal window.
*
**/
var Quickview = React.createClass({

    mixins: [ Reflux.ListenerMixin, CurrentPath, Navigation, Tab ],

    propTypes: {
        listing: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            tabs: [{
                to: 'quickview-overview',
                name: 'Overview'
            }, {
                to: 'quickview-reviews',
                name: 'Reviews'
            }, {
                to: 'quickview-details',
                name: 'Details'
            }, {
                to: 'quickview-resources',
                name: 'Resources'
            }, {
                to: 'quickview-changelog',
                name: 'Change Log'
            }]
        };
    },

    getInitialState: function () {
        this.listenTo(GlobalListingStore, this.onStoreChange);

        return {
            shown: false,
            listing: GlobalListingStore.getById(this.props.params.listingId)
        };
    },

    onStoreChange: function () {
        this.setState({
            listing: GlobalListingStore.getById(this.props.params.listingId)
        });
    },

    render: function () {
        var shown = this.state.shown;
        var listing = this.state.listing;

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={ this.onShown } onHidden= { this.onHidden }>
                {
                    !listing ?
                        <p>Loading...</p> :
                        [
                            <Header listing={ listing } onCancel={ this.close }></Header>,
                            <div className="tabs-container">
                                { this.renderTabs(this.props.tabs, { listingId: listing.id() }) }
                                <div className="tab-content">
                                    <this.props.activeRouteHandler listing={ listing } shown = { shown } />
                                </div>
                            </div>
                        ]
                }
            </Modal>
        );
        /* jshint ignore:end */
    },

    onShown: function () {
        // dont force focus causes infinite loop with overview tab's modal carousel
        $(document).off('focusin.bs.modal');

        this.setState({
            shown: true
        });
    },

    onHidden: function () {
        var currentPath = this.getCurrentPath();
        var parentPath = currentPath.substring(1, currentPath.indexOf('/quickview'));

        // go back to the parent route
        this.transitionTo(parentPath);
    },

    close: function () {
        this.refs.modal.close();
    }
});

module.exports = Quickview;
module.exports.OverviewTab = require('./OverviewTab');
module.exports.ReviewsTab = require('./ReviewsTab');
module.exports.DetailsTab = require('./DetailsTab');
module.exports.ResourcesTab = require('./ResourcesTab');
module.exports.ChangeLogTab = ChangeLogTab;
