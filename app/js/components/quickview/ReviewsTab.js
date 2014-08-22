/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var IconRating = require('../shared/IconRating');

var UserReview = React.createClass({

    getInitialState: function() {
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

    render: function() {
        var cx = React.addons.classSet;
        var reviewTextClasses = cx({
            review: true,
            hidden: this.state.editing
        });

        return (
            <li className="user-review">
                <IconRating currentRating = { 2 } viewOnly />
                <label className="author">Test Admin 3</label>
                <span className="date">3 days ago</span>
                <p className={ reviewTextClasses } onClick={ this.edit } >Some review....</p>
                {
                    this.state.editing && (
                        <section className="user-review-editing clearfix">
                            <textarea rows="3" ref="review">review.....</textarea>
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
    }
});

var ReviewsTab = React.createClass({

    getInitialState: function () {
        return {
            currentUserRating: 0
        };
    },

    onRatingChange: function (val) {
        this.setState({ currentUserRating: val })
    },

    onSubmit: function () {
        alert('save review...');
    },

    render: function() {
        var currentUserRating = this.state.currentUserRating;

        /*jshint ignore:start */
        return (
            <div className="tab-pane quickview-reviews row">
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
        /*jshint ignore:end */
    },

    renderReviewFilters: function () {
        /*jshint ignore:start */
        return (
            <div className="review-filters">
                <div className="star-rating">
                    <a href="javascript:;">5 stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="count">(0)</span>
                </div>
                <div className="star-rating">
                    <a href="javascript:;">4 stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="count">(0)</span>
                </div>
                <div className="star-rating">
                    <a href="javascript:;">3 stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="count">(0)</span>
                </div>
                <div className="star-rating">
                    <a href="javascript:;">2 stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="count">(0)</span>
                </div>
                <div className="star-rating">
                    <a href="javascript:;">1 stars</a>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="count">(0)</span>
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    renderUserReviews: function () {
        /*jshint ignore:start */
        return (
            <ul className="list-unstyled list-reviews">
                <UserReview />
                <UserReview />
                <UserReview />
            </ul>
        );
        /*jshint ignore:end */
    }

});

module.exports = ReviewsTab;