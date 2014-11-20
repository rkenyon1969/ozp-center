'use strict';

var React = require('react');
var IconRating = require('../shared/IconRating');

var reviews = {
    rows: [
        {
            date: '2014-08-25T15:57:31Z',
            displayName: 'Test Admin 1',
            id: 3,
            serviceItemRateStats: {
                avgRate: 4,
                totalRate1: 0,
                totalRate2: 0,
                totalRate3: 0,
                totalRate4: 1,
                totalRate5: 0,
                totalVotes: 1
            },
            text: 'I really like this listing. Super fast and responsive.',
            userId: 2,
            userRate: 5,
            username: 'AMLtestadmin'
        }
    ],
    success: true,
    totalCount: 1
};

var UserReview = React.createClass({

    propTypes: {
        review: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            displayName: React.PropTypes.string.isRequired,
            username: React.PropTypes.string.isRequired,
            date: React.PropTypes.string.isRequired,
            userRate: React.PropTypes.number.isRequired,
            text: React.PropTypes.string.isRequired,
        })
    },

    getInitialState: function () {
        return {
            editing: false
        };
    },

    edit: function () {
        // this.setState({ editing: true })
    },

    save: function () {
        // TODO
    },

    cancel: function () {
        // TODO
        this.setState({ editing: false });
    },

    remove: function () {
        // TODO
    },

    render: function () {
        var review = this.props.review;
        var cx = React.addons.classSet;
        var reviewTextClasses = cx({
            review: true,
            hidden: this.state.editing
        });

        /* jshint ignore:start */
        return (
            <li className="user-review">
                <IconRating currentRating = { review.userRate } viewOnly />
                <label className="author">{ review.displayName }</label>
                <span className="date">{ review.date }</span>
                <p className={ reviewTextClasses } onClick={ this.edit } >{ review.text }</p>
                {
                    this.state.editing && (
                        <section className="user-review-editing clearfix">
                            <textarea rows="3" ref="review">{ review.text }</textarea>
                            <div className="btn-group pull-right">
                                <button type="button" className="btn btn-default btn-sm" onClick={ this.save }><i className="fa fa-floppy-o"></i></button>
                                <button type="button" className="btn btn-default btn-sm" onClick={ this.cancel }><i className="fa fa-times"></i></button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={ this.remove }><i className="fa fa-trash-o"></i></button>
                            </div>
                        </section>
                    )
                }
            </li>
        );
        /* jshint ignore:end */
    }
});

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

    render: function () {
        var currentUserRating = this.state.currentUserRating;

        /* jshint ignore:start */
        return (
            <div className="tab-pane active quickview-reviews row">
                <section className="col-md-3 col-left">
                    { this.renderReviewFilters() }
                </section>
                <section className="col-md-6">
                    { this.renderUserReviews() }
                </section>
                <section className="col-md-3 col-right">
                    <p>Review this listing:</p>
                    <p className="text-danger">Warning: Data entered must NOT be above System High!</p>
                    <IconRating currentRating = { currentUserRating } onChange={ this.onRatingChange } />
                    <textarea placeholder="Warning: Data entered must NOT be above System High!"></textarea>
                    <button className="btn btn-block btn-primary" onClick={ this.onSubmit }>Submit Review</button>
                </section>
            </div>
        );
        /* jshint ignore:end */
    },

    renderReviewFilters: function () {
        var listing = this.props.listing;
        var total = reviews.rows.length;
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
                    <span className="count">({ count })</span>
                </div>
            );
        });

        return (
            <div className="review-filters">
                { starComponents }
            </div>
        );
        /* jshint ignore:end */
    },

    renderUserReviews: function () {
        /*jshint ignore:start */
        var reviewComponents = reviews.rows.map(function (review) {
            return <UserReview review={ review } />
        });

        return (
            <ul className="list-unstyled list-reviews">
                { reviewComponents }
            </ul>
        );
        /* jshint ignore:end */
    }

});

module.exports = ReviewsTab;
