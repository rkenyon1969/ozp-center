'use strict';

var React = require('react');
var Reflux = require('reflux');
var Modal = require('../shared/Modal');
var {Content, ActionBar, Section} = require('./partials');
var _ = require('../../utils/_');
var {approvalStatus} = require('../../constants');
var CreateEditStore = require('../../stores/CreateEditStore');
var {loadListing, updateListing, save, submit} = require('../../actions/CreateEditActions');
var {Navigation} = require('react-router');
var {ItemFormMixin, ListInput, TextInput, Select2Input, Select2TagInput, TextAreaInput} = require('../form');

function getOptionsForSystemObject (items) {
    return items.map(
        /*jshint ignore:start */
        (item, i) => <option key={i} value={item.title}>{item.title}</option>
        /*jshint ignore:end */
    );
}

module.exports = React.createClass({

    mixins: [Reflux.connect(CreateEditStore), Navigation],

    getInitialState: function () {
        return {saved: false};
    },

    render: function () {
        var system = this.state && this.state.system;
        var listing = this.state && this.state.listing;

        if (!(listing && system)) {
            /* jshint ignore:start */
            return (
                <Modal ref="modal" className="CreateEdit__modal" onHidden={this.onHidden}>
                    <p>loading...</p>
                </Modal>
            );
            /* jshint ignore:end */
        }

        var listingProps = {
            requestChange: this.onChange,
            item: listing,
            errors: this.state.errors,
            warnings: this.state.warnings,
            messages: this.state.messages,
            forceError: this.state.validationFailed,
            system: system
        };

        var {IN_PROGRESS, REJECTED} = approvalStatus;
        var showSubmit = [IN_PROGRESS, REJECTED].some(s => s === approvalStatus[listing.approvalStatus]);

        var savedText = this.state.saved ? 'Saved' : 'Save';

        /* jshint ignore:start */
        var controls = (
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-default" onClick={this.onSave}>{savedText}</button>
                {showSubmit && this.renderSubmit()}
                <button type="button" className="btn btn-default" onClick={this.onClose}>Close</button>
            </div>
        );

        return (
            <Modal ref="modal" className="CreateEdit__modal" onHidden={this.onHidden}>
                <ListingForm {...listingProps} controls={controls} />
            </Modal>
        );
        /* jshint ignore:end */
    },

    componentWillMount: function () {
        loadListing(this.props.listingId);
    },

    componentWillReceiveProps: function (newProps) {
        var oldId = this.props.listingId,
            newId = newProps.listingId;

        if (oldId && oldId !== newId) {
            this.setState(this.getInitialState());
            loadListing(newId);
        }

        if (newProps.validationFailed) {
            this.setState({saved: false});
        }
    },

    onClose: function () {
        this.refs.modal.close();
    },

    onSave: function () {
        save();
        this.setState({saved: true});
    },

    onChange: function () {
        updateListing.apply(null, arguments);
        this.setState({saved: false});
    },

    onHidden: function () {
        this.goBack();
    },
});

var ListingForm = React.createClass({
    mixins: [ItemFormMixin],

    render: function () {
        var item = this.props.item;
        var system = this.props.system;

        var owners = item.owners;
        var ownersValueLink = {
            value: owners && owners.map(o => o.username) || [],
            requestChange: usernames => {
                this.props.requestChange(['owners'], usernames.map(
                    u => { return {username: u};})
                );
            }
        };

        var p = this.getProps;
        /*jshint ignore:start */
        return (
            <div className="CreateEdit__form">
                <h2>Basic Listing Information</h2>
                <TextInput {...p('title')} />
                <Select2Input {...p('type')}>
                    {getOptionsForSystemObject(system.types)}
                </Select2Input>
                <Select2Input {...p('categories')} multiple>
                    {getOptionsForSystemObject(system.categories)}
                </Select2Input>
                <Select2TagInput {...p('tags')} multiple optional />
                <TextAreaInput {...p('description')} rows="6" />
                <TextAreaInput {...p('descriptionShort')} rows="3" />

                <h2>Listing Details</h2>
                <TextInput {...p('versionName')} />
                <TextInput {...p('launchUrl')} />
                <TextAreaInput {...p('requirements')} rows="5" />
                <TextAreaInput {...p('whatIsNew')} rows="3" />
                <Select2Input {...p('intents')}  multiple>
                    {this.getIntents()}
                </Select2Input>
                <ListInput {...this.getSubFormProps('docUrls')} itemForm={ResourceForm} optional />

                <h2>Graphics</h2>
                <TextInput {...p('imageXlargeUrl')} />
                <TextInput {...p('imageLargeUrl')} />
                <TextInput {...p('imageMediumUrl')} />
                <TextInput {...p('imageSmallUrl')} />
                <ListInput {...this.getSubFormProps('screenshots')} itemForm={ScreenshotForm} />

                <h2>Owner Information</h2>
                <Select2Input {...p('agency')}>
                    {getOptionsForSystemObject(system.organizations)}
                </Select2Input>
                <Select2Input {...p('owners')} valueLink={ownersValueLink} multiple>
                    {this.getUsers()}
                </Select2Input>
                <ListInput {...this.getSubFormProps('contacts')} itemForm={ContactForm} />
                {this.props.controls}
            </div>
        );
        /*jshint ignore:end */
    },

    renderSubmit: function () {
        /*jshint ignore:start */
        return <button className="btn btn-default" onClick={submit}>Submit</button>;
        /*jshint ignore:end */
    },

    getIntents: function () {
        return this.props.system.intents.map((o, i) => {
            var intent = o.type + '/' + o.action;
            /*jshint ignore:start */
            return <option key={i} value={intent}>{intent}</option>;
            /*jshint ignore:end */
        });
    },

    getUsers: function () {
        return this.props.system.users.map(
            /*jshint ignore:start */
            (o, i) => <option key={i} value={o.username}>{o.username}</option>
            /*jshint ignore:end */
        );
    }
});

var ResourceForm = React.createClass({
    mixins: [ItemFormMixin],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput {...this.getProps('name')} />
                <TextInput {...this.getProps('url')} />
            </div>
        );
        /*jshint ignore: end */
    }
});

var ScreenshotForm = React.createClass({
    mixins: [ItemFormMixin],

    render: function () {
        /*jshint ignore: start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <TextInput {...this.getProps('smallImageUrl')} />
                <TextInput {...this.getProps('largeImageUrl')} />
            </div>
        );
        /*jshint ignore: end */
    }
});

var ContactForm = React.createClass({
    mixins: [ItemFormMixin],

    render: function () {
        /*jshint ignore:start */
        return (
            <div className="well">
                <button type="button" className="close" onClick={this.props.removeHandler}>
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
                <Select2Input {...this.getProps('type')}>
                    {getOptionsForSystemObject(this.props.system.contactTypes)}
                </Select2Input>
                <TextInput {...this.getProps('name')} />
                <TextInput {...this.getProps('organization')} optional />
                <TextInput {...this.getProps('email')} />
                <TextInput {...this.getProps('securePhone')} />
                <TextInput {...this.getProps('unsecurePhone')} />
            </div>
        );
        /*jshint ignore:end */
    }
});
