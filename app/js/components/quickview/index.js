'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var CurrentPath = Router.CurrentPath;
var Navigation = Router.Navigation;
var Tab = require('../../mixins/TabMixin');
var _ = require('../../utils/_');

// component dependencies
var Modal = require('../shared/Modal');
var IconRating = require('../shared/IconRating');
var Header = require('./Header');
var { UserRole } = require('../../constants');
var GlobalListingStore = require('../../stores/GlobalListingStore');
var ProfileStore = require('../../stores/ProfileStore');

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
            }]
        };
    },

    getInitialState: function () {
        this.listenTo(GlobalListingStore, this.onStoreChange);
        this.listenTo(ProfileStore, this.onStoreChange);

        var storeData = this.getStoreData();
        storeData.shown = false;
        return storeData;
    },

    getStoreData: function () {
        var listingId = this.props.params.listingId;
        return {
            listing: GlobalListingStore.getById(listingId),
            changeLogs: GlobalListingStore.getChangeLogs(listingId) || [],
            currentUser: ProfileStore.getSelf()
        };
    },

    onStoreChange: function () {
        this.setState(this.getStoreData());
    },

    render: function () {
        var { shown, listing, changeLogs, currentUser } = this.state;
        var owners, tabs;

        if (listing) {
            tabs = _.cloneDeep(this.props.tabs);
            owners = listing.owners().map(function (owner) {
                return owner.username;
            });

            if (ProfileStore.isAdmin() || _.contains(owners, currentUser.username)) {
                tabs.push({
                    to: 'quickview-administration',
                    name: 'Administration'
                });
            }
        }

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={ this.onShown } onHidden= { this.onHidden }>
                {
                    !listing ?
                        <p>Loading...</p> :
                        [
                            <Header listing={ listing } onCancel={ this.close }></Header>,
                            <div className="tabs-container">
                                { this.renderTabs(tabs, { listingId: listing.id() }) }
                                <div className="tab-content">
                                    <this.props.activeRouteHandler currentUser={currentUser}
                                        changeLogs={changeLogs} listing={listing} shown ={shown} />
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
module.exports.AdministrationTab = require('./AdministrationTab');
