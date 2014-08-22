/** @jsx React.DOM */
'use strict';

var React        = require('react'),
    Reflux       = require('reflux'),
    Header       = require('../header'),
    Content      = require('./content'),
    Section      = require('./section'),
    Actions      = require('./actions'),
    Section      = require('./section'),
    FormWithList = require('../form/form-with-list'),
    ListOfForms  = require('../form/list-of-forms'),
    TabPanel     = require('react-tabs').TabPanel,
    TabSelect    = require('../form/tab-select'),
    Input        = require('../form/input'),
    $            = require('jquery'),
    Select       = require('../form/select'),
    Dropdown     = require('../form/dropdown'),
    Cortex       = require('cortexjs');

require('bootstrap');

var data = {
    categories: [],
    agency: {id: null},
    contacts: [],
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

var ConfigStore = require('../../stores/ConfigStore');

var listingCortex = new Cortex(data);

function printItem () {
    console.log(listingCortex.val());
}

var CreateEditPage = React.createClass({
    mixins: [ Reflux.ListenerMixin ],

    /*jshint ignore:start */
    render: function () {
        var listing = this.state.listing;
        return (
            <div>
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

                            <Input type="text" value={listing.title}
                                    label="Name" description="Title of the listing"/>

                            <label>Type</label>
                            {this.renderTypeSelector()}

                            {this.renderCategories()}

                            {this.renderTags()}

                        </div>
                        <div className="col-sm-5">

                            <Input type="text" value={listing.descriptionShort}
                                    label="Short Description" description="A brief overview describing the listing. It will appear in the mouseover listing view. It must be less than 150 characters." />

                            <Input type="text" value={listing.description}
                                    label="Full Description" description="An overview describing the listing, discussing the available features and its purpose. It will appear in the detailed listing view."/>

                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-5">
                            <h2>Listing Details</h2>

                            <Input type="text" value={listing.launchUrl}
                                    label="Listing URL" description="URL where this listing can be reached by users" />

                            <Input type="text" value={listing.requirements}
                                    label="Usage Requirements" description="Details about what system, security, or other requirements must be met in order to use this listing. If none apply, write &quot;None.&quot;"/>

                            <Input type="text" value={listing.whatIsNew}
                                    label="What&rsquo;s New" description="Provide a description of what is new or different in this version."/>
                        </div>
                        <div className="col-sm-5">
                            <h2>Graphics</h2>

                            <Input type="text" label="Featured Banner (optional)"
                                    description="Must be at least 280px tall x 454px wide." />

                            <Input type="text" label="Small Banner" description="Must be at least 137px tall x 220px wide." />

                            <Input type="text" label="Icon" description="Must be at least 16px tall x 16px wide." />

                            <h2>Ozone Properties</h2>

                            <ListOfForms className="intent-form" itemForm={require('./intents/intentForm')} itemSchema={require('../../data/Intent')}
                                    items={listing.owfProperties.intents} label="Intents (optional)"
                                    description="Intents are special instructions used for communicating between applications. If this application uses intents, list them here" />

                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Contacts">
                        <div className="col-sm-5">
                            <h2>Owner Information</h2>
                            {this.renderOrganizations()}

                            <label>Owner</label>
                            <p className="small">Person(s) responsible for this listing.</p>
                            <input type="text" className="form-control"></input>

                            {/*<FormWithList itemForm={require('./resources/resourceForm')} itemMarkup={require('./resources/resource')}
                                    items={listing.docUrls} label="Additional Resources" />*/}
                        </div>
                        <div className="col-sm-5">
                            <h2>Contacts</h2>

                            <ListOfForms className="contact-form" itemForm={require('./contacts/contactForm')} itemSchema={require('../../data/Contact')}
                                    items={listing.contacts} description="Point of Contact for users to seek technical support for this listing."/>
                        </div>
                    </Section>
                </Content>
            </div>
        );
    },

    renderTypeSelector: function () {
        if (this.state.config.loading) {
            return (
                <div>
                    loading!
                </div>
            );
        }

        var tabs = this.state.config.types.map(function (json) {
            return (
                <TabPanel title={json.title}>
                    <h3>{json.title}</h3>
                    <p className="small">{json.description}</p>
                </TabPanel>
            );
        });

        return (
            <TabSelect name="type-selection">
                {tabs}
            </TabSelect>
        );
    },

    renderCategories: function () {
        var categories = [];

        if (this.state.config.loading) {
            return <div>Loading</div>;
        } else {
            categories = this.state.config.categories.map(function (json) {
                return {name: json.title, value: json.id};
            });
        }

        return <Dropdown label="Category" description="The category or categories in the existing AppsMall structure where this listing fits best."
            placeholder="Select Categories" value={this.state.listing.categories} options={categories} multiple={true} />;
    },

    renderTags: function() {
        var defaultTags = ['tag1', 'tag2', 'tag3'];

        var tags = defaultTags.map(function(tag) {
            return {name: tag, value: 0};
        });

        return <Dropdown label="Tags" description="Keywords that describe the listing which can be used when searching."
            placeholder="Select Tags" value={this.state.listing.tags} options={tags} multiple={true} />

    },

    renderOrganizations: function () {
        var organizations = [];
        if (!this.state.config.loading) {
            organizations = this.state.config.agencies.map(function (json) {
                return {name: json.title, value: json.id};
            });
        }

        return <Select options={organizations} value={this.state.listing.agency.id} />;
    },

    /*jshint ignore:end */

    getInitialState: function () {
        return {listing: listingCortex, config: ConfigStore.getConfig()};
    },

    _onChange: function () {
        this.setState({config: ConfigStore.getConfig()});
    },

    componentDidMount: function () {
        var me = this;

        this.listenTo(ConfigStore, this._onChange);

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
