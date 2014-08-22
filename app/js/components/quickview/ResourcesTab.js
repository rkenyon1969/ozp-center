/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var ResourcesTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="tab-pane quickview-resources row">
                <div className="col-md-6 col-left">
                    <section className="documentation">
                        <h5>Documentation</h5>
                        <hr/>
                        <p className="text-muted">User guide unavailable</p>
                        <p className="text-muted">API Documentation unavailable</p>
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
                            <p><label>Secure Email:</label><span> jmontana@ugov.com</span></p>
                            <p><label>Name:</label><span> Joe Montana</span></p>
                            <p><label>Unsecure Phone:</label><span> (123) 456-789</span></p>
                            <p><label>Secure Phone:</label><span> (123) 456-789</span></p>
                        </div>
                    </section>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ResourcesTab;