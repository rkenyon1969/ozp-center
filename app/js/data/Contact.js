'use strict';

var merge  = require('react/lib/merge');

var schema = {
    name: '',
    type: '',
    securePhone: '',
    unsecurePhone: '',
    email: ''
};

function Contact(json) {
    return merge(schema, json);
}

module.exports = Contact;
