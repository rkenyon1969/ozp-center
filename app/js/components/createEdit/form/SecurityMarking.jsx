'use strict';

var React = require('react');
var { cloneWithProps, classSet } = React.addons;
var SecurityModal = require('./SecurityModal.jsx');


var SecurityMarking = React.createClass({

    getInitialState: function () {
        return {
            value: this.props.value,
            blurred: false,
            charLimit: this.props.charLimit,
            modalEnabled: false
        };
    },

    renderInput: function () {
        var textStyle = {
            fontWeight: 500,
            color: '#625858'
        };

        return (
            <input type="text" style={textStyle} readOnly/>
        );
    },

    openModal: function () {
        this.setState({
            modalEnabled: true
        });
    },

    onModalClosed: function () {
        this.setState({
            modalEnabled: false
        });
    },

    onModalSubmit: function (marking) {
        this.setState({value: marking})
        this.props.setter(marking);
    },

    render: function () {
        var labelClasses = classSet({ 'input-optional': this.props.optional });

        return (
            <div id={this.props.id} className={ this.getClasses() }>
                <label htmlFor={ this.props.id } className={labelClasses}>{ this.props.label }</label>
                <p className="small">{ this.props.description }</p>

                { this.props.help && <p className="help-block small">{ this.props.help }</p>}

                { cloneWithProps(this.renderInput(), this.getInputProps()) }
                <button className="btn btn-sm btn-primary addNew"
                        onClick={this.openModal}>
                    Build Marking
                </button>
                <SecurityModal enabled={this.state.modalEnabled}
                               closeCallback={this.onModalClosed}
                               submitCallback={this.onModalSubmit}
                />
            </div>
        );
    },

    //we pass props and state into showError/showWarning so that they
    //can be used in shouldComponentUpdate
    showWarning: function (props, state) {
        return !this.showError(props, state.blurred) && (props.warning && state.blurred);
    },

    showError: function (props, state) {
        return props.error && (state || props.forceError);
    },

    getClasses: function () {
        return classSet({
            'form-group': true,
            'has-error': this.showError(this.props, this.state),
            'has-warning': this.showWarning(this.props, this.state)
        });
    },

    getInputProps: function () {
        var value = this.getValue ? this.getValue(this.props.value) : (this.state.value || this.props.value);
        var onChange = this.onChange ? this.onChange : this._onChange;
        var onBlur = this.onBlur ? this.onBlur : this._onBlur;

        return {
            ref: 'input',
            className: 'form-control',
            id: this.props.inputId,
            value: value,
            onBlur: onBlur,
            onChange: onChange
        };
    }


});

module.exports = SecurityMarking;
