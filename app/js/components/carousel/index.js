/** @jsx React.DOM */
'use strict';

var React = require('react');

require('carouFredSel');


var Carousel = React.createClass({

    propTypes: {
        children: React.PropTypes.array
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <div className="carousel-wrapper">
                <div className="carousel">
                    <ul ref="list" className="list-unstyled">
                        { this.props.children }
                    </ul>
                    <div className="clearfix"></div>
                    <button className="prev btn" href="#" ref="prev"><i className="fa fa-angle-left"></i></button>
                    <button className="next btn" href="#" ref="next"><i className="fa fa-angle-right"></i></button>
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    componentDidMount: function () {
        this._$carousel = $(this.refs.list.getDOMNode()).carouFredSel({
            prev: $(this.refs.prev.getDOMNode()),
            next: $(this.refs.next.getDOMNode()),
            auto: false
        });
    },

    componentWillUnmount: function(nextProps, nextState) {
        this._$carousel.trigger('destroy');
    }

});

module.exports = Carousel;