'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue');

var Link = require('react-router').Link;

var ActiveStateMixin = require('ozp-react-commons/mixins/ActiveStateMixin');

var DetailsTab = React.createClass({
    mixins: [ActiveStateMixin],

    propTypes: {
        listing: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            activeRoute: this.getActiveRoute(),
            routeParams: this.getParams()
        };
    },

    render: function () {
        var whatsNew = this.props.listing.whatIsNew;
        var organization = this.props.listing.agency;
        var type = this.props.listing.type;
        var URL = this.props.listing.launchUrl;
        var updatedDate = this.props.listing.editedDate;
        var versionNumber = this.props.listing.versionName;
        var categories = this.props.listing.categories.join(', ');
        var tags = this.props.listing.tags.join(', ');
        var requirements = this.props.listing.requirements;


        /* jshint ignore:start */
        return (
            <div className="tab-pane active quickview-details row">
                <div className="col-md-4 col-left">
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
                        <h5>Usage Requirements</h5>
                        <hr/>
                        <p>{ requirements }</p>
                    </section>
                </div>
                <div className="col-md-4">
                    <section>
                        <h5>Marketplace Properties</h5>
                        <hr/>
                        <p>
                            <label>Type:</label><span> { type }</span><br />
                            <label>URL:</label><span> { URL }</span><br />
                            <label>Categories:</label><span> { categories ? categories : <EmptyFieldValue inline /> }</span><br />
                            <label>Tags:</label><span> { tags ? tags : <EmptyFieldValue inline /> }</span><br />
                            <label>Last Updated:</label><span> { updatedDate }</span><br />
                            <label>Version Number:</label><span> { versionNumber } </span>
                        </p>
                    </section>
                    { this.renderIntents() }
                </div>
                <div className="col-md-4 col-right">
                    <section>
                        <h5>Ownership Information</h5>
                        <hr/>
                        <label>Owner(s):</label>{ this.renderOwners() }<br />
                        <label>Associated Organization</label>
                        <p className="col-md-offset-1">{ organization }</p>
                        { this.renderGovSponser() }
                    </section>

                </div>
            </div>
        );
        /* jshint ignore:end */
    },

    renderOwners: function () {
        var state = this.state,
            owners = this.props.listing.owners;

        return owners.map(function (owner) {
            var queryParams = {profile: owner.id};

            /* jshint ignore:start */
            return (
                <span className="listing-owner">
                    <span> </span>
                    <Link to={state.activeRoute.name} params={state.routeParams}
                            query={queryParams}>
                        {owner.displayName}
                    </Link>
                </span>
            );
            /* jshint ignore:end */
        });
    },

    renderIntents: function () {
        /* jshint ignore:start */
        var intents = this.props.listing.intents;
        var singleton = (this.props.listing.singleton) ? "Yes" : "No";
        var intentComponents = this.props.listing.intents.map(function (intent) {
            var parts = intent.split('/');
            return <p><label>{ parts[2] }: </label><span> { parts[0] + '/' + parts[1] }</span></p>;
        });

        return (
            <section>
                <h5>Ozone Properties</h5>
                <hr/>
                <label>Singleton:</label><span> { singleton }</span><br />
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
        return this.props.listing.contacts.map(function (contact, i) {
            if (contact.type.indexOf("Government Sponser") >= 0) {
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
