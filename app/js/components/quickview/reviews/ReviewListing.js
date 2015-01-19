'use strict';

var React = require('react');
var SystemHighMessage = require('../../shared/SystemHighMessage');
var _ = require('../../../utils/_');
var IconRating = require('../../shared/IconRating');

var ListingActions = require('../../../actions/ListingActions');

var ReviewListing = React.createClass({

    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        review: React.PropTypes.object.isRequired
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
            review: {
                id: null,
                rate: 0,
                text: ''
            }
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.review) {
            this.setState({
                review: _.pick(nextProps.review, 'id', 'rate', 'text')
            });
        }
    },

    onRatingChange: function (val) {
        this.state.review.rate = val;
        this.forceUpdate();
    },

    onTextChange: function (val) {
        this.state.review.text = this.refs.text.getDOMNode().value.substring(0, 4000);
        this.forceUpdate();
    },

    onSave: function () {
        ListingActions.saveReview(this.props.listing.id, this.state.review);
    },

    onReset: function () {
        this.state.review.rate = this.props.review.rate;
        this.state.review.text = this.props.review.text;
        this.forceUpdate();
    },

    render: function () {
        var { rate, text } = this.state.review;
        /* jshint ignore:start */
        return (
            <div className="CurrentUserReview">
                <h5>Review this Listing</h5>
                <SystemHighMessage />
                <div className="CurrentUserReview__Rating">
                    <div>Star Rating</div>
                    <IconRating key={ rate } currentRating={ rate } onChange={ this.onRatingChange } />
                </div>
                <div>
                    <div>Description</div>
                    <textarea ref="text" value={ text } onChange={ this.onTextChange }></textarea>
                </div>
                <div className="pull-right">
                    <button className="btn btn-default btn-small" onClick={ this.onReset }>Reset</button>
                    <button className="btn btn-success btn-small" onClick={ this.onSave }>Submit</button>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ReviewListing;
