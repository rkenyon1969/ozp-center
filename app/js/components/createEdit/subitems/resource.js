'use strict';

var React          = require('react'),
    TextInput      = require('../../form/textInput'),
    DeleteBtnMixin = require('./deleteBtnMixin'),
    dataBinder     = require('../../../utils/binder');

module.exports = React.createClass({
    mixins: [DeleteBtnMixin],

    render: function () {
        var resource = this.props.item;

        /*jshint ignore: start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <TextInput type="text" requried label="Type of Resource" dataBinder={dataBinder.simpleBinder(resource.name)} maxLength={2083} required />
                    <TextInput type="url" requried label="URL" dataBinder={dataBinder.simpleBinder(resource.url)} maxLength={2083} required />
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});
