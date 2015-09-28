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
        var that = this;

        e.preventDefault();
        e.stopPropagation();

        if (this.inLibrary()) {
            var libId = _.find(this.state.library, function(x) {
                return x.listing.id === that.props.listing.id;
            }).id;

            removeFromLibrary(this.props.listing, libId);
        }
        else {
            addToLibrary(this.props.listing);
        }
    },

    inLibrary: function() {
        return !!_.find(this.state.library, e => e.listing.id === this.props.listing.id);
    },

    componentDidMount: function(){
      $(this.refs.tooltipped.getDOMNode()).tooltip({
        delay: 400
      });
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
          <button ref="tooltipped" data-toggle="tooltip" data-placement="top" title="Bookmark" type="button" className={bookmarkBtnStyles} onClick={this.toggleInLibrary}>
              <i className={bookmarkIcon} />
          </button>
        );
    }
    });

module.exports = BookmarkButton;
