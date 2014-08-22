/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Modal = require('../shared/Modal');
var IconRating = require('react-icon-rating');
var Carousel = require('../carousel');
var Header = require('./Header');
var ReviewsTab = require('./ReviewsTab');

/**
*
* Quickview Component.
* Displays listing info in a modal window.
*
**/
var Quickview = React.createClass({

    getInitialState: function() {
        return {
            shown: false
        };
    },

    render: function () {
        var shown = this.state.shown;
        var listing = this.props.listing;
        var title = listing.title();
        var description = listing.description() || 'No description provided!';
        var avgRate = listing.avgRate();

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={ this.onShown } >
                <Header listing={ listing } />
                <div className="tabs-container">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="active"><a href=".quickview-overview" role="tab" data-toggle="tab">Overview</a></li>
                        <li><a href=".quickview-reviews" role="tab" data-toggle="tab">Reviews</a></li>
                        <li><a href=".quickview-details" role="tab" data-toggle="tab">Details</a></li>
                        <li><a href=".quickview-resources" role="tab" data-toggle="tab">Resources</a></li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active row quickview-overview">
                            <Carousel autoInit={ shown } className="col-md-8">
                                <img src="http://localhost:3000/api/persistence/store/apps/drive/images/53d282f310478a5bb6066546" />
                                <img src="http://localhost:3000/api/persistence/store/apps/drive/images/53d282f310478a5bb6066546" />
                            </Carousel>
                            <div className="col-md-4">
                                <p>{ description }{description}</p>
                            </div>
                        </div>
                        <ReviewsTab listing={ listing } />
                        <div className="tab-pane quickview-details">Details...</div>
                        <div className="tab-pane quickview-resources">Resources...</div>
                    </div>
                </div>
            </Modal>
        );
        /* jshint ignore:end */
    },

    onShown: function () {
        this.setState({
            shown: true
        });
    }
});

module.exports = Quickview;