/** @jsx React.DOM */
'use strict';

var React = require('react');

require('carouFredSel');


var Carousel = React.createClass({

    // http://docs.dev7studios.com/jquery-plugins/caroufredsel-advanced
    propTypes: {
        children: React.PropTypes.array,

        // auto init jquery plugin on mount
        autoInit: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            autoInit: true
        };
    },

    render: function () {
        /*jshint ignore:start */
        return this.transferPropsTo(
            <div className="carousel-wrapper">
                <div className="carousel">
                    <ul ref="list" className="list-unstyled">
                        { this.props.children }
                    </ul>
                    <div className="clearfix"></div>
                    <button className="prev btn hidden" href="#" ref="prev"><i className="fa fa-angle-left"></i></button>
                    <button className="next btn hidden" href="#" ref="next"><i className="fa fa-angle-right"></i></button>
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    componentDidMount: function () {
        this.renderCarousel();
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps.autoInit === false && this.props.autoInit === true) {
            this.renderCarousel();
        }
    },

    renderCarousel: function () {
        if (this.props.autoInit) {
            this._$carousel = $(this.refs.list.getDOMNode()).carouFredSel({
                prev: $(this.refs.prev.getDOMNode()),
                next: $(this.refs.next.getDOMNode()),
                auto: false,
                scroll: {
                    easing: 'quadratic'
                }
            }, {
                wrapper: 'parent'
            });
        }
    },

    componentWillUnmount: function(nextProps, nextState) {
        this._$carousel.trigger('destroy');
    }

});

module.exports = Carousel;