/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Modal = require('../shared/Modal');
var IconRating = require('../shared/IconRating');
var Header = require('./Header');
var OverviewTab = require('./OverviewTab');
var ReviewsTab = require('./ReviewsTab');
var DetailsTab = require('./DetailsTab');
var ResourcesTab = require('./ResourcesTab');

/**
*
* Quickview Component.
* Displays listing info in a modal window.
*
**/
var Quickview = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            shown: false
        };
    },

    render: function () {
        var shown = this.state.shown;
        var listing = this.props.listing;
        var title = listing.title();
        var avgRate = listing.avgRate();

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={ this.onShown } >
                <Header listing={ listing } onCancel={ this.close } />
                <div className="tabs-container">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="active"><a href=".quickview-overview" role="tab" data-toggle="tab">Overview</a></li>
                        <li><a href=".quickview-reviews" role="tab" data-toggle="tab">Reviews</a></li>
                        <li><a href=".quickview-details" role="tab" data-toggle="tab">Details</a></li>
                        <li><a href=".quickview-resources" role="tab" data-toggle="tab">Resources</a></li>
                    </ul>
                    <div className="tab-content">
                        <OverviewTab listing= { listing } shown={ shown } />
                        <ReviewsTab listing={ listing } />
                        <DetailsTab listing={ listing } />
                        <ResourcesTab listing={ listing } />
                    </div>
                </div>
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

    close: function () {
        this.refs.modal.close();
    }
});

module.exports = Quickview;