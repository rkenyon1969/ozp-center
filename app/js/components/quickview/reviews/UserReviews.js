'use strict';

var React = require('react');
var IconRating = require('../../shared/IconRating');
var _ = require('../../../utils/_');
var TimeAgo = require('../../shared/TimeAgo');

var UserReview = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        review: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        onEdit: React.PropTypes.func.isRequired
    },

    isEditAllowed: function () {
        var { review, user, listing } = this.props;
        return (
            user.isAdmin ||
            review.author.username === user.username ||
            user.isOrgSteward(listing.agency)
        );
    },

    render: function () {
        var { review, onEdit } = this.props;
        var time = review.editedDate || review.createdDate;
        /* jshint ignore:start */
        return (
            <li className="Review">
                <IconRating currentRating = { review.rate } viewOnly={true} />
                <span className="Review__author">{ review.author.displayName }</span>
                <TimeAgo className="Review__time" time={ time } />
                {
                    this.isEditAllowed() &&
                        <i className="fa fa-edit pull-right" onClick={ _.partial(onEdit, review) }></i>
                }
                <p className="Review__text">{ review.text }</p>
            </li>
        );
        /* jshint ignore:end */
    }

});

var UserReviews = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        reviews: React.PropTypes.array,
        onEdit: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return { reviews: [] };
    },

    render: function () {
        /* jshint ignore:start */
        return (
            (this.props.reviews && this.props.reviews.length > 0) ?
                <ul className="list-unstyled list-reviews">
                    { this.renderReviews() }
                </ul> :
                <div>
                    <h4>There are no user reviews yet.</h4>
                    <p>Please add a review to share your thoughts and experiences with others.</p>
                </div>
        );
        /* jshint ignore:end */
    },

    renderReviews: function () {
        var { onEdit, user, listing } = this.props;

        /* jshint ignore:start */
        return this.props.reviews.map(function (review, i) {
            var time = review.editedDate || review.createdDate;
            return <UserReview
                        key={ review.id }
                        user={ user }
                        listing={ listing }
                        review={ review }
                        onEdit={ onEdit } />;
        });
        /* jshint ignore:end */
    }
});

module.exports = UserReviews;
module.exports.UserReview = UserReview;
