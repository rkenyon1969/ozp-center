'use strict';

var React = require('react');
var { Link, Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');
var _ = require('../../utils/_');
var IconRating = require('../shared/IconRating');
var ProfileStore = require('../../stores/ProfileStore');
var { launch, addToLibrary, removeFromLibrary } = require('../../actions/ListingActions');

var ListingTile = React.createClass({

    mixins: [ Navigation, CurrentPath, ActiveState ],

    render: function () {
        var listing = this.props.listing;

        var name = listing.title;
        var description = listing.descriptionShort && listing.descriptionShort.substr(0, 140);
        var launchUrl = listing.launchUrl;
        var imageLargeUrl = listing.imageLargeUrl;
        var totalVotes = listing.totalVotes;
        var avgRate = listing.avgRate;
        var company = listing.company;
        var href = this.makeHref(this.getActiveRoutePath(), null, {
            listing: listing.id,
            action: 'view',
            tab: 'overview'
        });

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile">
                <a href={ href }>
                    <img src={ imageLargeUrl } />
                    <section className="slide-up">
                        <p className="title">{ name }</p>
                        <IconRating
                            className="icon-rating"
                            viewOnly
                            currentRating = { avgRate }
                            toggledClassName="fa fa-star"
                            untoggledClassName="fa fa-star-o"
                            halfClassName="fa fa-star-half-o" />
                        {
                            company &&
                                <span className="company">{ company }</span>
                        }
                        <p className="description">{ description }</p>
                        { this.renderActions() }
                    </section>
                </a>
            </li>
        );
        /*jshint ignore:end */
    },

    renderActions: function () {
        var bookmarkBtnStyles = React.addons.classSet({
            'btn btn-default': true,
            'active': ProfileStore.isListingInLibrary(this.props.listing.uuid)
        });

        /* jshint ignore:start */
        return (
            <div className="btn-group actions">
                {/* can't nest anchor tags, using button here with onClick listener */}
                <button type="button" className="btn btn-default" onClick={ this.launch }><i className="fa fa-external-link"></i></button>
                <button type="button" className={ bookmarkBtnStyles } onClick={ this.addToLibrary }><i className="fa fa-bookmark"></i></button>
            </div>
        );
        /* jshint ignore:end */
    },

    launch: function () {
        launch(this.props.listing);
    },

    addToLibrary: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (ProfileStore.isListingInLibrary(this.props.listing.uuid)) {
            removeFromLibrary(this.props.listing);
        }
        else {
            addToLibrary(this.props.listing);
        }
    }

});

module.exports = ListingTile;
