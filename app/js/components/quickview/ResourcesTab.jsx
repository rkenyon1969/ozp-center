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
            <div className="tab-pane active quickview-resources row" tabIndex="0">
              <h5 className="offscreen"> App Resources </h5>
                <div className="col-xs-6 col-left">
                    <section className="resources">
                        <h5>Resources</h5>
                        { this.renderOtherResources() }
                    </section>
                </div>
                <div className="col-xs-6 col-right">
                    <section className="tpoc">
                        <h5>Contact Information</h5>
                        { this.contactGroups() }
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
        var resources = _.compact(this.props.listing.docUrls.map(function (doc, i) {
            return <p key={`renderOtherResources.${i}`}><a target="_blank" href={ doc.url }>{ doc.name }</a></p>;
        }));

        return resources.length ? resources : <EmptyFieldValue text="None available" />;
    },

    contactGroups: function(){
        var contacts = {};

        this.props.listing.contacts.map(function (contact) {
            var contactName = contact.contactType.name;
            if(typeof(contacts[contactName]) === 'undefined'){
                contacts[contactName] = [];
                contacts[contactName].push(contact);
            }else{
                contacts[contactName].push(contact);
            }
        });

        var sortedContacts = [];

        for( var contactType in contacts ){
            var baseKey = `${contactType}`;
            var contactBlocks = contacts[contactType].map((contact, i)=>{
                _.compact(contact);
                return(
                    <div key={`${baseKey}.${i}`}>
                        <p><label>Point of Contact { i + 1 }</label></p>
                        <div className="col-xs-offset-1">
                            <p><label>Name:</label><span> {contact.name}</span></p>
                            <p><label>Email:</label><span> {contact.email}</span></p>
                            <p><label>Unsecure Phone:</label><span> {contact.unsecurePhone}</span></p>
                            <p><label>Secure Phone:</label><span> {contact.securePhone}</span></p>
                        </div>
                    </div>
                );
            });
            sortedContacts.push(
                <div key={`${baseKey}.contactGroups.finalPush`} style={{'margin-top': '2em'}}>
                    <p><strong>{contactType}</strong></p>
                    {contactBlocks}
                </div>
            );
        }
        var rsc = sortedContacts.map(function(r){
            return(r);
        });
        if(this.props.listing.contacts.length){
            return(rsc);
        }else {
            return <EmptyFieldValue text="None available" />;
        }
    }
});

module.exports = ResourcesTab;
