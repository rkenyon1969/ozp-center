'use strict';

var React = require('react');
var { ValidatedFormMixin, ImageInput } = require('./form');

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

module.exports = ScreenshotForm;
