'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue.jsx');
var _ = require('../../utils/_');
var ProfileLink = require('../profile/ProfileLink.jsx');

var DetailsTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        var whatsNew = this.props.listing.whatIsNew;
        var organization = this.props.listing.agency.title;
        var type = this.props.listing.type;
        var URL = this.props.listing.launchUrl;
        var updatedDate = this.props.listing.editedDate;
        var versionNumber = this.props.listing.versionName;
        var categories = _.pluck(this.props.listing.categories, 'title').join(', ');
        var tags = _.pluck(this.props.listing.tags, 'name').join(', ');
        var requirements = this.props.listing.requirements;

        return (
            <div className="tab-pane active quickview-details row">
                <div className="col-xs-4 col-left">
                    <section className="forceWrap">
                        <h5>What&lsquo;s New</h5>
                        {
                            whatsNew ?
                                <p className="forceWrap">{ whatsNew }</p> :
                                <EmptyFieldValue />
                        }
                    </section>
                    <section>
                        <h5>Usage Requirements</h5>
                        <p>{ requirements }</p>
                    </section>
                </div>
                <div className="col-xs-4">
                    <section>
                        <h5>Center Properties</h5>
                        <p>
                            <p><label>Type:</label><span> { type.title }</span></p>

                            <p className="forceWrap"><label>URL:</label><span> <a className="forceWrap" href={URL}>{ URL }</a></span></p>

                            <p><label>Categories:</label><span> { categories ? categories : <EmptyFieldValue inline /> }</span></p>
                            <p><label>Tags:</label><span> { tags ? tags : <EmptyFieldValue inline /> }</span></p>
                            <p><label>Last Updated:</label><span> { updatedDate }</span></p>
                            <p><label>Version Number:</label><span> { versionNumber } </span></p>
                        </p>
                    </section>
                    { this.renderIntents() }
                </div>
                <div className="col-xs-4 col-right">
                    <section>
                        <h5>Ownership Information</h5>
                        <p>
                        <p><label>Owner(s):</label>{ this.renderOwners() }</p>
                        <p><label>Associated Organization</label></p>
                        <p className="col-xs-offset-1">{ organization }</p>
                        { this.renderGovSponser() }
                        </p>
                    </section>

                </div>
            </div>
        );
    },

    renderOwners: function () {
        var owners = this.props.listing.owners;

        return owners.map(function (owner) {
            return (
                <p className="listing-owner">
                    <span> </span>
                    <ProfileLink profileId={owner.id}>
                        {owner.display_name}
                    </ProfileLink>
                </p>
            );
        });
    },

    renderIntents: function () {
        var intents = this.props.listing.intents;
        var singleton = (this.props.listing.singleton) ? "Yes" : "No";
        var intentComponents = this.props.listing.intents.map(function (intent) {
            var parts = intent.split('/');
            return <p><span className="intentName">{ parts[2] }: </span><span> { parts[0] + '/' + parts[1] }</span></p>;
        });

        return (
            <section>
                <h5>AppsMall Properties</h5>
                <p>
                    <p><label>Singleton:</label><span> { singleton }</span></p>
                    <p><label>Intents:</label>
                        <div className="col-xs-offset-1">
                            { intents.length ? intentComponents : <EmptyFieldValue /> }
                        </div>
                    </p>
                </p>
            </section>
        );
    },

    renderGovSponser: function () {
        return this.props.listing.contacts.map(function (contact) {
            if (contact.id >= 0) {
                return  [<label>Government Sponser </label>,
                        <div className="col-xs-offset-1">
                            <p><label>Name:</label><span> {contact.name}</span></p>
                            <p><label>Email:</label><span> {contact.email}</span></p>
                            <p><label>Unsecure Phone:</label><span> {contact.unsecure_phone}</span></p>
                            <p><label>Secure Phone:</label><span> {contact.secure_phone}</span></p>
                        </div>];
            }
        });
    }

});

module.exports = DetailsTab;
