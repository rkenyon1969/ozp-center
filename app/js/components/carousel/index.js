/** @jsx React.DOM */
var React = require('react');

require('carouFredSel');


var Carousel = React.createClass({

    propTypes: {
        children: React.PropTypes.array
    },

    render: function () {
        return (
            <div className="carousel-wrapper">
                <div className="carousel">
                    <ul ref="list" className="list-unstyled">
                        { this.props.children }
                    </ul>
                    <div className="clearfix"></div>
                    <a className="prev" href="#" ref="prev">&lt;</a>
                    <a className="next" href="#" ref="next">&gt;</a>
                </div>
            </div>
        );
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