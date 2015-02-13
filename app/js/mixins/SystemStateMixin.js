'use strict';

var Reflux = require('reflux');
var SystemStore = require('../stores/SystemStore');
var SelfStore = require('ozp-react-commons/stores/SelfStore');

module.exports = {
    mixins: [Reflux.connect(SystemStore), Reflux.connect(SelfStore)],

    getInitialState: function () {
        return Object.assign({}, SystemStore.getDefaultData(), SelfStore.getDefaultData());
    }
};
