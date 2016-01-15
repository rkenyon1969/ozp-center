/* This compontent depends on the bootstrap-classify jquery plugin
 * (https://github.com/ozone-development/bootstrap-classify). The
 * plugin is designed to allow users to override different aspects to
 * tailor the plugin for your specific application, and that's what's
 * going on with the $.fn.classify jazz below. The css for the
 * bootstrap classify modal can be found in
 * app/styles/_create-edit.scss. The ISM configuration including test
 * classifications and controls is in config/ism-u.config.js
 */

'use strict';

var _ = require('../../../utils/_');
var React = require('react');
var InputMixin = require('./InputMixin.jsx');
var {bscModalTemplate, bscMainTemplate} = require('./markingInputHtmlTemplates.js');

var MarkingInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        var textStyle = {
            fontWeight: 500,
            color: '#625858'
        };

        // Tailor bootstrap-classify look
        $.fn.classify.markings = {
            classification: {
                U: { bl: 'UNCLASSIFIED', pm: 'U', css: 'unclass-green', label: 'unclass-green' },
                C: { bl: 'CONFIDENTIAL', pm: 'C', css: 'confidential-blue', label: 'confidential-blue' },
                S: { bl: 'SECRET', pm: 'S', css: 'secret-red', label: 'secret-red' },
                TS: { bl: 'TOP SECRET',	pm: 'TS', css: 'topsecret-yellow', label: 'topsecret-yellow' }
            }
        };

        // Override templates with OZP-tailored templates
        $.fn.classify.templates.modal = _.template(bscModalTemplate);
        $.fn.classify.templates.main = bscMainTemplate;

        // Clamp bootstrap-classify modal to selector specified in options
        var selector = '[id="' + this.props.inputId + '"]';
        var bsClassifyOptions = {selector: selector,
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
