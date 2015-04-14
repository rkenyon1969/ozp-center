'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_');
var LoadMask = require('../LoadMask.jsx');
var { pick, assign } = require('../../utils/_');
var { approvalStatus } = require('ozp-react-commons/constants');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var CreateEditActions = require('../../actions/CreateEditActions');
var { Navigation } = require('react-router');

var NavBar = require('../NavBar/index.jsx');
var Sidebar = require('./Sidebar.jsx');
var OrgStewardModal = require('./OrgStewardModal.jsx');
var { classSet } = React.addons;
var State = require('../../mixins/ActiveStateMixin');
var $ = require('jquery');

var {
    ValidatedFormMixin,
    ListInput,
    TextInput,
    ImageInput,
    Select2Input,
    Select2TagInput,
    TextAreaInput,
    OwnerInput
} = require('./form');

var savingMessages = {
    images: 'Uploading Images...',
    listing: 'Saving Listing...'
};

// formLinks object is used by formLinkGroups. formLinks is the config file to
// set up the side navigation panel in the createEdit view.
var formLinks = {
    basicInformation: {
        title: 'Basic Information',
        id: 'create-edit-basic-information'
    },
    title: {
        title: 'Name',
        id: 'create-edit-name'
    },
    type: {
        title: 'Listing Type',
        id: 'create-edit-type'
    },
    categories: {
        title: 'Categories',
        id: 'create-edit-categories'
    },
    tags: {
        title: 'Tags',
        id: 'create-edit-tags'
    },
    description: {
        title: 'Full Description',
        id: 'create-edit-full-description'
    },
    descriptionShort: {
        title: 'Short Description',
        id: 'create-edit-short-description'
    },
    listingDetails: {
        title: 'Listing Details',
        id: 'create-edit-listing-details'
    },
    versionNumber: {
        title: 'Version Number',
        id: 'create-edit-version-number'
    },
    launchUrl: {
        title: 'Listing URL',
        id: 'create-edit-listing-url'
    },
    requirements: {
        title: 'Usage Requirements',
        id: 'create-edit-usage-requirements'
    },
    whatsNew: {
        title: "What's New",
        id: 'create-edit-whats-new'
    },
    intents: {
        title: 'Intents',
        id: 'create-edit-intents'
    },
    resources: {
        title: 'Resources',
        id: 'create-edit-resources'
    },
    graphics: {
        title: 'Graphics',
        id: 'create-edit-graphics'
    },
    smallIcon: {
        title: 'Small Icon',
        id: 'create-edit-small-icon'
    },
    largeIcon: {
        title: 'Large Icon',
        id: 'create-edit-large-icon'
    },
    bannerIcon: {
        title: 'Small Banner',
        id: 'create-edit-small-banner'
    },
    featuredBannerIcon: {
        title: 'Large Banner',
        id: 'create-edit-large-banner'
    },
    screenshots: {
        title: 'Screenshots',
        id: 'create-edit-screenshots',
    },
    ownersAndContacts: {
        title: 'Owners & Contacts',
        id: 'create-edit-owners-contacts'
    },
    orgs: {
        title: 'Associated Organization',
        id: 'create-edit-orgs'
    },
    owners: {
        title: 'Owners',
        id: 'create-edit-owners'
    },
    contacts: {
        title: 'Contacts',
        id: 'create-edit-contacts'
    }
};


// formLinkGroups splits the formLinks into logical groups, with each link
// being the accordion header and the array of links being the contents of
// the expanded accordion.
var formLinkGroups = [{
    link: formLinks.basicInformation,
    links: [
        formLinks.title,
        formLinks.type,
        formLinks.categories,
        formLinks.tags,
        formLinks.description,
        formLinks.descriptionShort
    ]
}, {
    link: formLinks.listingDetails,
    links: [
        formLinks.versionNumber,
        formLinks.launchUrl,
        formLinks.requirements,
        formLinks.whatsNew,
        formLinks.intents
    ]
}, {
    link: formLinks.resources,
    links: []
}, {
    link: formLinks.graphics,
    links: [
        formLinks.smallIcon,
        formLinks.largeIcon,
        formLinks.bannerIcon,
        formLinks.featuredBannerIcon,
        formLinks.screenshots
    ]
}, {
    link: formLinks.ownersAndContacts,
    links: [
        formLinks.orgs,
        formLinks.owners,
        formLinks.contacts
    ]
}];


