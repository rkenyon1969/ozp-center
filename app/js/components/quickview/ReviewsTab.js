'use strict';

var React = require('react');
var IconRating = require('../shared/IconRating');
var UserReviews = require('./UserReviews');
var ListingActions = require('../../actions/ListingActions');
var fetchItemComments = ListingActions.fetchItemComments;


var ReviewsTab = React.createClass({

    getInitialState: function () {
        return {
            currentUserRating: 0
        };
    },

    onRatingChange: function (val) {
        this.setState({ currentUserRating: val });
    },

    onSubmit: function () {
        console.log('save review...');
    },

    onCancel: function() {
        console.log('cancel review...');
    },

    componentWillReceiveProps: function (newProps) {
        if (this.props.listing.id !== newProps.listing.id) {
            fetchItemComments(newProps.listing.id);
        }
    },

    componentWillMount: function () {
        if (this.props.listing.id) {
            fetchItemComments(this.props.listing.id);
        }
    },

    render: function () {
        var currentUserRating = this.state.currentUserRating;

        /* jshint ignore:start */
        return (
            <div className="tab-pane active quickview-reviews row">
                <section className="col-md-3 col-left">
                    { this.renderReviewFilters() }
                </section>
                <section className="col-md-6">
                    <UserReviews />
                </section>
                <section className="col-md-3 col-right">
                    <h4>Review this Listing</h4>
                    <IconRating currentRating = { currentUserRating } onChange={ this.onRatingChange } />
                    <p className="text-danger">Warning: Data entered must NOT be above System High!</p>
                    <textarea placeholder="Warning: Data entered must NOT be above System High!"></textarea>
                    <button className="btn btn-success btn-small pull-right" onClick={ this.onSubmit }>Submit Review</button>
                    <button className="btn btn-default btn-small pull-right" onClick={ this.onCancel }>Reset</button>
                </section>
            </div>
        );
        /* jshint ignore:end */
    },

    renderReviewFilters: function () {
        var listing = this.props.listing;
        var total = listing.totalRate;
        var stars = [5, 4, 3, 2, 1];

        /* jshint ignore:start */
        var starComponents = stars.map(function (star) {
            var count = listing['totalRate' + star];
            var width = total === 0 ? 0 : Math.round(count * 100 / total).toFixed(2);
            var style = {
                width: width + '%'
            };

            return (
                <div className="star-rating">
                    <a href="javascript:;">{ star } stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={style} ></div>
                    </div>
                    <span className="count">({ count || 0 })</span>
                </div>
            );
        });

        return (
            <div>
                <h4>Average Rating</h4>
                <IconRating currentRating = { listing.avgRate || 0 } viewOnly />
                <p> From { listing.totalVotes || 0 } ratings </p>
                <div className="review-filters">
                    { starComponents }
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ReviewsTab;
