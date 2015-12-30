'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');

var MarkingInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        var textStyle = {
            fontWeight: 500,
            color: '#625858'
        };

        // Clamp bootstrap-classify modal to selector specified in options
        var bsClassifyOptions = {selector: 'input[rel]',
                                 mode: 'modal',
                                 title: 'Security Marking',
                                 format: 'bl',
                                 callback: (data, element) => {
                                     var value = data.marking;
                                     this.setState({ value: value });
                                     this.props.setter(value);
                                 }
        };

        $.fn.classify(bsClassifyOptions);

        return (
            <input rel="bs-classify" type="text" style={textStyle}/>
        );
    }
});

 module.exports = MarkingInput;
