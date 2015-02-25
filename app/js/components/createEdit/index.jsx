'use strict';

var React = require('react');
var Reflux = require('reflux');
var LoadMask = require('../LoadMask.jsx');
var { pick, assign } = require('../../utils/_');
var { approvalStatus } = require('ozp-react-commons/constants');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var CreateEditActions = require('../../actions/CreateEditActions');
var { Navigation } = require('react-router');

var NavBar = require('../NavBar/index.jsx');
var Header = require('../header/index.jsx');
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

function getOptionsForSystemObject (items) {
    return items.map(item => {
        return { id: item.title, text: item.title };
    });
}

var ResourceForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        return (
            <div className="well">
                <button type="button" className="close" onClick={ this.props.removeHandler }>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput { ...this.getFormComponentProps('name') }/>
                <TextInput { ...this.getFormComponentProps('url') }/>
            </div>
        );
    }
});

var ScreenshotForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <ImageInput { ...this.getFormComponentProps('smallImage') }
                    imageUri={this.props.value.smallImageUrl}
                    serverError={this.props.imageErrors.smallImage} />
                <ImageInput { ...this.getFormComponentProps('largeImage') }
                    imageUri={this.props.value.largeImageUrl}
                    serverError={this.props.imageErrors.largeImage} />
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
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
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

var ListingForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        var listing = this.props.value;
        var system = this.props.system;

        var ownerSetter = usernames => {
            this.props.requestChange(['owners'], usernames.map(u => {
                return { username: u };
            }));
        };

        var p = this.getFormComponentProps;
        return (
            <form className="CreateEdit__form">
                <h2>Basic Listing Information</h2>
                <TextInput { ...p('title') }/>
                <Select2Input { ...p('type') } options={ getOptionsForSystemObject(system.types) }/>
                <Select2Input { ...p('categories') } multiple options={ getOptionsForSystemObject(system.categories) }/>
                <Select2TagInput { ...p('tags') } multiple/>
                <TextAreaInput { ...p('description') } rows="6"/>
                <TextAreaInput { ...p('descriptionShort') } rows="3"/>

                <h2>Listing Details</h2>
                <TextInput { ...p('versionName') }/>
                <TextInput { ...p('launchUrl') }/>
                <TextAreaInput { ...p('requirements') } rows="5"/>
                <TextAreaInput { ...p('whatIsNew') } rows="3" optional/>
                <Select2Input { ...p('intents') }  multiple options={
                    this.props.system.intents.map(intent => {
                        var val = intent.type + '/' + intent.action;
                        return { id: val, text: val };
                    })
                }/>
                <ListInput { ...this.getSubFormProps('docUrls') } itemForm={ ResourceForm } optional/>

                <h2>Graphics</h2>
                <ImageInput { ...p('smallIcon') }
                    imageUri={this.props.value.imageSmallUrl}
                    serverError={this.props.imageErrors.smallIcon} />
                <ImageInput { ...p('largeIcon') }
                    imageUri={this.props.value.imageMediumUrl}
                    serverError={this.props.imageErrors.largeIcon} />
                <ImageInput { ...p('bannerIcon') }
                    imageUri={this.props.value.imageLargeUrl}
                    serverError={this.props.imageErrors.bannerIcon} />
                <ImageInput { ...p('featuredBannerIcon') }
                    imageUri={this.props.value.imageXlargeUrl}
                    serverError={this.props.imageErrors.featuredBannerIcon} />

                <ListInput { ...this.getSubFormProps('screenshots') } itemForm={ ScreenshotForm }/>

                <h2>Owner Information and Contacts</h2>
                <Select2Input { ...p('agency') } options={ getOptionsForSystemObject(system.organizations) }/>
                <OwnerInput { ...p('owners') } listing={listing} ownerSetter={ownerSetter} />
                <ListInput { ...this.getSubFormProps('contacts') } itemForm={ ContactForm }/>
            </form>
        );
    }
});

var transitionToMyListings = (transition) => {
    transition.redirect('my-listings');
};

var CreateEditPage = React.createClass({

    mixins: [ Reflux.connect(CurrentListingStore), Navigation, State ],

    statics: {
        PATH: /\/edit\/\d+/,

        willTransitionTo: function (transition, params) {
            var loadListing = CurrentListingStore.loadListing(params.listingId)
                .done((listing) => {
                    if (!CurrentListingStore.currentUserCanEdit(listing)) {
                        transitionToMyListings(transition);
                    }
                })
                .fail(() => transitionToMyListings(transition));

            transition.wait(loadListing);
        },

        willTransitionFrom: function (transition, component) {
            // display warning if moving away from the create path
            if (!this.PATH.test(transition.path) && component.state && component.state.hasChanges) {
                if(window.confirm('You have unsaved information, are you sure you want to leave this page?')) {
                    CreateEditActions.discard(component.state.listing);
                }
                else {
                    transition.abort();
                }
            }
        }
    },

    getInitialState: function () {
        return {
            listing: null,
            hasChanges: false,
            scrollToError: false,
            imageErrors: {screenshots: []},
            showStewards: false
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
        this.transitionTo('edit', { listingId: id }, { listing: id, action: 'preview', tab: 'overview' });
    },

    onSubmit: function () {
        CreateEditActions.submit();
        this.setState({ scrollToError: true });
    },

    scrollToError: function () {
        var $target = $('div.form-group.has-error');
        var $firstFormElement = $(this.refs.form.getDOMNode()).find(':first-child');
        var $scrollable = $('html, body');

        if ($target[0]) {
            var scroll = $target.offset().top - $firstFormElement.offset().top;

            $scrollable.animate({
                scrollTop: scroll
            }, 'medium');

            this.setState({ scrollToError: false });
        }
    },

    showStewardsModal: function() {
        this.setState({ showStewards: true });
    },

    onModalHidden: function () {
        this.setState({ showStewards: false });
    },

    componentDidUpdate: function () {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }
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
        var titleText = (this.getParams().listingId ? 'Edit ' : 'Create New ') + 'Listing';
        var saveText = showSave ? 'fa fa-save' : 'icon-check';
        var savingText = savingMessages[this.state.saveStatus];

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

        var subHeader = (
            <div className="CreateEdit__titlebar row">
                <h1>{titleText}</h1>
                <div className="alert alert-info alert-small" role="alert">All fields are required unless marked as “optional.”</div>
                <div className="btn-toolbar" role="group">
                    <div className="btn-group" role="group">
                      <button type="button" className={ classSet(saveBtnClasses) } onClick={ this.onSave }><span className="create-edit-button">Save</span><i className={saveText}></i></button>
                      { showPreview && <button className="btn btn-default tool" onClick={ this.onPreview }><span className="create-edit-button">Preview</span><i className="icon-eye"> </i></button> }
                      { showSubmit && <button className="btn btn-default tool" onClick={ this.onSubmit }><span className="create-edit-button">Publish</span><i className="icon-cloud-upload"> </i></button> }
                        </div>
                    <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" onClick={this.onClose}><span className="create-edit-button">Back</span><i className="icon-layers"> </i> </button>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <NavBar />
                <Header subHeader={subHeader} />
                <ListingForm ref="form" { ...formProps } />
                { savingText && <LoadMask message={savingText} /> }
                { this.state.showStewards && <OrgStewardModal onHidden={ this.onModalHidden } /> }
            </div>
        );
    }
});

module.exports = CreateEditPage;
