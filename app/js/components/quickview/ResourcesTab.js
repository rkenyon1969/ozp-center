/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var EmptyFieldValue = require('../shared/EmptyFieldValue');
var find = require('lodash/collections/find');

var ResourcesTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    /* jshint ignore:start */
    render: function () {
        return (
            <div className="tab-pane active quickview-resources row">
                <div className="col-md-6 col-left">
                    <section className="documentation">
                        <h5>Documentation</h5>
                        <hr/>
                        { this.renderUserGuide() }
                        { this.renderApiDoc() }
                    </section>
                    <section className="resources">
                        <h5>Other Resources</h5>
                        <hr/>
                        <p className="text-muted">API Documentation unavailable</p>
                    </section>
                </div>
                <div className="col-md-6 col-right">
                    <section className="tpoc">
                        <h5>Technical Support Contact Information</h5>
                        <hr/>
                        <div>
                            <p><label>Name:</label><span> Joe Montana</span></p>
                            <p><label>Secure Email:</label><span> jmontana@gmail.com</span></p>
                            <p><label>Name:</label><span> Joe Montana</span></p>
                            <p><label>Unsecure Phone:</label><span> (123) 456-789</span></p>
                            <p><label>Secure Phone:</label><span> (123) 456-789</span></p>
                        </div>
                    </section>
                </div>
            </div>
        );
    },

    renderUserGuide: function () {
        var userGuide = find(this.props.listing.docUrls(), { name: 'User Guide'});

        return userGuide ?
                <p><a target="_blank" href={ userGuide.url }>{ userGuide.name }</a></p> :
                <EmptyFieldValue text="User guide unavailable" />;
    },

    renderApiDoc: function () {
        var apiDoc = find(this.props.listing.docUrls(), { name: 'API Documentation'});

        return apiDoc ?
                <p><a target="_blank" href={ apiDoc.url }>{ apiDoc.name }</a></p> :
                <EmptyFieldValue text="API documentation unavailable" />;
    }
    /* jshint ignore:end */

});

module.exports = ResourcesTab;