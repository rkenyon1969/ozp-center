'use strict';

var React = require('react');
var IconRating = require('../../shared/IconRating');
var _ = require('../../../utils/_');

var UserReviews = React.createClass({

    propTypes: {
        onEdit: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired
    },

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
        var { onEdit, user } = this.props;
        /* jshint ignore:start */
        return this.props.reviews.map(function (review, i) {
            return (
                <li className="Review">
                    <IconRating currentRating = { review.rate } viewOnly={true} />
                    <span className="Review__author">{ review.author.displayName }</span>
                    {
                        /* editable by an admin or a review owner */
                        (user.isAdmin || review.author.username === user.username) &&
                            <i className="fa fa-edit pull-right" onClick={ _.partial(onEdit, review) }></i>
                    }
                    <p className="Review__text">{ review.text }</p>
                </li>
            );
        });
        /* jshint ignore:end */
    }
});

module.exports = UserReviews;
