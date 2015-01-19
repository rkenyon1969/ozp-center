'use strict';

var React = require('react');
var IconRating = require('../../shared/IconRating');

var UserReviews = React.createClass({

    getDefaultProps: function () {
        return { reviews: [] };
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <ul className="list-unstyled list-reviews">
                { this.renderReviews() }
            </ul>
            /* jshint ignore:end */
        );
    },

    renderReviews: function () {
        var me = this;
        /* jshint ignore:start */
        return this.props.reviews.map(function (review, i) {
            return (
                <li className="Review">
                    <IconRating key= { review.rate } currentRating = { review.rate } viewOnly={true} />
                    <span className="Review__author">{ review.author.displayName }</span>
                    <p className="Review__text">{ review.text }</p>
                </li>
            );
        });
        /* jshint ignore:end */
    }
});

module.exports = UserReviews;
