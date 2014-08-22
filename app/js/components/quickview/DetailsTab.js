/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var DetailsTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="tab-pane quickview-details row">
                <div className="col-md-6 col-left">
                    <section className="whatsnew">
                        <h5>What&lsquo;s New</h5>
                        <hr/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </section>
                    <section className="ownership">
                        <h5>Ownership Information</h5>
                        <hr/>
                        <label>Owner:</label><span> Owner name</span><br />
                        <label>Associated Organization</label>
                        <p className="col-md-offset-1">TOTP</p>
                        <label>Government Sponsor</label>
                        <div className="col-md-offset-1">
                            <label>Name:</label><span> Joe Montana</span><br />
                            <label>Secure Email:</label><span> jmontana@ugov.com</span><br />
                            <label>Name:</label><span> Joe Montana</span><br />
                            <label>Unsecure Phone:</label><span> (123) 456-789</span><br />
                            <label>Secure Phone:</label><span> (123) 456-789</span><br />
                        </div>
                    </section>
                </div>
                <div className="col-md-6 col-right">
                    <section className="ownership">
                        <h5>Listing Details</h5>
                        <hr/>
                        <label>Type:</label><span> Joe Montana</span><br />
                        <label>URL:</label><span> jmontana@ugov.com</span><br />
                        <label>Categories:</label><span> Utilities, Tools</span><br />
                        <label>Tags:</label><span> Searching, research, tools, utilities, find</span><br />
                        <label>Last Updated:</label><span> Yesterday</span><br />
                        <label>Original Release Date:</label><span> 08/14/2014</span><br />
                    </section>
                    <section className="ownership">
                        <h5>Ozone Properties</h5>
                        <hr/>
                        <label>Intents:</label>
                        <div className="col-md-offset-1">
                            <label>View:</label><span> Image</span><br />
                            <label>View:</label><span> Video</span><br />
                        </div>
                    </section>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = DetailsTab;