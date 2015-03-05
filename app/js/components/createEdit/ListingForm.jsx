'use strict';

var React = require('react');
var _ = require('../../utils/_');

var State = require('../../mixins/ActiveStateMixin');

var ResourceForm = require('./ResourceForm.jsx');
var ScreenshotForm = require('./ScreenshotForm.jsx');
var ContactForm = require('./ContactForm.jsx');
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


var ListingForm = React.createClass({
    mixins: [ ValidatedFormMixin, State ],

    getInitialState: () => ({ currentNavTarget: undefined }),

    render: function () {
        var listing = this.props.value;
        var system = this.props.system;

        var ownerSetter = usernames => {
            this.props.requestChange(['owners'], usernames.map(u => {
                return { username: u };
            }));
        };

        var p = this.getFormComponentProps;
        var f = this.props.formLinks;
        return (
            <form className="CreateEdit__form">
                <a id={f.basicInformation.id} />
                <TextInput id={f.title.id} { ...p('title') }/>
                <Select2Input id={f.type.id} { ...p('type') }
                    options={ this.getOptionsForSystemObject(system.types) }/>
                <Select2Input id={f.categories.id} { ...p('categories') } multiple
                    options={ this.getOptionsForSystemObject(system.categories) }/>
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
                <ListInput id={f.resources.id} { ...this.getSubFormProps('docUrls') }
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
                    options={ this.getOptionsForSystemObject(system.organizations) }/>
                <OwnerInput id={f.owners.id} { ...p('owners') } listing={listing}
                    ownerSetter={ownerSetter} />
                <ListInput id={f.contacts.id} { ...this.getSubFormProps('contacts') }
                    itemForm={ ContactForm }/>
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
        var elId = this.state.currentNavTarget;

        if (prevState.currentNavTarget !== elId) {
            var element = $(`#${elId || this.props.formLinks.basicInformation.id}`),
                form = $(this.getDOMNode()),
                firstFormChild = form.find(':first-child');

            if (element) {
                var elementOffset = element.offset().top,
                    formOffset = firstFormChild.offset().top;

                form.animate({
                    scrollTop: elementOffset - formOffset
                });
            }
        }
    }
});

module.exports = ListingForm;
