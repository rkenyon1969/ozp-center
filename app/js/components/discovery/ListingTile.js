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
        },
        renderLimitedTiles: function(display, max, mostPopular) {
            var ammount = 0;
            return(
                mostPopular.filter(function(tile){
                    if(ammount < display){
                        ammount++;
                        return tile;
                    }
                }).map(function(tile){
                    var tileArray = [];
                    tileArray.push(tile);

                    return ListingTile.fromArray(tileArray);
                })
            );
        },
    },

    render: function () {
        var listing = this.props.listing;

        var name = listing.title;
        var description = listing.descriptionShort && listing.descriptionShort.substr(0, 140);
        var launchUrl = listing.launchUrl;
        var imageLargeUrl = listing.imageLargeUrl;
        var totalVotes = listing.totalVotes;
        var avgRate = listing.avgRate;
        var agencyShort = listing.agencyShort;
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
                            agencyShort &&
                                <span className="company">{ agencyShort }</span>
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
                <button type="button" className="btn btn-default" onClick={ this.launch }><i className="icon-open"></i></button>
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
