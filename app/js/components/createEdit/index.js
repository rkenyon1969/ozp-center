/** @jsx React.DOM */
'use strict';

var React = require('react');

var Logo = require('../header/Logo');
var Header = require('../header');
var Content = require('./content');
var Section = require('./section');
var Actions = require('./actions');
var Section = require('./section');

var $ = require('jquery');
require('bootstrap');

var CreateEditPage = React.createClass({

    /*jshint ignore:start */
    render: function () {
        return (
            <div>
                <div id="header">
                    <Header />
                </div>
                <Actions title="Edit 'New Listing'">
                    <button className="btn btn-default">Preview</button>
                    <button className="btn btn-default">Save</button>
                    <button className="btn btn-default">Submit</button>
                    <button className="btn btn-default">Delete</button>
                </Actions>
                <Content>
                    <Section id="basic-info" title="Basic Information">
                        <div className="col-sm-4">
                            <h2>Basic Listing Information</h2>
                            <label>Name</label>
                            <input type="text" className="form-control"></input>
                            <label>Category</label>
                            <input type="text" className="form-control"></input>
                            <label>Tags</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="col-sm-4">
                            <label>Short Description</label>
                            <textarea className="form-control"></textarea>
                            <label>Full Description</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-4">
                            <h2>Listing Details</h2>
                            <label>Version Number</label>
                            <input type="text" className="form-control"></input>
                            <label>Listing URL</label>
                            <input type="text" className="form-control"></input>
                            <label>Usage Requirements</label>
                            <textarea className="form-control"></textarea>
                            <label>What&rsquo;s New</label>
                            <textarea className="form-control"></textarea>
                        </div>
                        <div className="col-sm-4">
                            <h2>Graphics</h2>
                            <label>Featured Banner</label>
                            <input type="text" className="form-control"></input>
                            <label>Small Banner</label>
                            <input type="text" className="form-control"></input>
                            <label>Icon</label>
                            <input type="text" className="form-control"></input>
                            <h2>Ozone Properties</h2>
                            <label>Intents</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Resources and Contact">
                        <div className="col-sm-4">
                            <h2>Owner Information</h2>
                            <label>Associated Organization</label>
                            <input type="text" className="form-control"></input>
                            <label>Owner</label>
                            <input type="text" className="form-control"></input>
                            <h2>Resources</h2>
                            <label>User Manual</label>
                            <input type="text" className="form-control"></input>
                            <label>API Documentation</label>
                            <input type="text" className="form-control"></input>
                            <label>Additional Resources</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="col-sm-4">
                            <h2>Technical Support Point of Contact</h2>
                            <label>Name</label>
                            <input type="text" className="form-control"></input>
                            <label>Email</label>
                            <input type="text" className="form-control"></input>
                            <label>Phone</label>
                            <input type="text" className="form-control"></input>
                            <button className="btn btn-default">Add Contact</button>
                        </div>
                    </Section>
                </Content>
            </div>
        );
    },
    /*jshint ignore:end */

    componentDidMount: function () {
        var scrollspy = $('body').scrollspy({
            target: '#content-nav'
        }).data('bs.scrollspy');

        this._$scrollspy = scrollspy;
    },

    componentWillUnmount: function () {
        this._$scrollspy.destroy();
    }

});

module.exports = CreateEditPage;
