'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue');

var DetailsTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        var whatsNew = this.props.listing.whatIsNew;
        var organization = this.props.listing.agency;
        var type = this.props.listing.type;
        var URL = this.props.listing.launchUrl;
        var updatedDate = this.props.listing.editedDate;
        var releaseDate = this.props.listing.releaseDate;
        var categories = this.props.listing.categories.join(', ');
        var tags = this.props.listing.tags.join(', ');

        /* jshint ignore:start */
        return (
            <div className="tab-pane active quickview-details row">
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
        var owners = this.props.listing.owners;

        /* jshint ignore:start */
        return owners.map(function (owner) {
            return (<span className="listing-owner"> { owner.displayName }</span>);
        });
        /* jshint ignore:end */
    },

    renderIntents: function () {
        /* jshint ignore:start */
        var intents = this.props.listing.intents;
        var intentComponents = this.props.listing.intents.map(function (intent) {
            var parts = intent.split('/');
            return <p><label>{ parts[2] }: </label><span> { parts[0] + '/' + parts[1] }</span></p>;
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
        return this.props.listing.contacts.map(function(contact, i){
            if (contact.type.indexOf("Government Sponser") >= 0){
                return  [<label>Government Sponser </label>,
                        <div className="col-md-offset-1">
                            <p><label>Name:</label><span> {contact.name}</span></p>
                            <p><label>Email:</label><span> {contact.email}</span></p>
                            <p><label>Unsecure Phone:</label><span> {contact.unsecurePhone}</span></p>
                            <p><label>Secure Phone:</label><span> {contact.securePhone}</span></p>
                        </div>];
            }
        });
        /* jshint ignore:end */
    }

});

module.exports = DetailsTab;
