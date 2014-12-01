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

    getDefaultProps: function () {
        return {
            autoInit: true
        };
    },

    render: function () {
        var { className, ...other } = this.props;
        var classes = [className, 'carousel-wrapper'].join(' ');

        /*jshint ignore:start */
        return (
            <div className={classes} {...other}>
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
            var options = Object.assign({
                prev: $(this.refs.prev.getDOMNode()),
                next: $(this.refs.next.getDOMNode()),
                auto: false,
                scroll: {
                    easing: 'quadratic'
                }
            }, this.props.options);

            this._$carousel = $(this.refs.list.getDOMNode()).carouFredSel(options, {
                wrapper: 'parent'
            });
        }
    },

    componentWillUnmount: function () {
        if (this._$carousel) {
            this._$carousel.trigger('destroy');
        }
    }

});

module.exports = Carousel;
