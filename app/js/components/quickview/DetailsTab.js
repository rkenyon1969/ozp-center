/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue');

var DetailsTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        var whatsNew = this.props.listing.whatsNew();
        var organization = this.props.listing.organization();
        var type = this.props.listing.types().title;
        var URL = this.props.listing.launchUrl();
        var updatedDate = this.props.listing.editedDate();
        var releaseDate = this.props.listing.releaseDate();
        var categories = this.props.listing.categories().map(function (category) {
            return category.title;
        }).join(', ');
        var tags = this.props.listing.tags().map(function (tag) {
            return tag.tag.title;
        }).join(', ');

        /* jshint ignore:start */
        return (
            <div className="tab-pane quickview-details row">
                <div className="col-md-6 col-left">
                    <section>
                        <h5>What&lsquo;s New</h5>
                        <hr/>
                        {
                            whatsNew ?
                                <p>{ whatsNew }</p> :
                                <EmptyFieldValue />
                        }
                    </section>
                    <section>
                        <h5>Ownership Information</h5>
                        <hr/>
                        <label>Owner(s):</label>{ this.renderOwners() }<br />
                        <label>Associated Organization</label>
                        <p className="col-md-offset-1">{ organization }</p>
                        { this.renderGovSponser() }
                    </section>
                </div>
                <div className="col-md-6 col-right">
                    <section>
                        <h5>Listing Details</h5>
                        <hr/>
                        <p><label>Type:</label><span> { type }</span></p>
                        <p><label>URL:</label><span> { URL }</span></p>
                        <p><label>Categories:</label><span> { categories ? categories : <EmptyFieldValue inline /> }</span></p>
                        <p><label>Tags:</label><span> { tags ? tags : <EmptyFieldValue inline /> }</span></p>
                        <p><label>Last Updated:</label><span> { updatedDate }</span></p>
                        <p><label>Original Release Date:</label><span> { releaseDate ? releaseDate : <EmptyFieldValue inline /> }</span></p>
                    </section>
                    { this.renderIntents() }
                </div>
            </div>
        );
        /* jshint ignore:end */
    },

    renderOwners: function () {
        var owners = this.props.listing.owners();

        /* jshint ignore:start */
        return owners.map(function (owner) {
            return (<span className="listing-owner"> { owner.name }</span>);
        });
        /* jshint ignore:end */
    },

    renderIntents: function () {
        /* jshint ignore:start */
        var intents = this.props.listing.intents();
        var intentComponents = this.props.listing.intents().map(function (intent) {
            if (intent.receive) {
                return (
                    <p><label>{ intent.action.title }: </label><span> { intent.dataType.title }</span></p>
                );
            }
        });

        return (
            <section>
                <h5>Ozone Properties</h5>
                <hr/>
                <label>Intents:</label>
                <div className="col-md-offset-1">
                    { intents.length ? intentComponents : <EmptyFieldValue /> }
                </div>
            </section>
        );
        /* jshint ignore:end */
    },

    renderGovSponser: function () {
        /* jshint ignore:start */
        return [
            <label>Gov Sponsor</label>,
            <div className="col-md-offset-1">
                <p><label>Name:</label><span> Joe Montana</span></p>
                <p><label>Secure Email:</label><span> jmontana@gmail.com</span></p>
                <p><label>Name:</label><span> Joe Montana</span></p>
                <p><label>Unsecure Phone:</label><span> (123) 456-789</span></p>
                <p><label>Secure Phone:</label><span> (123) 456-789</span></p>
            </div>
        ];
        /* jshint ignore:end */
    }

});

module.exports = DetailsTab;