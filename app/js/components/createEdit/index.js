/** @jsx React.DOM */
'use strict';

var React = require('react');

var Header      = require('../header'),
    Content     = require('./content'),
    Section     = require('./section'),
    Actions     = require('./actions'),
    Section     = require('./section'),
    Dropdown    = require('../input/dropdown'),
    AddItemList = require('../input/addItemList'),
    TabPanel    = require('react-tabs').TabPanel,
    TabSelect   = require('../input/tabselect'),
    $           = require('jquery');

require('bootstrap');

var CreateEditPage = React.createClass({

    /*jshint ignore:start */
    render: function () {
      var tags = {
        data: [
          {
            text: "tag1",
            id: 0
          },
          {
            text: "tag2",
            id: 1
          },{
            text: "tag3",
            id: 2
          }
        ],
        multiple: true
      }

      var categories = {
        data: [
          {
            text: 'Category A',
            id: 0
          },
          {
            text: 'Category B',
            id: 1
          },
          {
            text: 'Category C',
            id: 2
          }
        ],
        multiple: true
      };

        return (
            <div>
                <Header />
                <Actions title="Edit 'New Listing'">
                    <button className="btn btn-default">Preview</button>
                    <button className="btn btn-default">Save</button>
                    <button className="btn btn-default">Submit</button>
                    <button className="btn btn-default">Delete</button>
                </Actions>
                <Content>
                    <Section id="basic-info" title="Basic Information">
                        <div className="col-sm-5">
                            <h2>Basic Listing Information</h2>

                            <label>Name</label>
                            <p className="small">Title of the listing</p>
                            <input type="text" className="form-control"></input>

                            <label>Type</label>
                            <TabSelect name="type-selection">
                                <TabPanel title="Widget">
                                    <h3>Widget</h3>
                                    <p className="small">A small or highly specialized application</p>
                                </TabPanel>
                                <TabPanel title="Web Application">
                                    <h3>Web Application</h3>
                                    <p className="small">A web-based tool that uses the browser as a client</p>
                                </TabPanel>
                                <TabPanel title="Dashboard">
                                    <h3>Dashboard</h3>
                                    <p className="small">A layout incorporating widgets and/or web appications</p>
                                </TabPanel>
                                <TabPanel title="Suite">
                                    <h3>Suite</h3>
                                    <p className="small">A collection of applications and/or widgets that can be downloaded as a set</p>
                                </TabPanel>
                            </TabSelect>

                            <label>Category</label>
                            <p className="small">The category or categories in the existing AppsMall structure where this listing fits best.</p>
                            <Dropdown data={categories.data} multiple={categories.multiple} />

                            <label>Tags</label>
                            <p className="small">Keywords that describe the listing which can be used when searching.</p>
                            <Dropdown data={tags.data} multiple={tags.multiple} />

                        </div>
                        <div className="col-sm-5">

                            <label>Short Description</label>
                            <p className="small">A brief overview describing the listing. It will appear in the mouseover listing view. It must be less than 150 characters.</p>
                            <textarea className="form-control"></textarea>

                            <label>Full Description</label>
                            <p className="small">An overview describing the listing, discussing the available features and its purpose. It will appear in the detailed listing view.</p>
                            <textarea className="form-control"></textarea>

                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-5">
                            <h2>Listing Details</h2>
                            <label>Version Number</label>
                            <p className="small">Numerical identification of what the release version is.</p>
                            <input type="text" className="form-control"></input>
                            <label>Listing URL</label>
                            <p className="small">URL where this listing can be reached by users.</p>
                            <input type="text" className="form-control"></input>
                            <label>Usage Requirements</label>
                            <p className="small">Details about what system, security, or other requirements must be met in order to use this listing. If none apply, write &quot;None.&quot;</p>
                            <textarea className="form-control"></textarea>
                            <label>What&rsquo;s New</label>
                            <p className="small">Provide a description of what is new or different in this version.</p>
                            <textarea className="form-control"></textarea>
                        </div>
                        <div className="col-sm-5">
                            <h2>Graphics</h2>
                            <label>Featured Banner <small>(optional)</small></label>
                            <p className="small">Must be at least 280px tall x 454px wide.</p>
                            <input type="text" className="form-control"></input>
                            <label>Small Banner</label>
                            <p className="small">Must be at least 137px tall x 220px wide.</p>
                            <input type="text" className="form-control"></input>
                            <label>Icon</label>
                            <p className="small">Must be at least 16px tall x 16px wide.</p>
                            <input type="text" className="form-control"></input>
                            <h2>Ozone Properties</h2>
                            <label>Intents <small>(optional)</small></label>
                            <p className="small">Intents are special instructions used for communicating between applications. If this application uses intents, list them here.</p>
                            <AddItemList itemFormType={require('./intents/intentForm')} itemType={require('./intents/intent')} />
                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Resources and Contact">
                        <div className="col-sm-5">
                            <h2>Owner Information</h2>
                            <label>Associated Organization</label>
                            <p className="small">Organization overseeing this listing.</p>
                            <input type="text" className="form-control"></input>
                            <label>Owner</label>
                            <p className="small">Person(s) responsible for this listing.</p>
                            <input type="text" className="form-control"></input>
                            <h2>Resources</h2>
                            <label>User Manual</label>
                            <p className="small">URL of the user guide for this listing.</p>
                            <input type="text" className="form-control"></input>
                            <label>API Documentation</label>
                            <p className="small">URL of the API documentation for this listing.</p>
                            <input type="text" className="form-control"></input>
                            <label>Additional Resources</label>
                            <AddItemList itemFormType={require('./resources/resourceForm')} itemType={require('./resources/resource')} />
                        </div>
                        <div className="col-sm-5">
                            <h2>Technical Support Point of Contact</h2>
                            <p className="small">Point of Contact for users to seek technical support for this listing.</p>
                            <AddItemList itemFormType={require('./contacts/contactForm')} itemType={require('./contacts/contact')} />
                        </div>
                    </Section>
                </Content>
            </div>
        );
    },
    /*jshint ignore:end */

    componentDidMount: function () {
        var scrollspy = $('body').scrollspy({
            target: '#create-edit-tab-container'
        }).data('bs.scrollspy');

        this._$scrollspy = scrollspy;
    },

    componentWillUnmount: function () {
        this._$scrollspy.destroy();
    }

});

module.exports = CreateEditPage;
