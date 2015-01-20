'use strict';

var React = require('react');
var Reflux = require('reflux');
var SystemHighMessage = require('../../shared/SystemHighMessage');
var _ = require('../../../utils/_');
var IconRating = require('../../shared/IconRating');

var ListingActions = require('../../../actions/ListingActions');

var ReviewListing = React.createClass({

    mixins: [
        Reflux.listenTo(ListingActions.saveReviewCompleted, 'onSaveReviewCompleted')
    ],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        review: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired
    },

    getDefaultProps: function () {
        return {
            review: {
                id: null,
                rate: 0,
                text: ''
            }
        };
    },

    getInitialState: function () {
        return {
            review: _.pick(this.props.review, 'id', 'rate', 'text', 'author')
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.review) {
            this.setState({
                review: _.pick(nextProps.review, 'id', 'rate', 'text', 'author')
            });
        }
    },

    onRatingChange: function (val) {
        this.state.review.rate = val;
        this.forceUpdate();
    },

    onTextChange: function () {
        this.state.review.text = this.refs.text.getDOMNode().value.substring(0, 4000);
        this.forceUpdate();
    },

    onSave: function () {
        ListingActions.saveReview(this.props.listing.id, this.state.review);
    },

    onSaveReviewCompleted: function () {
        this.props.onSave();
    },

    render: function () {
        var { user } = this.props;
        var { rate, text } = this.state.review;
        /* jshint ignore:start */
        return (
            <div className="EditReview">
                <h5>Edit Review</h5>
                <SystemHighMessage />
                <div className="EditReview__Rating">
                    <div>Star Rating</div>
                    <IconRating currentRating={ rate } onChange={ this.onRatingChange } />
                </div>
                <div>
                    <div>Description</div>
                    <textarea ref="text" value={ text } onChange={ this.onTextChange }></textarea>
                </div>
                {
                    user.isAdmin &&
                        <button className="btn btn-default btn-small" onClick={ this.onReset }>Delete</button>
                }
                <div className="pull-right">
                    <button className="btn btn-default btn-small" onClick={ this.props.onCancel }>Cancel</button>
                    <button className="btn btn-success btn-small" onClick={ this.onSave }>Submit</button>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ReviewListing;
