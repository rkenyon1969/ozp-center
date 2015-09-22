'use strict';

require('jquery');
require('magnific-popup');

var React = require('react');
var Carousel = require('../carousel/index.jsx');

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
        var description = 'No description provided!';
        if(this.props.listing.description){
          description = this.props.listing.description.split(/\n/g).map((p)=>{
            return(<span>{p}<br/></span>);
          });
        }
        var descriptionClasses = React.addons.classSet({
            'text-muted': !this.props.listing.description
        });

        return (
            <div className="tab-pane active row quickview-overview">
                { this.renderScreenshots() }
                <div className="col-xs-12 col-md-3 pull-right">
                    <p className= { descriptionClasses }>{ description }</p>
                </div>
            </div>
        );
    },

    renderScreenshots: function () {
        var me = this;
        var shown = this.props.shown;
        var screenshots = this.props.listing.screenshots;

        if (!screenshots.length) {
            return (<p className="text-muted col-xs-12 col-md-9">No screenshots provided!</p>);
        }

        var smallImageUrls = screenshots.map(function (screenshot, i) {
            return <img alt="show large screenshot once click" src={screenshot.smallImageUrl} onClick={ me.showLargeScreenshots.bind(me, i) }/>;
        });

        return (
            <div className="col-xs-12 col-md-9">
                <Carousel autoInit={ shown }>
                    { smallImageUrls }
                </Carousel>
            </div>
        );
    },

    showLargeScreenshots: function (index) {
        var largeScreenshots = this.props.listing.screenshots.map(function (screenshot) {
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
