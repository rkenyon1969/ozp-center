/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Carousel = require('../carousel');
var FeaturedListingTile = require('./FeaturedListingTile');

module.exports = React.createClass({

    propTypes: {
        options: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            options: {
                auto: false,
                scroll: {
                    easing: 'quadratic',
                    items: 1,
                    duration: 1000
                },
                width: '100%',
                items: {
                    visible: 3,
                    start: -1
                }
            }
        };
    },

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
                <Carousel ref="carousel" className="featured-listings-carousel" options={ this.props.options }>
                    { children }
                </Carousel>
            </section>
        );
        /*jshint ignore:end */
    }

});