//TODO
function getOptionsForSystemObject (items) {
    return items.map(item => {
        return { id: item.title, text: item.title };
    });
}

// On the edit listing page, these are the wells users input the 'Type of Resource' and the resources 'URL'
var ResourceForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        return (
            <div className="well listItemRow">
                <div className="clear"></div>
                <div className="col-md-2">
                <div><strong>Resource<br /> <span className="screenshotNum">{this.props.count+1}</span></strong></div>
                </div>
                <div className="col-md-4">
                <TextInput { ...this.getFormComponentProps('name') }/>
                </div>
                <div className="col-md-4">
                <TextInput { ...this.getFormComponentProps('url') }/>
                </div>
                <div className="col-md-2">
                <button type="button" className="close" onClick={ this.props.removeHandler }>
                    <span aria-hidden="true"><i className="icon-cross-14"></i></span><span className="sr-only">Remove</span>
                </button>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
});

// On the edit listing page, these are the Screenshot wells users input the 'Preview Image' and the 'Full Size Image'
var ScreenshotForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        return (
            <div className="listItemRow">
                <div className="clear"></div>
                <div className="col-md-2">
                <div><strong>Screenshot<br /> <span className="screenshotNum">{this.props.count+1}</span></strong></div>
                </div>
                <div className="col-md-4">
                <ImageInput { ...this.getFormComponentProps('smallImage') }
                    imageUri={this.props.value.smallImageUrl}
                    serverError={this.props.imageErrors.smallImage} />
                </div>
                <div className="col-md-4">
                <ImageInput { ...this.getFormComponentProps('largeImage') }
                    imageUri={this.props.value.largeImageUrl}
                    serverError={this.props.imageErrors.largeImage} />
                </div>
                <div className="col-md-2">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true"><i className="icon-cross-16"></i></span><span className="sr-only">Remove</span>
                </button>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
});

var ContactForm = React.createClass({
    mixins: [ require('../../mixins/SystemStateMixin'), ValidatedFormMixin ],

    render: function () {
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true"><i className="icon-cross-14"></i></span><span className="sr-only">Clear</span>
                </button>
                <Select2Input { ...this.getFormComponentProps('type') } options={ getOptionsForSystemObject(this.state.system.contactTypes) }/>
                <TextInput { ...this.getFormComponentProps('name') }/>
                <TextInput { ...this.getFormComponentProps('organization') } optional/>
                <TextInput { ...this.getFormComponentProps('email') }/>
                <TextInput { ...this.getFormComponentProps('securePhone') }/>
                <TextInput { ...this.getFormComponentProps('unsecurePhone') }/>
            </div>
        );
    }
});

