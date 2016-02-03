'use strict';

var React = require('react');
var IconRating = require('../shared/IconRating.jsx');

var BookmarkButton = require('../BookmarkButton.jsx');
var CenterLaunchLink = require('../CenterLaunchLink.jsx');

var QuickviewHeader = React.createClass({

    propTypes: {
        listing: React.PropTypes.object,
        onCancel: React.PropTypes.func.isRequired
    },

    componentDidMount: function(){
      $(this.refs.hastooltips.getDOMNode()).find('.tooltiped').each(function(){
        $(this).tooltip({
          delay: 400
        });
      });
    },

    render: function () {
        var listing = this.props.listing;
        var title = listing.title;
        var avgRate = listing.avgRate;
        var image = listing.imageMediumUrl;
        var agencyShort = listing.agencyShort;
        var lockStyle = {
            position: 'absolute',
            left: '4px',
            top: '4px'
        };
        var labelStyle = {
            paddingLeft: '10px'
        };

        return (
            <div className="quickview-header">
                <div className="quickview-header-info">
                    <button type="button" className="close" aria-label="Click to close this popup modal" tabIndex="0" onClick={ this.props.onCancel }><i className="icon-cross-16-grayDark"></i></button>
                    <img className="listing-icon" alt={`${listing.title} header information`} src={ image } data-fallback="/store/images/types/3" />
                    <h3 className="listing-title" tabIndex="0" title={ title }>{ title }
                    {
                        agencyShort &&
                        <span className="company">
                            { listing.isPrivate &&
                                <i className="icon-lock-blue" style={lockStyle}></i>
                            }
                            <span style={labelStyle}>{ agencyShort }</span>
                        </span>
                    }
                    </h3>
                    <IconRating
                        className="icon-rating"
                        viewOnly
                        currentRating= { avgRate }
                        toggledClassName="icon-star-filled-yellow"
                        untoggledClassName="icon-star-filled-grayLighter"
                        halfClassName="icon-star-half-filled-yellow" />
                </div>
                { !this.props.preview && this.renderActions() }
            </div>
        );
    },

    renderActions: function () {
        return (
            <div ref="hastooltips" className="btn-group quickview-header-actions">
                {
                    this.props.listing.approvalStatus === "APPROVED" &&
                    <CenterLaunchLink listing={this.props.listing} className="btn btn-default" aria-label={ `Launch ${this.props.listing.title}`} />
                }
                {
                    this.props.listing.approvalStatus === "APPROVED" &&
                    <BookmarkButton listing={this.props.listing} />
                }
              {this.props.allowEdit && <button data-toggle="tooltip" data-placement="top" title="Edit" type="button" aria-label={`Edit ${this.props.listing.title}`} className="tooltiped btn btn-default" onClick={ this.props.onEdit }><i className="icon-pencil-grayDark"></i></button>}
            </div>
        );
    }
});

module.exports = QuickviewHeader;
