'use strict';

var React = require('react');
var Reflux = require('reflux');
var IconRating = require('../shared/IconRating');
var CurrentListingStore = require('../../stores/CurrentListingStore');

var UserReviews = React.createClass({

    mixins: [Reflux.listenTo(CurrentListingStore, 'itemCommentsReceived')],

    itemCommentsReceived: function() {
        var reviews = CurrentListingStore.getItemComments();
        this.setState({itemComments: reviews});
    },

    getInitialState: function () {
        return {
            editing: false,
            itemComments: []
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

        return (
            /* jshint ignore:start */
            <ul className="list-unstyled list-reviews">
                { this.renderItemComments() }
            </ul>
            /* jshint ignore:end */
        );
    },

    renderItemComments: function () {
        var me = this;

        return this.state.itemComments.map(function (itemComment, i) {
            /* jshint ignore:start */
            return (
                <li className="user-review">
                    <IconRating currentRating = { itemComment.rate } viewOnly /> <b>{ itemComment._embedded.author.displayName } </b>
                    <p>{ itemComment.text }</p>
                </li>
            );
            /* jshint ignore:end */
        });
    }
});

module.exports = UserReviews;
