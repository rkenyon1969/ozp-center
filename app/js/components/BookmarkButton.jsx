'use strict';

var React = require('react');
var Reflux = require('reflux');

var _ = require('../utils/_');

var SelfStore = require('ozp-react-commons/stores/SelfStore');
var { addToLibrary, removeFromLibrary } = require('../actions/ListingActions');

var BookmarkButton = React.createClass({
    mixins: [Reflux.connect(SelfStore)],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {library: []};
    },

    toggleInLibrary: function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.inLibrary()) {
            removeFromLibrary(this.props.listing);
        }
        else {
            addToLibrary(this.props.listing);
        }
    },

    inLibrary: function() {
        return !!_.find(this.state.library, e => e.listing.id === this.props.listing.id);
    },

    render: function() {
        var bookmarkBtnStyles = React.addons.classSet({
                'btn btn-default btn-bookmark': true,
                'bookmarked': this.inLibrary()
            });
        return (
            <button type="button" className={bookmarkBtnStyles} onClick={this.toggleInLibrary}>
                <i className="fa fa-bookmark"/>
            </button>
        );
    }
});

module.exports = BookmarkButton;
