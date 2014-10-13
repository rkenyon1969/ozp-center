/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CurrentPath = Router.CurrentPath;
var Navigation = Router.Navigation;
var map = require('lodash/collections/map');
var Modal = require('../shared/Modal');
var IconRating = require('../shared/IconRating');
var Header = require('./Header');
var OverviewTab = require('./OverviewTab');
var ReviewsTab = require('./ReviewsTab');
var DetailsTab = require('./DetailsTab');
var ResourcesTab = require('./ResourcesTab');

var GlobalListingStore = require('../../stores/GlobalListingStore');

var LINKS = [{
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
}];

/**
*
* Quickview Component.
* Displays listing info in a modal window.
*
**/
var Quickview = React.createClass({

    mixins: [ CurrentPath, Navigation ],

    propTypes: {
        listing: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            shown: false,
            listing: GlobalListingStore.getById(this.props.params.listingId)
        };
    },

    render: function () {
        var shown = this.state.shown;
        var listing = this.state.listing;
        var title = listing.title();
        var avgRate = listing.avgRate();
        var activeRoute = this.props.activeRouteHandler({
            listing: listing,
            shown: shown
        });

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={ this.onShown } onHidden= { this.onHidden }>
                <Header listing={ listing } onCancel={ this.close } />
                <div className="tabs-container">
                    { this.renderTabs(activeRoute) }
                    <div className="tab-content">
                        { activeRoute }
                    </div>
                </div>
            </Modal>
        );
        /* jshint ignore:end */
    },

    renderTabs: function (activeRoute) {
        var listing = this.state.listing;
        var params = {
            listingId: listing.id()
        };
        var activeRouteName = activeRoute.props.name;

        /* jshint ignore:start */
        var linkComponents = map(LINKS, function (link) {
            var cx = React.addons.classSet({
                active: link.to === activeRouteName
            });
            return (
                <li className={ cx }>
                    <Link to={link.to} params={ params }>{ link.name }</Link>
                </li>
            );
        })

        return (
            <ul className="nav nav-tabs" role="tablist">
                { linkComponents }
            </ul>
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
module.exports.OverviewTab = OverviewTab;
module.exports.ReviewsTab = ReviewsTab;
module.exports.DetailsTab = DetailsTab;
module.exports.ResourcesTab = ResourcesTab;
