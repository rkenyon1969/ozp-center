'use strict';

var React = require('react');
var _IconRating = require('react-icon-rating');

var IconRating = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    displayName: 'IconRatingExtended',

    getDefaultProps: function () {
        return {
            className: 'icon-rating',
            toggledClassName: 'fa fa-star',
            untoggledClassName: 'fa fa-star-o',
            halfClassName: 'fa fa-star-half-o'
        };
    },

    getInitialState: function () {
        return {
            rating: this.roundRating(this.props.currentRating)
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.currentRating !== nextProps.currentRating) {
            this.setState({
                rating: this.roundRating(nextProps.currentRating)
            });
        }
    },

    roundRating: function (currentRating) {
        var floor = Math.floor(currentRating),
            difference = currentRating - floor,
            rating = floor;

        if (difference >= 0.25 && difference < 0.75) {
            rating += 0.5;
        }
        else if (difference >= 0.75) {
            rating += 1;
        }

        return rating;
    },

    render: function () {
        // key is explicitly used here to destroy IconRating component for Reset
        return this.transferPropsTo(
            <_IconRating
                key={ this.props.currentRating }
                currentRating={ this.state.rating }
                className={ this.props.className }
                toggledClassName={ this.props.toggledClassName }
                untoggledClassName={ this.props.untoggledClassName }
                halfClassName={ this.props.halfClassName } />
        );
    }

});

module.exports = IconRating;