// This is the whole form for all the other createEdit createClass forms
var ListingForm = React.createClass({
    mixins: [ ValidatedFormMixin, State ],

    getInitialState: () => ({ currentNavTarget: null }),

    render: function () {
        var listing = this.props.value;
        var system = this.props.system;

        var ownerSetter = usernames => {
            this.props.requestChange(['owners'], usernames.map(u => {
                return { username: u };
            }));
        };

        var p = this.getFormComponentProps;
        var f = formLinks;
        return (
            <form ref="form" className="CreateEdit__form">
                <h2 id={f.basicInformation.id}>Basic Information</h2>
                <TextInput id={f.title.id} { ...p('title') }/>
                <Select2Input id={f.type.id} { ...p('type') }
                    options={ getOptionsForSystemObject(system.types) }/>
                <Select2Input id={f.categories.id} { ...p('categories') } multiple
                    options={ getOptionsForSystemObject(system.categories) }/>
                <Select2TagInput id={f.tags.id} { ...p('tags') } multiple/>
                <TextAreaInput id={f.description.id} { ...p('description') } rows="6"/>
                <TextAreaInput id={f.descriptionShort.id} { ...p('descriptionShort') } rows="3"/>

                <h2 id={f.listingDetails.id} >Listing Details</h2>
                <TextInput id={f.versionNumber.id} { ...p('versionName') }/>
                <TextInput id={f.launchUrl.id} { ...p('launchUrl') }/>
                <TextAreaInput id={f.requirements.id} { ...p('requirements') } rows="5"/>
                <TextAreaInput id={f.whatsNew.id} { ...p('whatIsNew') } rows="3" optional/>
                <Select2Input id={f.intents.id} { ...p('intents') }  multiple options={
                    this.props.system.intents.map(intent => {
                        var val = intent.type + '/' + intent.action;
                        return { id: val, text: val };
                    })
                }/>
                <h2 id={f.resources.id} > Resources </h2>
                <ListInput { ...this.getSubFormProps('docUrls') }
                    itemForm={ ResourceForm } optional/>

                <h2 id={f.graphics.id}>Graphics</h2>
                <ImageInput id={f.smallIcon.id} { ...p('smallIcon') }
                    imageUri={this.props.value.imageSmallUrl}
                    serverError={this.props.imageErrors.smallIcon} />
                <ImageInput id={f.largeIcon.id} { ...p('largeIcon') }
                    imageUri={this.props.value.imageMediumUrl}
                    serverError={this.props.imageErrors.largeIcon} />
                <ImageInput id={f.bannerIcon.id} { ...p('bannerIcon') }
                    imageUri={this.props.value.imageLargeUrl}
                    serverError={this.props.imageErrors.bannerIcon} />
                <ImageInput id={f.featuredBannerIcon.id} { ...p('featuredBannerIcon') }
                    imageUri={this.props.value.imageXlargeUrl}
                    serverError={this.props.imageErrors.featuredBannerIcon} />

                <ListInput id={f.screenshots.id} { ...this.getSubFormProps('screenshots') }
                    itemForm={ ScreenshotForm }/>

                <h2 id={f.ownersAndContacts.id}>Owner Information and Contacts</h2>
                <Select2Input id={f.orgs.id} { ...p('agency') }
                    options={ getOptionsForSystemObject(system.organizations) }/>
                <OwnerInput id={f.owners.id} { ...p('owners') } listing={listing}
                    ownerSetter={ownerSetter} />
                <ListInput id={f.contacts.id} { ...this.getSubFormProps('contacts') }
                    itemForm={ ContactForm }/>

                <div className="space">&#32;</div>
            </form>
        );
    },

    componentWillReceiveProps: function() {
        this.setState({ currentNavTarget: this.getQuery().el });
    },

    componentDidMount: function() {
        this.setState({ currentNavTarget: this.getQuery().el });
    },

    shouldComponentUpdate: function(newProps, newState) {
        return (!_.isEqual(newProps, this.props) ||
                newState.currentNavTarget !== this.state.currentNavTarget);
    },

    componentDidUpdate: function(prevProps, prevState) {
        var elId = this.state.currentNavTarget || formLinks.basicInformation.id;
        if (elId !== formLinks.basicInformation.id && prevState.currentNavTarget !== elId) {

            var element         = $(`#${elId}`),
                form            = $(this.refs.form.getDOMNode()),
                firstFormChild  = form.find(':first-child');

            if (element) {
                var elementOffset = element.offset().top,
                    formOffset    = firstFormChild.offset().top;

                form.animate({
                    scrollTop: elementOffset - formOffset
                });
            }
        }
    }
});

// This is the reminders side panel
var Reminders = React.createClass({
    getInitialState: () => ({ showStewards: false }),

    render: function() {
        return (
            <section className="reminders">
                <h4>Reminders</h4>
                <p>
                    <strong>Remember to portion-mark your descriptions!</strong>
                    <br/>
                    Listings that are not portion-marked will be rejected.
                </p>
                <p className="questions">
                    <strong>If you have any questions</strong> during the submission process,
                    please contact your organizations steward.
                    <a className="stewards-link" onClick={this.showStewardsModal}>
                        View list of organization stewards
                    </a>
                </p>
                {
                    this.state.showStewards &&
                    <OrgStewardModal onHidden={this.onStewardModalHidden}/>
                }
            </section>
        );
    },

    showStewardsModal: function() {
        this.setState({ showStewards: true });
    },

    onStewardModalHidden: function() {
        this.setState({ showStewards: false });
    }
});

