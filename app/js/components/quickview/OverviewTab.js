/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Carousel = require('../carousel');

var OverviewTab = React.createClass({

    propTypes: {
        shown: React.PropTypes.bool,
        listing: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            shown: false
        };
    },

    render: function() {
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
        var shown = this.props.shown;
        var screenshots = this.props.listing.screenshots();

        /* jshint ignore:start */
        if (!screenshots.length) {
            return (<p className="text-muted col-md-8">No screenshots provided!</p>);
        }

        var smallImageUrls = screenshots.map(function (screenshot) {
            return <img src={screenshot.smallImageUrl} />;
        });

        return (
            <Carousel autoInit={ shown } className="col-md-8">
                { smallImageUrls }
            </Carousel>
        );
        /* jshint ignore:end */
    }

});

module.exports = OverviewTab;