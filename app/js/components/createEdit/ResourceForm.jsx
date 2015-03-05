'use strict';

var React = require('react');
var { ValidatedFormMixin, TextInput } = require('./form');

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

module.exports = ResourceForm;
