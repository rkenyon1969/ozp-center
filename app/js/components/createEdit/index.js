/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Header           = require('../header'),
    Content          = require('./content'),
    Section          = require('./section'),
    Actions          = require('./actions'),
    Section          = require('./section'),
    ListOfForms      = require('../form').ListOfForms,
    TabPanel         = require('react-tabs').TabPanel,
    TabSelect        = require('../form').TabSelect,
    Input            = require('../form').Input,
    $                = require('jquery'),
    Chosen           = require('../form/chosen'),
    Cortex           = require('cortexjs'),
    screenshot       = require('./subitems/screenshot'),
    intent           = require('./subitems/intent'),
    resource         = require('./subitems/resource'),
    contact          = require('./subitems/contact'),
    ConfigStoreMixin = require('../../stores/ConfigStore').mixin;

require('bootstrap');

var data = {
    categories: [],
    agency: {id: null},
    contacts: [],
    descriptionShort: '',
    customFields: [],
    requirements: '',
    description: '',
    docUrls: [],
    imageLargeUrl: '',
    imageMediumUrl: '',
    imageSmallUrl: '',
    imageXlargeUrl: '',
    intents: [],
    launchUrl: '',
    owfProperties: {
        intents: [],
    },
    owners: [],
    screenshots: [],
    state: {
        id: null,
    },
    tags: [],
    title: '',
    types: {
        id: null,
    },
    versionName: ''
};

var listingCortex = new Cortex(data);

function printItem () {
    console.log(listingCortex.val());
}

