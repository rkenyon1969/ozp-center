'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');

var IconRating = require('../../shared/IconRating.jsx');
var UserReviews = require('./UserReviews.jsx');
var SubmitReview = require('./SubmitReview.jsx');
var EditReview = require('./EditReview.jsx');

var CurrentListingStore = require('../../../stores/CurrentListingStore');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var ListingActions = require('../../../actions/ListingActions');
var SelfStore = require('ozp-react-commons/stores/SelfStore');

var RatingProgressBar = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    getDefaultProps: function () {
        return {
            count: 0,
            value: 0
        };
    },
    render: function () {
        var { count, value, star } = this.props;
        var style = {
            width: `${value}%`
        };
        return (
            <div className="star-rating">
                <span>{ star } stars</span>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" style={style} ></div>
                </div>
                <span className="count">( { count } )</span>
            </div>
        );
    }
});

var ReviewsTab = React.createClass({

    mixins: [
        Reflux.listenTo(ListingActions.fetchReviewsCompleted, 'onFetchItemCommentsCompleted'),
        SystemStateMixin
    ],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return this.getState();
    },

    getState: function () {
        var currentUser = SelfStore.getDefaultData().currentUser;
        var reviews = CurrentListingStore.getReviews();
        if (!reviews) {
            return {
                reviews: reviews,
                reviewBeingEdited: null,
                currentUserReview: null
            };
        }
        var updates = {
            reviews: reviews,
            currentUserReview: _.find(reviews, { author:
                                                 { user:
                                                   { username: currentUser.user.username }}})
        };

        // update reviewBeingEdited prop if editing
        if (this.state && this.state.reviewBeingEdited) {
            updates.reviewBeingEdited = _.find(reviews, { id: this.state.reviewBeingEdited.id });
        }
        return updates;
    },

    componentWillReceiveProps: function (newProps) {
        if (this.props.listing.id !== newProps.listing.id) {
            ListingActions.fetchReviews(newProps.listing);
        }
    },

    componentWillMount: function () {
        // only fetch reviews if not found in store
        if (this.props.listing.id && !this.state.reviews) {
            ListingActions.fetchReviews(this.props.listing);
        }
    },

    render: function () {
        var { listing } = this.props;
        var { reviews, currentUserReview, reviewBeingEdited, currentUser } = this.state;

        return (
            <div className="tab-pane active quickview-reviews row">
                <section className="col-xs-3 col-left">
                    { this.renderReviewFilters() }
                </section>
                <section className="col-xs-5">
                    <UserReviews
                        listing={ listing }
                        user={ currentUser }
                        reviews={ reviews }
                        onEdit={ this.onEdit } />
                </section>
                <section className="col-xs-4 col-right">
                    {
                        !currentUserReview && !reviewBeingEdited &&
                            <SubmitReview listing={ listing } />
                    }
                    {
                        reviewBeingEdited &&
                            <EditReview
                                user={ currentUser }
                                listing={ listing }
                                review={ reviewBeingEdited }
                                onCancel={ this.onEditCancel }
                                onSave={ this.onEditCancel } />
                    }
                </section>
            </div>
        );
    },

    onEdit: function (review) {
        this.setState({ reviewBeingEdited: review });
    },

    onEditCancel: function () {
        this.setState({ reviewBeingEdited: null });
    },

    onFetchItemCommentsCompleted: function () {
        this.setState(this.getState());
    },

    renderReviewFilters: function () {
        var listing = this.props.listing;
        var total = listing.totalVotes;

        var starComponents = [5, 4, 3, 2, 1].map(function (star) {
            var count = listing[`totalRate${star}`];
            var width = total === 0 ? 0 : Math.round(count * 100 / total).toFixed(2);

            return <RatingProgressBar count={count} value={width} star={star} />;
        });

        return (
            <div>
                <h5>Average Rating</h5>
                <p><IconRating currentRating = { listing.avgRate || 0 } viewOnly /> ( { listing.totalVotes || 0 } Ratings )</p>
                <div className="review-filters">
                    { starComponents }
                </div>
            </div>
        );
    }

});

module.exports = ReviewsTab;
