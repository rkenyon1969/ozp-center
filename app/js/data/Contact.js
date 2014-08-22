'use strict';

var merge = require('react/lib/merge');

var schema = {
    name: '',
    securePhone: '',
    unsecurePhone: '',
    email: '',
    type: {id: null}
};

function Contact(json) {
    return merge(schema, json);
}

module.exports = Contact;
