'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue.jsx');
var _ = require('../../utils/_');

var ResourcesTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        return (
            <div className="tab-pane active quickview-resources row">
                <div className="col-md-6 col-left">
                    <section className="resources">
                        <h5>Resources</h5>
                        { this.renderOtherResources() }
                    </section>
                </div>
                <div className="col-md-6 col-right">
                    <section className="tpoc">
                        <h5>Technical Support Contact Information</h5>
                        { this.renderTechSuppot() }
                    </section>
                </div>
            </div>
        );
    },

    renderUserGuide: function () {
        var userGuide = _.find(this.props.listing.docUrls, { name: 'User Manual'});

        return userGuide ?
                <p><a target="_blank" href={ userGuide.url }>{ userGuide.name }</a></p> :
                <EmptyFieldValue text="User guide unavailable" />;
    },

    renderApiDoc: function () {
        var apiDoc = _.find(this.props.listing.docUrls, { name: 'API Documentation'});

        return apiDoc ?
                <p><a target="_blank" href={ apiDoc.url }>{ apiDoc.name }</a></p> :
                <EmptyFieldValue text="API documentation unavailable" />;
    },

    renderOtherResources: function () {
        var resources = _.compact(this.props.listing.docUrls.map(function (doc) {
            if (doc.name !== 'User Manual' && doc.name !== 'API Documentation') {
                return <p><a target="_blank" href={ doc.url }>{ doc.name }</a></p>;
            }
        }));

        return resources.length ? resources : <EmptyFieldValue text="None available" />;
    },

    renderTechSuppot: function () {
        var tsc = this.props.listing.contacts.map(function (contact) {
            if(contact.type.indexOf("Technical Support") > -1) {
                return contact;
            }
        });

        _.compact(tsc);

        if (tsc.length) {
            return tsc.map(function (contact, i) {
                return (
                    <div>
                        <p><label>Technical Support Point of Contact { i + 1 }</label></p>
                        <div className="col-md-offset-1">
                            <p><label>Name:</label><span> {contact.name}</span></p>
                            <p><label>Email:</label><span> {contact.email}</span></p>
                            <p><label>Unsecure Phone:</label><span> {contact.unsecurePhone}</span></p>
                            <p><label>Secure Phone:</label><span> {contact.securePhone}</span></p>
                        </div>
                    </div>
                );
            });
        }
        else {
            return <EmptyFieldValue text="None available" />;
        }
    }

});

module.exports = ResourcesTab;
