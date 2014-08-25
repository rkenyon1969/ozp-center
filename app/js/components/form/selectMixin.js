'use strict';

var $ = require('jquery');

require('select2');

module.exports = {
    componentDidMount: function () {
        var $input = $(this.refs.input.getDOMNode()),
            select2 = $input.select2(this.state.select2).data('select2');

        $input.on('change', this.handleChange);

        this._$select2 = select2;
        this._$input = $input;
    },

    componentWillUnmount: function () {
        this._$input.off('change');
        this._$select2.destroy();
    },

    getDOMValue: function (target) {
        return $(target).select2('val');
    }
};
