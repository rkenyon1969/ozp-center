'use strict';

var React = require('react');
var { Link, Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');
var _ = require('../../utils/_');
var IconRating = require('../shared/IconRating');
var launch = require('../../actions/ListingActions').launch;

var BookmarkButton = require('../BookmarkButton');

var ListingTile = React.createClass({

    mixins: [Navigation, CurrentPath, ActiveState],

    statics: {
        fromArray: function (array) {
            /* jshint ignore:start  */
            return array.map((listing) => <ListingTile listing={listing} key={listing.id}/>);
            /* jshint ignore:end  */
        }
    },

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
            <li className="listing SearchListingTile" key={listing.id} >
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
        /* jshint ignore:start */
        return (
            <div className="btn-group actions">
                {/* can't nest anchor tags, using button here with onClick listener */}
                <button type="button" className="btn btn-default" onClick={ this.launch }><i className="fa fa-external-link"></i></button>
                <BookmarkButton listing={this.props.listing} />
            </div>
        );
        /* jshint ignore:end */
    },

    launch: function () {
        launch(this.props.listing);
    }
});

module.exports = ListingTile;
