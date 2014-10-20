'use strict';

require('jquery');
require('magnific-popup');

var React = require('react');
var Carousel = require('../carousel');

var OverviewTab = React.createClass({

    propTypes: {
        shown: React.PropTypes.bool,
        listing: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            shown: false
        };
    },

    render: function () {
        var description = this.props.listing.description() || 'No description provided!';
        var descriptionClasses = React.addons.classSet({
            'text-muted': !this.props.listing.description()
        });

        /* jshint ignore:start */
        return (
            <div className="tab-pane active row quickview-overview">
                { this.renderScreenshots() }
                <div className="col-md-4">
                    <p className= { descriptionClasses }>{ description }</p>
                </div>
            </div>
        );
        /* jshint ignore:end */
    },

    renderScreenshots: function () {
        var me = this;
        var shown = this.props.shown;
        var screenshots = this.props.listing.screenshots();

        /* jshint ignore:start */
        if (!screenshots.length) {
            return (<p className="text-muted col-md-8">No screenshots provided!</p>);
        }

        var smallImageUrls = screenshots.map(function (screenshot, i) {
            return <img src={screenshot.smallImageUrl} onClick={ me.showLargeScreenshots.bind(me, i) }/>;
        });

        return (
            <Carousel autoInit={ shown } className="col-md-8">
                { smallImageUrls }
            </Carousel>
        );
        /* jshint ignore:end */
    },

    showLargeScreenshots: function (index) {
        var largeScreenshots = this.props.listing.screenshots().map(function (screenshot) {
            return { src: screenshot.largeImageUrl || screenshot.smallImageUrl };
        });

        $.magnificPopup.open({
            type: 'image',
            gallery: {
                enabled: true
            },
            items: largeScreenshots
        }, index);
    }

});

module.exports = OverviewTab;
