/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Carousel = require('../carousel');
var FeaturedListingTile = require('./FeaturedListingTile');

module.exports = React.createClass({

    render: function () {
        var me = this;

        /*jshint ignore:start */
        var children = this.props.listings.map(function (listing) {
            return <FeaturedListingTile
                        key = { listing.id() }
                        listing={ listing }
                        onClick={ me.props.handleClick.bind(null, listing) }
                    />
        });
        return (
            <section>
                <h4>Featured</h4>
                <Carousel ref="carousel" className="featured-listings-carousel" autoInit={ false }>
                    { children }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    },

    componentDidMount: function () {
        this._$carousel = $(this.refs.carousel.refs.list.getDOMNode()).carouFredSel({
            prev: $(this.refs.carousel.refs.prev.getDOMNode()),
            next: $(this.refs.carousel.refs.next.getDOMNode()),
            auto: false,
            scroll: {
                easing: 'quadratic',
                items: 1,
                duration: 800
            },
            width: '100%',
            items: {
                visible: 3,
                start: -1
            }
        }, {
            wrapper: 'parent'
        });
    },

});