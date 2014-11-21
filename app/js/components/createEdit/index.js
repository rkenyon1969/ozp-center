'use strict';

var React = require('react');
var Reflux = require('reflux');
var Modal = require('../shared/Modal');
var { pick, assign } = require('../../utils/_');
var { approvalStatus } = require('../../constants');
var CurrentListingStateMixin = require('../../mixins/CurrentListingStateMixin');
var { loadListing, updateListing, save, submit } = require('../../actions/CreateEditActions');
var { Navigation } = require('react-router');
var Header = require('../header');
var { ValidatedFormMixin, ListInput, TextInput, Select2Input, Select2TagInput, TextAreaInput } = require('../form');
var { classSet } = React.addons;
var ActiveState = require('../../mixins/ActiveStateMixin');
var $ = require('jquery');

function getOptionsForSystemObject (items) {
    return items.map(item => {
        return {id: item.title, text: item.title};
    });
}

var CreateEditPage = React.createClass({

    mixins: [ CurrentListingStateMixin, Navigation, ActiveState ],

    getInitialState: function () {
        return { scrollToError: false };
    },

    render: function () {
        var listing = this.state.listing;

        var showSave = () => this.state.hasChanges || !listing.id;

        var saveBtnClasses = {
            'btn': true,
            'btn-success': !showSave(),
            'btn-warning': showSave()
        };

        var status = approvalStatus[listing.approvalStatus];
        var { IN_PROGRESS, REJECTED } = approvalStatus;
        var showSubmit = [IN_PROGRESS, REJECTED].some(s => s === status);
        var showPreview = !!listing.id;

        var saveText = showSave() ? 'Save' : 'Saved';

        var formProps = assign({},
            pick(this.state, ['errors', 'warnings', 'messages', 'firstError']),
            { system: this.props.system, value: listing, requestChange: updateListing, forceError: !this.state.isValid }
        );

        /* jshint ignore:start */
        var subHeader = (
            <div className="CreateEdit__titlebar row">
                <h1>Create New Listing</h1>
                <div className="btn-group" role="group">
                    <button type="button" className={ classSet(saveBtnClasses) } onClick={ this.onSave }>{ saveText }</button>
                    { showSubmit && <button className="btn btn-default" onClick={ this.onSubmit }>Submit</button> }
                    { showPreview && <button className="btn btn-default" onClick={ this.onPreview }>Preview</button> }
                    <button type="button" className="btn btn-default" onClick={ this.onClose }>Close</button>
                </div>
            </div>
        );

        return (
            <div>
                <Header subHeader={subHeader} />
                <ListingForm ref="form" { ...formProps } />
            </div>
        );
        /* jshint ignore:end */
    },

    componentWillMount: function () {
        loadListing(this.props.params.listingId);
    },

    componentWillReceiveProps: function (newProps) {
        var oldId = this.props.params.listingId,
            newId = newProps.params.listingId;

        if (oldId !== newId) {
            this.setState(this.getInitialState());
            loadListing(newId);
        }
    },

    componentDidUpdate: function () {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }
    },

    onSave: function () {
        save();
        this.setState({ scrollToError: true });
    },

    onPreview: function () {
        var id = this.state.listing.id;
        this.transitionTo('edit', { listingId: id }, { listing: id, action: 'preview', tab: 'overview' });
    },

    onSubmit: function () {
        submit();
        this.setState({ scrollToError: true });
    },

    onClose: function () {
        if (this.state.hasChanges) {
            if(window.confirm('You have unsaved information, are you sure you want to leave this page?')) {
                loadListing(this.props.params.listingId); //discard changes in the store
                this.transitionTo('my-listings');
            }
        } else {
            this.transitionTo('my-listings');
        }
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
        /*jshint ignore:start */
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
                <TextInput { ...p('imageXlargeUrl') } />
                <TextInput { ...p('imageLargeUrl') } />
                <TextInput { ...p('imageMediumUrl') } />
                <TextInput { ...p('imageSmallUrl') } />
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
        /*jshint ignore:end */
    }
});

var ResourceForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={ this.props.removeHandler }>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput { ...this.getFormComponentProps('name') }/>
                <TextInput { ...this.getFormComponentProps('url') }/>
            </div>
        );
        /*jshint ignore: end */
    }
});

var ScreenshotForm = React.createClass({
    mixins: [ ValidatedFormMixin ],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput { ...this.getFormComponentProps('smallImageUrl') }/>
                <TextInput { ...this.getFormComponentProps('largeImageUrl') }/>
            </div>
        );
        /*jshint ignore: end */
    }
});

var ContactForm = React.createClass({
    mixins: [ require('../../mixins/SystemStateMixin'), ValidatedFormMixin ],

    render: function () {
        /*jshint ignore:start */
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
        /*jshint ignore:end */
    }
});

module.exports = CreateEditPage;
