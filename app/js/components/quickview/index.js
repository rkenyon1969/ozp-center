/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Modal = require('../shared/Modal');
var IconRating = require('react-icon-rating');
var Carousel = require('../carousel');
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

    /*jshint ignore:start */
    render: function () {
        var shown = this.state.shown;
        var listing = this.props.listing;
        var title = listing.title();
        var description = listing.description() || 'No description provided!';
        var avgRate = listing.avgRate();

        return (
            <div>
                {
                    this.transferPropsTo(
                        <Modal ref="modal" className="quickview" onShown={ this.onShown } >
                            <div className="quickview-header">
                                <div className="quickview-header-info">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <img className="listing-icon" src="http://i.imgur.com/hvUs9qF.png" data-fallback="/store/images/types/3" />
                                    <h3 className="listing-title" title={ title }>{ title }</h3>
                                    <IconRating
                                        className="icon-rating"
                                        viewOnly
                                        currentRating = { avgRate }
                                        toggledClassName="fa fa-star"
                                        untoggledClassName="fa fa-star-o"
                                        halfClassName="fa fa-star-half-o" />
                                </div>
                                <div className="quickview-header-actions">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary">Launch</button>
                                        <button type="button" className="btn btn-default"><i className="fa fa-bookmark"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="tabs-container">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="active"><a href=".quickview-overview" role="tab" data-toggle="tab">Overview</a></li>
                                    <li><a href=".quickview-reviews" role="tab" data-toggle="tab">Reviews</a></li>
                                    <li><a href=".quickview-details" role="tab" data-toggle="tab">Details</a></li>
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
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </div>
        );
    },
    /*jshint ignore:end */

    onShown: function () {
        this.setState({
            shown: true
        });
    }
});

module.exports = Quickview;