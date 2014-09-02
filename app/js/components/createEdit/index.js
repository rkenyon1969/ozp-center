/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Header           = require('../header'),
    Content          = require('./content'),
    Actions          = require('./actions'),
    Section          = require('./section'),
    ListOfForms      = require('../form/listOfForms'),
    $                = require('jquery'),
    ScreenshotForm   = require('./subitems/screenshot'),
    Screenshot       = require('./schema/screenshot'),
    IntentForm       = require('./subitems/intent'),
    Intent           = require('./schema/intent'),
    Resource         = require('./schema/resource'),
    ResourceForm     = require('./subitems/resource'),
    Contact          = require('./schema/contact'),
    ContactForm      = require('./subitems/contact'),
    ListingCortex    = require('./listingCortex'),
    dataBinder       = require('../../utils/binder'),
    TextInput        = require('../form/textInput'),
    TextArea         = require('../form/textArea'),
    Select           = require('../form/select'),
    TagSelect        = require('../form/tagSelect'),
    saveListing      = require('../../actions/ListingActions').save;

require('bootstrap');

var CreateEditPage = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var listing = this.state.listing,
            lockedContacts = [];

        //The number of locked contact forms should be equal to the number
        //of required contact types, so we just need a range here
        var index = 0;
        this.props.config.contactTypes.forEach(function (contactType) {
            if (contactType.required) {
                lockedContacts.push(index);
            }
            index += 1
        });

        return (
            <form id="listing-submission-form" ref="form" onSubmit={this.handleSubmit}>
                <Header />
                <Actions title="Edit 'New Listing'">
                    <button form="listing-submission-form" type="submit" className="btn btn-default">Submit</button>
                </Actions>
                <Content>
                    <Section id="basic-info" title="Basic Information">
                        <div className="col-sm-5">
                            <h2>Basic Listing Information</h2>

                            <TextInput type="text" required dataBinder={dataBinder.simpleBinder(listing.title)}
                                    label="Name" description="Title of the listing" maxLength={256} />

                            {this.renderTypeSelector()}
                            {this.renderTags()}
                            {this.renderCategories()}

                        </div>
                        <div className="col-sm-5">
                            <TextArea label="Short Description" maxLength={150} required
                                    description="A brief overview describing the listing. It will appear in the mouseover listing view. It must be less than 150 characters."
                                    dataBinder={dataBinder.simpleBinder(listing.descriptionShort)} />

                            <TextArea label="Full Description" maxLength={4000} required
                                    description="An overview describing the listing, discussing the available features and its purpose. It will appear in the detailed listing view."
                                    dataBinder={dataBinder.simpleBinder(listing.description)} />
                        </div>
                    </Section>
                    <Section id="details" title="Details">
                        <div className="col-sm-5">
                            <h2>Listing Details</h2>
                            <TextInput type="text" dataBinder={dataBinder.simpleBinder(listing.versionName)} label="Version Number"
                                    description="Numerical identification of what the release version is" maxLength={256} />

                            <TextInput type="url" required dataBinder={dataBinder.simpleBinder(listing.launchUrl)}
                                    label="Listing URL" description="URL where this listing can be reached by users" maxLength={2083} />

                            <TextArea required dataBinder={dataBinder.simpleBinder(listing.requirements)} label="Usage Requirements"
                                    description="Details about what system, security, or other requirements must be met in order to use this listing. If none apply, write &quot;None.&quot;"/>

                            <TextArea dataBinder={dataBinder.simpleBinder(listing.whatIsNew)} label="What&rsquo;s New" maxLength={1000}
                                    description="Provide a description of what is new or different in this version." />

                            <h2>Intents</h2>

                            <ListOfForms className="intent-form" itemForm={IntentForm} itemSchema={Intent} items={listing.owfProperties.intents}
                                    description="Intents are special instructions used for communicating between applications. If this application uses intents, list them here" />
                        </div>
                        <div className="col-sm-5">
                            <h2>Graphics</h2>

                            <TextInput type="url" label="Featured Banner" dataBinder={dataBinder.simpleBinder(listing.imageXlargeUrl)}
                                    description="Must be at least 600px wide x 375px tall." maxLength={2083} />

                            <TextInput type="url" required label="Small Banner" dataBinder={dataBinder.simpleBinder(listing.imageLargeUrl)}
                                    description="Must be at least 220px wide x 137px tall." maxLength={2083} />

                            <TextInput type="url" required label="Large Icon" dataBinder={dataBinder.simpleBinder(listing.imageMediumUrl)}
                                    description="Must be 30px wide x 30px tall." maxLength={2083} />

                            <TextInput type="url" required label="Small Icon" dataBinder={dataBinder.simpleBinder(listing.imageSmallUrl)}
                                    description="Must be at least 16px wide x 16px tall." maxLength={2083} />

                            <h2>Screenshots</h2>
                            <ListOfForms className="screenshot-form" itemForm={ScreenshotForm} itemSchema={Screenshot}
                                    items={listing.screenshots} description="At least one screenshot is required"
                                    locked={[0]} />
                        </div>
                    </Section>
                    <Section id="resources-contacts" title="Contacts">
                        <div className="col-sm-5">
                            <h2>Owner Information</h2>
                            {this.renderOrganizations()}
                            {this.renderOwners()}

                            <h2>Resources</h2>
                            <ListOfForms className="resource-form" itemForm={ResourceForm} itemSchema={Resource}
                                    items={listing.docUrls} />
                        </div>

                        <div className="col-sm-5">
                            <h2>Contacts</h2>
                            <ListOfForms className="contact-form" itemForm={ContactForm} itemSchema={Contact} locked={lockedContacts}
                                    items={listing.contacts} description="Point of Contact for users to seek technical support for this listing." />

                        </div>
                    </Section>
                </Content>
            </form>
        );
    },
    /*jshint ignore:end */

    renderTypeSelector: function () {
        var types = [],
            typeDefs = [],
            typeId = this.state.listing.types.id.val();

        this.props.config.types.forEach(function (json) {
            var className = json.id === typeId ? 'type-descriptor active' : 'type-descriptor';

            /*jshint ignore:start */
            types.push(<option value={json.id}>{json.title}</option>);

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
                    <Select dataBinder={dataBinder.idBinder(this.state.listing.types.id)} label="Listing Type" required>
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
        var categories = this.state.listing.categories;
        var options = this.props.config.categories.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.id}>{json.title}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select label="Category" description="The category or categories in the existing AppsMall structure where this listing fits best."
                    dataBinder={dataBinder.objCollectionBinder(categories)} multiple required data-placeholder="Select a Category">
                    {options}
            </Select>
        );
        /*jshint ignore:end */
    },

    renderTags: function() {
        var tags = this.state.listing.tags;

        /*jshint ignore:start */
        return (
            <TagSelect label="Tags" description="Keywords that describe the listing which can be used when searching."
                    dataBinder={dataBinder.simpleBinder(tags)} multiple />
        );
        /*jshint ignore:end */

    },

    renderOrganizations: function () {
        var organizations = this.props.config.organizations.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.id}>{json.title}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select dataBinder={dataBinder.idBinder(this.state.listing.agency.id)}
                    label="Associated Organization" description="Organization overseeing this listing"
                    required data-placeholder="Select an Organization">
                {organizations}
            </Select>
        );
        /*jshint ignore:end */
    },

    renderOwners: function () {
        var owners = this.state.listing.owners;
        var options = this.props.config.users.map(function (json) {
            /*jshint ignore:start */
            return <option value={json.id}>{json.username}</option>;
            /*jshint ignore:end */
        });

        /*jshint ignore:start */
        return (
            <Select label="Owners" description="Person(s) responsible for this listing"
                    dataBinder={dataBinder.simpleBinder(owners)} required multiple data-placeholder="Select a Person">
                {options}
            </Select>
        );
        /*jshint ignore:end */
    },

    getInitialState: function () {
        return {listing: new ListingCortex(this.props.config)};
    },

    componentDidMount: function () {
        var me = this;
        this.state.listing.on('update', function () {
            me.setState({listing: me.state.listing});
        });

        this._$scrollspy = $('body').scrollspy({
            target: '#create-edit-tab-container'
        }).data('bs.scrollspy');
    },

    componentWillUnmount: function () {
        this.state.listing.off('update');
        this._$scrollspy.$scrollElement.off('scroll.bs.scroll-spy.data-api');
        this._$scrollspy.$body.removeData('bs.scrollspy');
    },

    handleSubmit: function () {
        saveListing(this.state.listing.val());
    }

});

module.exports = CreateEditPage;
