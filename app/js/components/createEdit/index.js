'use strict';

var React = require('react');
var Reflux = require('reflux');
var Modal = require('../shared/Modal');
var _ = require('../../utils/_');
var {approvalStatus} = require('../../constants');
var CreateEditStore = require('../../stores/CreateEditStore');
var SystemStore = require('../../stores/SystemStore');
var {loadListing, updateListing, save, submit} = require('../../actions/CreateEditActions');
var {Navigation} = require('react-router');
var Header = require('../header');
var {ValidatedFormMixin, ListInput, TextInput, Select2Input, Select2TagInput, TextAreaInput} = require('../form');
var classSet = React.addons.classSet;
var $ = require('jquery');

function getOptionsForSystemObject (items) {
    return items.map(item => {
        return {id: item.title, text: item.title};
    });
}

var CreateEditPage = React.createClass({

    mixins: [Reflux.connect(CreateEditStore), Navigation],

    getInitialState: function () {
        return {scrollToError: false, hasChanges: this.props.params.listingId ? false : true};
    },

    render: function () {
        var listing = this.state.listing;

        if (!listing) {
            /* jshint ignore:start */
            return <p>Loading...</p>;
            /* jshint ignore:end */
        }

        var listingProps = {
            requestChange: updateListing,
            value: listing,
            errors: this.state.errors,
            warnings: this.state.warnings,
            messages: this.state.messages,
            forceError: this.state.validationFailed
        };

        var saveBtnClasses = {
            'btn': true,
            'btn-success': !this.state.hasChanges,
            'btn-warning': this.state.hasChanges
        };

        var {IN_PROGRESS, REJECTED} = approvalStatus;
        var showSubmit = [IN_PROGRESS, REJECTED].some(s => s === approvalStatus[listing.approvalStatus]);

        var saveText = this.state.hasChanges ? 'Save' : 'Saved';

        /* jshint ignore:start */
        return (
            <div>
                <Header />
                <div className="CreateEdit__titlebar">
                    <h1>Create New Listing</h1>
                    <div className="btn-group" role="group">
                        <button type="button" className={classSet(saveBtnClasses)} onClick={this.onSave}>{saveText}</button>
                        {showSubmit && <button className="btn btn-default" onClick={this.onSubmit}>Submit</button>}
                        <button type="button" className="btn btn-default" onClick={this.onClose}>Done</button>
                    </div>
                </div>
                <ListingForm ref="form" {...listingProps} />
            </div>
        );
        /* jshint ignore:end */
    },

    renderSubmit: function () {
        /*jshint ignore:start */
        return <button className="btn btn-default" onClick={this.onSubmit}>Submit</button>;
        /*jshint ignore:end */
    },

    componentWillMount: function () {
        loadListing(this.props.params.listingId);
    },

    componentDidUpdate: function () {
        if (this.state.scrollToError && !this.state.isValid) {
            this.scrollToError(this.state.firstError);
        }
    },

    componentWillReceiveProps: function (newProps) {
        var oldId = this.props.params.listingId,
            newId = newProps.params.listingId;

        if (oldId !== newId) {
            this.setState(this.getInitialState());
            loadListing(newId);
        }
    },

    onSave: function () {
        save();
        this.setState({scrollToError: true});
    },

    onSubmit: function () {
        submit();
        this.setState({scrollToError: true});
    },

    onClose: function () {
        if (this.state.hasChanges) {
            if(window.confirm('You have unsaved information, are you sure you want to leave this page?')) {
                this.transitionTo('my-listings');
            }
        } else {
            this.transitionTo('my-listings');
        }
    },

    scrollToError: function (path) {
        var $target = $(document.getElementById('createEdit.' + path));
        var $firstFormElement = $(this.refs.form.getDOMNode()).find(':first-child');
        var $scrollable = $('html, body');

        if ($target) {
            var scroll = $scrollable.scrollTop() + $target.offset().top - $firstFormElement.offset().top;

            $scrollable.animate({
                scrollTop: scroll
            }, 'medium');

            this.setState({scrollToError: false});
        }
    }
});