function transitionToMyListings (transition) {
    transition.redirect('my-listings');
}

var CreateEditPage = React.createClass({

    mixins: [ Reflux.connect(CurrentListingStore), Navigation, State ],

    statics: {
        UNSAVED_MESSAGE: 'You have unsaved information, are you sure you want to leave this page?',

        willTransitionTo: function (transition, params, query, callback) {

            var listingId = params.listingId || query.listing;
            listingId = listingId === undefined ? undefined : parseInt(listingId, 10);
            var loadedListing = CurrentListingStore.getDefaultData().listing;
            var myListingsTransition = transitionToMyListings.bind(null, transition);

            function checkPermission() {
                CurrentListingStore.currentUserCanEdit() ?
                    callback() :
                    myListingsTransition();
            }

            if (loadedListing && loadedListing.id === listingId) {
                checkPermission();
            }
            else {
                CurrentListingStore.loadListing(listingId)
                    .done(checkPermission)
                    .fail(myListingsTransition);
            }
        },

        willTransitionFrom: function (transition, component) {
            var stripQuery = path => path.replace(/\?.*/, ''),
                currentPathBase = stripQuery(component.getPath()),
                newPathBase = stripQuery(transition.path);
            var { state } = component;

            // if we are actually moving away from this page, and we have changes
            if (newPathBase.indexOf(currentPathBase) !== 0 && state && state.hasChanges) {
                window.confirm(CreateEditPage.UNSAVED_MESSAGE) ?
                    CreateEditActions.discard() :
                    transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            listing: null,
            activeId: null,
            hasChanges: false,
            scrollToError: false,
            imageErrors: {screenshots: []}
        };
    },

    onSave: function () {
        CreateEditActions.save();
        this.setState({ scrollToError: true });
    },

    onClose: function () {
        this.transitionTo('my-listings');
    },

    onPreview: function () {
        var id = this.state.listing.id;
        this.transitionTo('edit', { listingId: id }, {
            listing: id,
            action: 'preview',
            tab: 'overview'
        });
    },

    onSubmit: function () {
        CreateEditActions.submit();
        this.setState({ scrollToError: true });
    },

    scrollToError: function () {
        var $target = $('div.form-group.has-error');
        var form = $(this.refs.form.getDOMNode());
        var $firstFormElement = form.find(':first-child');

        if ($target[0]) {
            var scroll = $target.offset().top - $firstFormElement.offset().top;

            form.animate({
                scrollTop: scroll
            }, 'medium');

            this.setState({ scrollToError: false });
        }
    },

    handleFormScroll: function(){
        var that                = this,
            form                = $(this.refs.form.getDOMNode()),
            lastScrolledPast    = null, // Track this so we don't update state unessisarly
            buffer              = 35.01; // Just past the set value for a click

        form.children('h2').each(function() {
            if ($(this).offset().top < (form.offset().top + buffer)){
                lastScrolledPast = $(this).context;
            }
        });

        if(!that.state.activeId){
            that.setState({activeId: formLinks.basicInformation.id});
        }

        if(lastScrolledPast.id !== that.state.activeId){
            that.setState({activeId: lastScrolledPast.id});
        }
    },

    componentDidUpdate: function () {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }

        var that = this,
            scrollTimer;

        // Let's setup a timer so we don't check scroll more often than nessisary.
        // 20ms Seems to be a good mix between responsiveness and performance
        // requestAnimationFrame may also be a future option. Will come back to after
        // testing has been done.
        $(this.refs.form.getDOMNode()).on('scroll', function(){
            if (scrollTimer) { clearTimeout(scrollTimer); }
            scrollTimer = setTimeout(function() {
               that.handleFormScroll();
           }, 20);
        });
    },

    //HACK: need different height/overflow styling on the parent elements of this page,
    //in order to get the form to be the only scrollable element
    componentDidMount: function () {
        var main = $('#main');
        main.addClass('create-edit-open');
    },

    componentWillUnmount: function () {
        var main = $('#main');
        main.removeClass('create-edit-open');
    },

    render: function () {
        var listing = this.state.listing;

        if (!listing) {
            return <p>loading...</p>;
        }

        var showSave = this.state.hasChanges || !listing.id;

        var saveBtnClasses = {
            'btn': true,
            'tool': true,
            'btn-success': !showSave,
            'btn-danger': showSave
        };

        var status = approvalStatus[listing.approvalStatus];
        var { IN_PROGRESS, REJECTED } = approvalStatus;
        var showSubmit = [IN_PROGRESS, REJECTED].some(s => s === status);
        var showPreview = !!listing.id;
        var showDelete = !!listing.id;
        var titleText = (this.getParams().listingId ? 'Edit ' : 'Create New ') + 'Listing';
        var saveText = showSave ? 'icon-save-white' : 'icon-check-white';
        var savingText = savingMessages[this.state.saveStatus];
        var idString = listing ? listing.id ? listing.id.toString() : '' : '';

        var formProps = assign({},
            pick(this.state, ['errors', 'warnings', 'messages', 'firstError']),
            {
                system: this.props.system,
                value: listing,
                requestChange: CreateEditActions.updateListing,
                forceError: !this.state.isValid,
                currentUser: this.props.currentUser,
                imageErrors: this.state.imageErrors
            }
        );

        var deleteHref = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
            listing: listing.id,
            action: 'delete'
        });

        var header = (
            <div className="CreateEdit__titlebar">
                <h1>{titleText}</h1>
                <div className="sub-header">
                    <span className="alert alert-info alert-small" role="alert">
                        All fields are required unless marked as “optional.”
                    </span>
                    <div className="btn-toolbar" role="group">
                        <div className="btn-group" role="group">
                            <button type="button" className={ classSet(saveBtnClasses) }
                                    onClick={ this.onSave }>
                                <span className="create-edit-button">Save</span>
                                <i className={saveText}></i>
                            </button>
                            {
                                showPreview &&
                                <button className="btn btn-default tool"
                                        onClick={ this.onPreview }>
                                    <span className="create-edit-button">Preview</span>
                                    <i className="icon-eye-grayDark"> </i>
                                </button>
                            }
                            {
                                showDelete &&
                                <a href={deleteHref} className="btn btn-default tool delete-button">
                                    <span className="create-edit-button">Delete</span>
                                    <i className="icon-trash-grayDark"></i>
                                </a>
                            }
                            {
                                showSubmit &&
                                <button className="btn btn-default tool"
                                        onClick={ this.onSubmit }>
                                    <span className="create-edit-button">Submit</span>
                                    <i className="icon-cloud-upload-grayDark"> </i>
                                </button>
                            }
                            </div>
                        <div className="btn-group" role="group">
                            <a type="button" className="btn-link btn myListings" onClick={this.onClose}>
                                    Listing Management
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );

        var makeFormLink = elId => `#/edit/${idString}?el=${encodeURIComponent(elId)}`;

        var links = formLinkGroups.map(function(g) {
                var link = g.link;

                return {
                    title: link.title,
                    id: link.id,
                    href: makeFormLink(link.id),
                    links: g.links.map(l => ({
                        title: l.title,
                        id: l.id,
                        href: makeFormLink(l.id)
                    }))
                };
            });

        return (
            <div className="create-edit">
                <NavBar />
                {header}
                <section className="create-edit-body">
                    <Sidebar groups={links} activeId={this.state.activeId || this.getQuery().el}/>
                    <ListingForm ref="form" { ...formProps } />
                    <Reminders />
                </section>
                { savingText && <LoadMask message={savingText} /> }
            </div>
        );
    }
});

module.exports = CreateEditPage;
