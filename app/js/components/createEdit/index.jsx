'use strict';

var React = require('react');
var Reflux = require('reflux');
var Modal = require('ozp-react-commons/components/Modal.jsx');
var LoadMask = require('../LoadMask.jsx');
var { pick, assign } = require('../../utils/_');
var { approvalStatus } = require('ozp-react-commons/constants');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var { loadListing, updateListing, save, submit } = require('../../actions/CreateEditActions');
var { Navigation } = require('react-router');

var NavBar = require('../NavBar/index.jsx');
var Header = require('../header/index.jsx');
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
    TextAreaInput
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

        var owners = (listing.owners || []).map(o => o.username);
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
                <Select2Input { ...p('owners') } value={ owners } setter={ ownerSetter } multiple options={
                    this.props.system.users.map(u => {
                        return { id: u.username, text: u.username };
                    })
                }/>
                <ListInput { ...this.getSubFormProps('contacts') } itemForm={ ContactForm }/>
            </form>
        );
    }
});

var CreateEditPage = React.createClass({

    mixins: [ Reflux.connect(CurrentListingStore), Navigation, State ],

    statics: {
        willTransitionTo: function (transition, params) {
            transition.wait(CurrentListingStore.loadListing(params.listingId).then(listing => {
                if (!CurrentListingStore.currentUserCanEdit(listing)) {
                    transition.redirect('my-listings');
                }
            }));
        },

        willTransitionFrom: function (transition, component) {
            if (component.state.hasChanges) {
                if(!window.confirm('You have unsaved information, are you sure you want to leave this page?')) {
                    var path = component.props.params.listingId ? '#/edit/' + component.props.params.listingId : '#/edit';
                    document.location.replace(path);
                    transition.abort(); //TODO: this throws a console warning about calling setState with null
                }
            }
        }
    },

    getInitialState: function () {
        return {
            scrollToError: false,
            imageErrors: {screenshots: []}
        };
    },

    render: function () {
        var listing = this.state.listing;

        if (!listing) {
            return <p>loading...</p>;
        }

        var showSave = () => this.state.hasChanges || !listing.id;

        var saveBtnClasses = {
            'btn': true,
            'tool': true,
            'btn-success': !showSave(),
            'btn-danger': showSave()
        };

        var status = approvalStatus[listing.approvalStatus];
        var { IN_PROGRESS, REJECTED } = approvalStatus;
        var showSubmit = [IN_PROGRESS, REJECTED].some(s => s === status);
        var showPreview = !!listing.id;
        var titleText = (this.getParams().listingId ? 'Edit ' : 'Create New ') + 'Listing';
        var saveText = showSave() ? 'fa fa-save' : 'icon-check';
        var savingText = savingMessages[this.state.saveStatus];

        var formProps = assign({},
            pick(this.state, ['errors', 'warnings', 'messages', 'firstError']),
            { system: this.props.system, value: listing, requestChange: updateListing,
                forceError: !this.state.isValid, currentUser: this.props.currentUser,
                imageErrors: this.state.imageErrors
            }
        );

        var subHeader = (
            <div className="CreateEdit__titlebar row">
                <h1>{titleText}</h1>
                <div className="alert alert-info alert-small" role="alert">All fields are required unless marked as “optional.”</div>
                <div className="btn-toolbar" role="group">
                    <div className="btn-group" role="group">
                      <button type="button" className={ classSet(saveBtnClasses) } onClick={ this.onSave }><i className={saveText}></i></button>
                      { showPreview && <button className="btn btn-default tool" onClick={ this.onPreview }><i className="icon-eye"> </i></button> }
                      { showSubmit && <button className="btn btn-default tool" onClick={ this.onSubmit }><i className="icon-cloud-upload"> </i></button> }
                        </div>
                    <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" onClick={this.onClose}><i className="icon-layers"> </i> </button>
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
            </div>
        );
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }
    },

    onSave: function () {
        save();
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
        submit();
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
    }
});

module.exports = CreateEditPage;