var ListingForm = React.createClass({
    mixins: [ValidatedFormMixin, Reflux.connect(SystemStore)],

    getInitialState: function () {
        return {};
    },

    render: function () {
        var listing = this.props.value;
        var system = this.state.system;

        if(!system) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }

        var owners = (listing.owners || []).map(o => o.username);
        var ownerSetter = usernames => {
            this.props.requestChange(['owners'], usernames.map(u => {
                return {username: u};
            }));
        };

        // var users = this.state.system.users.map(u => {
        //     return {id: u.username, text: u.username};
        // });

        var p = this.getFormComponentProps;
        /*jshint ignore:start */
        return (
            <form className="CreateEdit__form">
                <h2>Basic Listing Information</h2>
                <TextInput {...p('title')}/>
                <Select2Input {...p('type')} options={getOptionsForSystemObject(system.types)}/>
                <Select2Input {...p('categories')} multiple options={getOptionsForSystemObject(system.categories)}/>
                <Select2TagInput {...p('tags')} multiple/>
                <TextAreaInput {...p('description')} rows="6"/>
                <TextAreaInput {...p('descriptionShort')} rows="3"/>

                <h2>Listing Details</h2>
                <TextInput {...p('versionName')}/>
                <TextInput {...p('launchUrl')}/>
                <TextAreaInput {...p('requirements')} rows="5"/>
                <TextAreaInput {...p('whatIsNew')} rows="3" optional/>
                <Select2Input {...p('intents')}  multiple options={
                    this.state.system.intents.map(intent => {
                        var val = intent.type + '/' + intent.action;
                        return {id: val, text: val};
                    })
                }/>
                <ListInput {...this.getSubFormProps('docUrls')} itemForm={ResourceForm} optional/>

                <h2>Graphics</h2>
                <TextInput {...p('imageXlargeUrl')} />
                <TextInput {...p('imageLargeUrl')} />
                <TextInput {...p('imageMediumUrl')} />
                <TextInput {...p('imageSmallUrl')} />
                <ListInput {...this.getSubFormProps('screenshots')} itemForm={ScreenshotForm}/>

                <h2>Owner Information and Contacts</h2>
                <Select2Input {...p('agency')} options={getOptionsForSystemObject(system.organizations)}/>
                <Select2Input {...p('owners')} value={owners} setter={ownerSetter} multiple options={
                    this.state.system.users.map(u => {
                        return {id: u.username, text: u.username};
                    })
                }/>
                <ListInput {...this.getSubFormProps('contacts')} itemForm={ContactForm}/>
            </form>
        );
        /*jshint ignore:end */
    }
});

var ResourceForm = React.createClass({
    mixins: [ValidatedFormMixin],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput {...this.getFormComponentProps('name')}/>
                <TextInput {...this.getFormComponentProps('url')}/>
            </div>
        );
        /*jshint ignore: end */
    }
});

var ScreenshotForm = React.createClass({
    mixins: [ValidatedFormMixin],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput {...this.getFormComponentProps('smallImageUrl')}/>
                <TextInput {...this.getFormComponentProps('largeImageUrl')}/>
            </div>
        );
        /*jshint ignore: end */
    }
});

var ContactForm = React.createClass({
    mixins: [Reflux.connect(SystemStore), ValidatedFormMixin],

    getInitialState: function () {
        return {};
    },
    
    render: function () {
        if (!this.state.system) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }

        /*jshint ignore:start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <Select2Input {...this.getFormComponentProps('type')} options={getOptionsForSystemObject(this.state.system.contactTypes)}/>
                <TextInput {...this.getFormComponentProps('name')}/>
                <TextInput {...this.getFormComponentProps('organization')} optional/>
                <TextInput {...this.getFormComponentProps('email')}/>
                <TextInput {...this.getFormComponentProps('securePhone')}/>
                <TextInput {...this.getFormComponentProps('unsecurePhone')}/>
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = CreateEditPage;
