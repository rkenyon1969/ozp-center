'use strict';

var React = require('react');
var SystemHighMessage = require('../../shared/SystemHighMessage.jsx');
var _ = require('../../../utils/_');
var IconRating = require('../../shared/IconRating.jsx');
var ListingActions = require('../../../actions/ListingActions');

var ReviewListing = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        text: React.PropTypes.string.isRequired,
        rate: React.PropTypes.number.isRequired
    },

    getDefaultProps: function () {
        return {
            rate: 0,
            text: ''
        };
    },

    getInitialState: function () {
        return _.clone(this.props, 'rate', 'text');
    },

    onRatingChange: function (val) {
        this.state.rate = val;
        this.forceUpdate();
    },

    onTextChange: function (val) {
        this.state.text = val.target.value.substring(0, 4000);
        this.forceUpdate();
    },

    onSave: function () {
        ListingActions.saveReview(this.props.listing, this.state);
    },

    onReset: function () {
        this.state.rate = this.props.rate;
        this.state.text = this.props.text;
        this.forceUpdate();
    },

    render: function () {
        var { rate, text } = this.state;
        return (
            <div className="SubmitReview">
                <h5>Review this Listing</h5>
                <div className="SubmitReview__Rating">
                    <h6>Star Rating</h6>
                    <IconRating currentRating={ rate } onChange={ this.onRatingChange } />
                </div>
                <div>
                    <h6>Description</h6>
                    <SystemHighMessage />
                    <textarea ref="text" value={ text } onChange={ this.onTextChange }></textarea>
                </div>
                <div className="pull-right">
                    <button className="btn btn-default btn-small" onClick={ this.onReset }>Reset</button>
                    <button className="btn btn-success btn-small" onClick={ this.onSave }>Submit</button>
                </div>
            </div>
        );
    }

});

module.exports = ReviewListing;
