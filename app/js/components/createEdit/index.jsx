'use strict';

var React = require('react');
var Reflux = require('reflux');
var LoadMask = require('../LoadMask.jsx');
var { pick, assign } = require('../../utils/_');
var { approvalStatus } = require('ozp-react-commons/constants');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var CreateEditActions = require('../../actions/CreateEditActions');
var { Navigation } = require('react-router');
var State = require('../../mixins/ActiveStateMixin');

var Reminders = require('./Reminders.jsx');
var NavBar = require('../NavBar/index.jsx');
var Sidebar = require('./Sidebar.jsx');
var ListingForm = require('./ListingForm.jsx');
var { classSet } = React.addons;
var $ = require('jquery');

var savingMessages = {
    images: 'Uploading Images...',
    listing: 'Saving Listing...'
};

//description of links for the sidebar
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
        id: 'create-edit-screenshots'
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
            var stripQuery = path => path.replace(/\/?\?.*/, ''),
                currentPathBase = stripQuery(component.getPath()),
                newPathBase = stripQuery(transition.path),
                { state } = component;

            // if we are actually moving away from this page, and we have changes
            if (newPathBase.indexOf(currentPathBase) !== 0 && state && state.hasChanges) {
                window.confirm(CreateEditPage.UNSAVED_MESSAGE) ?
                    CreateEditActions.discard() :
                    transition.redirect(component.getPath(), component.getParams(), component.getQuery());
            }
        }
    },

    getInitialState: function () {
        return {
            listing: null,
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

    componentDidUpdate: function () {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }
    },

    //HACK: need different height/overflow styling on the parent elements of this page,
    //in order to get the form to be the only scrollable element
    componentWillMount: function () {
        var main = $('#main');

        main.addClass('create-edit-open');
    },

    componentDidUnmount: function () {
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
        var saveText = showSave ? 'fa fa-save' : 'icon-check';
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
                imageErrors: this.state.imageErrors,
                formLinks: formLinks
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
                    <strong className="alert alert-info alert-small" role="alert">
                        All fields are required unless marked as “optional.”
                    </strong>
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
                                    <i className="icon-eye"> </i>
                                </button>
                            }
                            {
                                showSubmit &&
                                <button className="btn btn-default tool"
                                        onClick={ this.onSubmit }>
                                    <span className="create-edit-button">Publish</span>
                                    <i className="icon-cloud-upload"> </i>
                                </button>
                            }
                            {
                                showDelete &&
                                <a href={deleteHref} className="btn btn-default tool delete-button">
                                    <span className="create-edit-button">Delete</span>
                                    <span className="fa fa-trash-o"></span>
                                </a>
                            }
                            </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-default"
                                    onClick={this.onClose}>
                                <span className="create-edit-button">Back</span>
                                <i className="icon-layers"> </i>
                            </button>
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
                    <Sidebar groups={links} activeId={this.getQuery().el}/>
                    <ListingForm ref="form" { ...formProps } />
                    <Reminders />
                </section>
                { savingText && <LoadMask message={savingText} /> }
            </div>
        );
    }
});

module.exports = CreateEditPage;
