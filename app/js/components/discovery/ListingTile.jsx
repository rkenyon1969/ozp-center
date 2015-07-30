'use strict';

var React = require('react');
var { Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');
var IconRating = require('../shared/IconRating.jsx');
var CenterLaunchLink = require('../CenterLaunchLink.jsx');
var BookmarkButton = require('../BookmarkButton.jsx');

var { API_URL } = require('ozp-react-commons/OzoneConfig');
var IMAGE_URL = API_URL + '/api/image/';

var ListingTile = React.createClass({

    mixins: [Navigation, CurrentPath, ActiveState],

    statics: {
        fromArray: function (array) {
            return array.map((listing) => <ListingTile listing={listing} key={listing.id}/>);
        },
        renderLimitedTiles: function(display, mostPopular) {
            var ammount = 0;
            return(
                mostPopular.filter(function(tile){
                    if(ammount < display){ ammount++; return tile; }
                }).map((tile) => <ListingTile listing={tile} key={tile.id}/>)
            );
        }
    },

    render: function () {
        var listing = this.props.listing;

        var name = listing.title;
        var description = listing.descriptionShort && listing.descriptionShort.substr(0, 140);
        var imageLargeUrl;
        var avgRate = listing.avgRate;
        var agencyShort = listing.agencyShort;
        var href = this.makeHref(this.getActiveRoutePath(), null, {
            listing: listing.id,
            action: 'view',
            tab: 'overview'
        });

        // Some endpoints have the url; others have the id
        if (listing.banner_icon.url) {
            imageLargeUrl = listing.banner_icon.url;
        } else {
            imageLargeUrl = IMAGE_URL + listing.banner_icon.id;
        }

        return this.transferPropsTo(
            <li className="listing SearchListingTile" key={listing.id} >
                <a className="listing-link"  href={ href }>
                    {/* Empty link - css will make it cover entire <li>*/}
                </a>
                <img src={ imageLargeUrl } />
                <section className="slide-up">
                    <p className="title">{ name }</p>
                    <IconRating
                        className="icon-rating"
                        viewOnly
                        currentRating = { avgRate }
                        toggledClassName="icon-star-filled-yellow"
                        untoggledClassName="icon-star-filled-grayLighter"
                        halfClassName="icon-star-half-filled-yellow" />
                    {
                        agencyShort &&
                            <span className="company">{ agencyShort }</span>
                    }
                    <p className="description">{ description }</p>
                    { this.renderActions() }
                </section>
            </li>
        );
    },

    renderActions: function () {
        return (
            <div className="btn-group actions">
                <CenterLaunchLink className="btn-default" listing={this.props.listing} />
                <BookmarkButton listing={this.props.listing} />
            </div>
        );
    }
});

module.exports = ListingTile;
