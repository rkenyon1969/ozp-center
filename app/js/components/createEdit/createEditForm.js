'use strict';

var React = require('react');
var Text = require('../form/TextInput');
var TextArea = require('../form/TextAreaInput');
var Select = require('../form/Select2Input');
var TagSelect = require('../form/Select2TagInput');
var Url = require('../form/UrlInput');
var ListOfForms = require('../form/ListOfForms');
var Header = require('../header');
var Content = require('./content');
var Actions = require('./actions');
var Section = require('./section');
var Resource = require('./subitems/resource');
var Screenshot = require('./subitems/screenshot');
var Contact = require('./subitems/contact');
var saveListing = require('../../actions/ListingActions').save;

var CreateEditForm = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var setters = this.props.setters;
        var listing = this.props.listing;

        return (
            <form id="listing-submission-form" ref="form" onSubmit={this.handleSubmit}>
                <Header />
                <Actions title="Create 'New Listing'">
                    <button form="listing-submission-form" type="submit" className="btn btn-default">Submit</button>
                </Actions>
                <Content>
                    <Section id="basic-info" title="Basic Information">
                        <div className="col-sm-5">
                            <h2>Basic Listing Information</h2>

                            <Text required setter={setters['title']} defaultValue={listing.title()} label="Name" description="Title of the listing" maxLength={256} />

                            {this.renderTypeSelector()}

                            {this.renderCategories()}

                            <TagSelect label="Tags" description="Keywords that describe the listing which can be used when searching."
                                    defaultValue={listing.tags()} setter={setters['tags']} multiple />

                        </div>
                        <div className="col-sm-5">
                            <TextArea description="A brief overview describing the listing. It will appear in the mouseover listing view. It must be less than 150 characters."
                                    label="Short Description" maxLength={150} required setter={setters['descriptionShort']} defaultValue={listing.descriptionShort()} />

                            <TextArea label="Full Description" maxLength={4000} required setter={setters['description']} defaultValue={listing.description()}
                                    description="An overview describing the listing, discussing the available features and its purpose. It will appear in the detailed listing view." />
                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-5">
                            <h2>Listing Details</h2>
                            <Text setter={setters['versionName']} label="Version Number" defaultValue={listing.versionName()}
                                    description="Numerical identification of what the release version is" maxLength={256} />

                            <Url required setter={setters['launchUrl']} defaultValue={listing.launchUrl()}
                                    label="Listing URL" description="URL where this listing can be reached by users" />

                            <TextArea required setter={setters['requirements']} label="Usage Requirements" defaultValue={listing.requirements()}
                                    description="Details about what system, security, or other requirements must be met in order to use this listing. If none apply, write &quot;None.&quot;"/>

                            <TextArea setter={setters['whatIsNew']} label="What&rsquo;s New" maxLength={1000} defaultValue={listing.whatIsNew()}
                                    description="Provide a description of what is new or different in this version." />

                            <h2>Intents</h2>
                            {this.renderIntents()}

                        </div>
                        <div className="col-sm-5">
                            <h2>Graphics</h2>

                            <Url label="Featured Banner" setter={setters['imageXlargeUrl']} defaultValue={listing.imageXlargeUrl()}
                                    description="Must be at least 600px wide x 375px tall." />

                            <Url required label="Small Banner" setter={setters['imageLargeUrl']} defaultValue={listing.imageLargeUrl()}
                                    description="Must be at least 220px wide x 137px tall." />

                            <Url required label="Large Icon" setter={setters['imageMediumUrl']} defaultValue={listing.imageMediumUrl()}
                                    description="Must be 30px wide x 30px tall." />

                            <Url required label="Small Icon" setter={setters['imageSmallUrl']} defaultValue={listing.imageSmallUrl()}
                                    description="Must be at least 16px wide x 16px tall." />

                            <h2>Screenshots</h2>
                            <ListOfForms className="screenshot-form" itemForm={Screenshot.form} itemSchema={Screenshot.schema} setter={setters['screenshots']}
                                    items={listing.screenshots()} description="At least one screenshot is required" locked={[0]} />

                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Contacts">
                        <div className="col-sm-5">
                            <h2>Owner Information</h2>
                            {this.renderOrganization()}
                            {this.renderOwners()}

                            <h2>Resources</h2>
                            <ListOfForms className="resource-form" itemForm={Resource.form} itemSchema={Resource.schema} items={listing.docUrls()} setter={setters['docUrls']} />

                        </div>

                        <div className="col-sm-5">
                            <h2>Contacts</h2>
                            <ListOfForms className="contact-form" itemForm={Contact.form} itemSchema={Contact.schema}
                                    config={{contactTypes: this.props.config.contactTypes}} items={listing.contacts()} setter={setters['contacts']}
                                    description="Point of Contact for users to seek technical support for this listing." />

                        </div>
                    </Section>
                </Content>
            </form>
        );
    },
    /*jshint ignore:end */

    renderTypeSelector: function () {
        var listing = this.props.listing,
            types = [],
            typeDefs = [],
            type = listing.type();

        this.props.config.types.forEach(function (json) {
            var className = json.title === type ? 'type-descriptor active' : 'type-descriptor';

            /*jshint ignore:start */
            types.push(<option value={json.title}>{json.title}</option>);

            typeDefs.push(
                <div className={className}>
                    <h3>{json.title}</h3>
                    <p className="small">{json.description}</p>
                </div>
            );
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <div className="row type-select">
                <div className="col-sm-5">
                    <Select setter={this.props.setters['type']} label="Listing Type" required defaultValue={type}>
                        {types}
                    </Select>
                </div>
                <div className="col-sm-7">
                    {typeDefs}
                </div>
            </div>
        );
        /*jshint ignore:end */
    },

    renderCategories: function () {
        var options = this.props.config.categories.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.title}>{json.title}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select label="Category" description="The category or categories in the existing AppsMall structure where this listing fits best."
                    setter={this.props.setters['categories']} multiple required data-placeholder="Select a Category" defaultValue={this.props.listing.categories()}>
                    {options}
            </Select>
        );
        /*jshint ignore:end */
    },

    renderIntents: function () {
        var options = this.props.config.intents.map(function (json) {
            var intent = json.type + '/' + json.action;
            /*jshint ignore:start */
            return <option value={intent}>{intent}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select description="Intents are special instructions used for communicating between applications. If this application uses intents, list them here."
                    setter={this.props.setters['intents']} multiple data-placeholder="Select Intents" defaultValue={this.props.listing.intents()}>
                    {options}
            </Select>
        );
        /*jshint ignore:end */
    },

    renderOrganization: function () {
        var organizations = this.props.config.organizations.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.title}>{json.title}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select setter={this.props.setters['agency']} defaultValue={this.props.listing.agency()}
                    label="Associated Organization" description="Organization overseeing this listing"
                    required data-placeholder="Select an Organization">
                {organizations}
            </Select>
        );
        /*jshint ignore:end */
    },

    renderOwners: function () {
        var owners = this.props.listing.owners().map(function (user) {
            return user.username;
        });

        var options = this.props.config.users.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.username}>{json.username}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select label="Owners" description="Person(s) responsible for this listing" defaultValue={owners}
                    setter={this.props.setters['owners']} required multiple data-placeholder="Select owner(s)">
                {options}
            </Select>
        );
        /*jshint ignore:end */
    },

    handleSubmit: function (e) {
        e.preventDefault();
        console.log(this.props.listing.toObject());
        saveListing(this.props.listing.toObject());
    }

});

module.exports = CreateEditForm;
