'use strict';

var React = require('react');
var Reflux = require('reflux');

var _ = require('../utils/_');

var LibraryStore = require('../stores/LibraryStore');
var { addToLibrary, removeFromLibrary } = require('../actions/LibraryActions');

var BookmarkButton = React.createClass({
    mixins: [Reflux.connect(LibraryStore, 'library')],

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
        var bookmarkIcon =  React.addons.classSet({
                'icon-ribbon-grayDark': !this.inLibrary(),
                'icon-ribbon-filled-yellow': this.inLibrary()
            });
        return (
            <button type="button" className={bookmarkBtnStyles} onClick={this.toggleInLibrary}>
                <i className={bookmarkIcon} />
            </button>
        );
    }
    });

module.exports = BookmarkButton;