var CreateEditPage = React.createClass({
    mixins: [ConfigStoreMixin],

    /*jshint ignore:start */
    render: function () {
        var listing = this.state.listing;
        return (
            <form>
                <Header />
                <Actions title="Edit 'New Listing'">
                    <button className="btn btn-default">Preview</button>
                    <button onClick={printItem} className="btn btn-default">Save Draft</button>
                    <button className="btn btn-default">Submit</button>
                    <button className="btn btn-default">Delete</button>
                </Actions>
                <Content>
                    <Section id="basic-info" title="Basic Information">
                        <div className="col-sm-5">
                            <h2>Basic Listing Information</h2>

                            <Input elementType="input" type="text" required itemValue={listing.title}
                                    label="Name" description="Title of the listing" />

                            {this.renderTypeSelector()}

                            {this.renderCategories()}

                            {this.renderTags()}

                        </div>
                        <div className="col-sm-5">

                            <Input elementType="textarea" required itemValue={listing.descriptionShort} label="Short Description"
                                    description="A brief overview describing the listing. It will appear in the mouseover listing view. It must be less than 150 characters." />

                            <Input elementType="textarea" required itemValue={listing.description} label="Full Description"
                                    description="An overview describing the listing, discussing the available features and its purpose. It will appear in the detailed listing view."/>

                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-5">
                            <h2>Listing Details</h2>

                            <Input elementType="input" type="text" itemValue={listing.versionName} label="Version Number (optional)"
                                    description="Numerical identification of what the release version is" />

                            <Input type="url" required itemValue={listing.launchUrl}
                                    label="Listing URL" description="URL where this listing can be reached by users" />

                            <Input elementType="textarea" required itemValue={listing.requirements} label="Usage Requirements"
                                    description="Details about what system, security, or other requirements must be met in order to use this listing. If none apply, write &quot;None.&quot;"/>

                            <Input elementType="textarea" itemValue={listing.whatIsNew} label="What&rsquo;s New (optional)"
                                    description="Provide a description of what is new or different in this version."/>

                            <h2>Ozone Properties</h2>

                            <ListOfForms className="intent-form" itemForm={intent.form} itemSchema={intent.schema}
                                    items={listing.owfProperties.intents} label="Intents (optional)"
                                    description="Intents are special instructions used for communicating between applications. If this application uses intents, list them here" />

                        </div>
                        <div className="col-sm-5">
                            <h2>Graphics</h2>

                            <Input elementType="input" type="url" label="Featured Banner (optional)" itemValue={listing.imageXlargeUrl}
                                    description="Must be at least 280px tall x 454px wide." />

                            <Input elementType="input" type="url" required label="Small Banner" itemValue={listing.imageLargeUrl}
                                    description="Must be at least 137px tall x 220px wide." />

                            <Input elementType="input" type="url" required label="Large Icon" itemValue={listing.imageMediumUrl}
                                    description="Must be 30px tall x 30px wide." />

                            <Input elementType="input" type="url" required label="Small Icon" itemValue={listing.imageSmallUrl}
                                    description="Must be at least 16px tall x 16px wide." />

                            {this.renderScreenshots()}

                            <ListOfForms className="resource-form" itemForm={resource.form} itemSchema={resource.schema}
                                    items={listing.docUrls} label="Resources" />

                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Contacts">
                        <div className="col-sm-5">
                            <h2>Owner Information</h2>
                            {this.renderOrganizations()}

                            <label>Owner</label>
                            <p className="small">Person(s) responsible for this listing.</p>
                            <input type="text" className="form-control"></input>
                        </div>

                        <div className="col-sm-5">
                            <h2>Contacts</h2>

                            <ListOfForms className="contact-form" itemForm={contact.form} itemSchema={contact.schema}
                                    items={listing.contacts} description="Point of Contact for users to seek technical support for this listing."/>
                        </div>
                    </Section>
                </Content>
            </form>
        );
    },

    renderTypeSelector: function () {
        if (!this.state.config) {
            return (
                <div>
                    loading!
                </div>
            );
        }

        var tabs = this.state.config.types.map(function (json) {
            return (
                <TabPanel label={json.title} value={json.id}>
                    <h3>{json.title}</h3>
                    <p className="small">{json.description}</p>
                </TabPanel>
            );
        });

        return (
            <TabSelect className="type-select" inputName="type-select" label="Listing Type"
                    itemValue={this.state.listing.types.id}>
                {tabs}
            </TabSelect>
        );
    },

    renderCategories: function () {
        var categories = [];

        if (!this.state.config) {
            return <div>Loading</div>;
        } else {
            categories = this.state.config.categories.map(function (json) {
                return {name: json.title, value: json.id};
            });
        }

        return <Chosen label="Category" description="The category or categories in the existing AppsMall structure where this listing fits best."
            placeholder="Select Categories" value={this.state.listing.categories} options={categories} multiple={true} />;
    },

    renderTags: function() {
        var defaultTags = ['tag1', 'tag2', 'tag3'];

        var tags = defaultTags.map(function(tag) {
            return {name: tag, value: 0};
        });

        return <Chosen label="Tags" description="Keywords that describe the listing which can be used when searching."
            placeholder="Select Tags" value={this.state.listing.tags} options={tags} multiple={true} />

    },

    renderOrganizations: function () {
        var organizations = [];
        if (this.state.config) {
            organizations = this.state.config.agencies.map(function (json) {
                return {name: json.title, value: json.id};
            });
        }

        return (
            <Input elementType="select" options={organizations} itemValue={this.state.listing.agency.id}
                    label="Associated Organization" description="Organization overseeing this listing"
                    required />
        );
    },

    renderScreenshots: function () {
        var screenshots = this.state.listing.screenshots,
            ScreenshotSchema = screenshot.schema;

        screenshots.val().length === 0 && screenshots.push(new ScreenshotSchema({}));

        return (
            <ListOfForms className="screenshot-form" itemForm={screenshot.form} itemSchema={screenshot.schema}
                    items={screenshots} label="Screenshots" description="At least one screenshot is required"
                    locked={[0]} />
        );
    },
    /*jshint ignore:end */

    getInitialState: function () {
        return {listing: listingCortex};
    },

    componentDidMount: function () {
        var me = this;

        listingCortex.on('update', function () {
            me.setState({listing: listingCortex});
        });

        var scrollspy = $('body').scrollspy({
            target: '#create-edit-tab-container'
        }).data('bs.scrollspy');

        this._$scrollspy = scrollspy;
    },

    componentWillUnmount: function () {
        listingCortex.off('update');
        this._$scrollspy.destroy();
    }

});

module.exports = CreateEditPage;
