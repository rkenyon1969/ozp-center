'use strict';

var React = require('react');
var { cloneWithProps, classSet } = React.addons;
var _ = require('../../../utils/_');

var InputMixin = require('./InputMixin');

var FileInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return <input type="file" />;
        /*jshint ignore:end */
    },

    //override onChange so that it passes the file to the setter, not the fake
    //file path string that comes from the value property
    onChange: function(e) {
        //set the value to the file if possible.  Fallback to using the input itself
        //as the value if the File API is not available
        var value = /*typeof e.target.files !== 'undefined' ? e.target.files[0] :*/ e.target;

        e.preventDefault();
        this.props.setter(value);
    }
});

module.exports = FileInput;
