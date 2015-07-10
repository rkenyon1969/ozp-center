'use strict';

var $ = require('jquery');
var API_WAIT = 1000;

require('select2');

/**
 * Components that include this mixin must implement
 * getSelect2Options()
 */
var Select2Mixin = {
    _setOptions: function(){
        var $input = $(this.refs.input.getDOMNode()),
            select2 = $input.select2(this.getSelect2Options()).data('select2');

        $input.on('change', this.onChange);
        $input.on('select2-blur', this._onBlur);
        $input.select2('val', this.props.value);

        this._$select2 = select2;
        this._$input = $input;
    },

    componentDidMount: function () {
        this._setOptions();
        // Allow time for the api to return with listing type data. Horrible.
        setTimeout(() => {
            this._$input.select2(this.getSelect2Options()).data('select2');
            this._$input.select2('val', this.props.value);
        }, API_WAIT);
    },

    componentDidUpdate: function () {
        this._$input.select2('val', this.props.value);
    },

    componentWillUnmount: function () {
        this._$input.off('change');
        this._$input.off('select2-blur');
        this._$select2.destroy();
    },

    onChange: function (event) {
        event.preventDefault();
        this.props.setter(event.val);
    }
};

module.exports = Select2Mixin;
