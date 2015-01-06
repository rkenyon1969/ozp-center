'use strict';

var Reflux = require('reflux');
var $ = require('jquery');

var body;
var previousBodyPaddingRight = 0;

function getBodyPadding() {
    return parseInt(body.css('padding-right'), 10);
}

/**
 * This store is part of a hack to handle the way that bootstrap
 * treats modals.  When a bootstrap modal is opened, any existing body scrollbar
 * disappears and a corresponding amount of right padding is added to the body element
 * to keep content from shifting.  However, this padding does not affect fixed
 * elements, which can thus get out of alignment.  The point of this store is
 * to keep track of the current amount of right padding on the body and to make
 * that value cleanly accessible to any fixed positioned component that might need it
 *
 * NOTE: This relies on browser capabilities that are not present in IE 9 and 10. In those
 * browsers this store will never trigger
 */
var BodyPaddingStore = Reflux.createStore({
    init: function() {
        body = $(document.body);

        //efficiently observing DOM mutation is not available in IE9-10
        if (window.MutationObserver) {
            var observer = new MutationObserver(this.bodyAttributesChanged.bind(this));

            observer.observe(document.body, {attributes: true});
        }

        previousBodyPaddingRight = getBodyPadding();
    },

    bodyAttributesChanged: function(mutations) {
        var me = this;

        mutations.forEach(function(mutation) {
            var bodyPaddingRight;

            if (mutation.attributeName === 'style') {
                bodyPaddingRight = getBodyPadding();

                if (bodyPaddingRight !== previousBodyPaddingRight) {
                    previousBodyPaddingRight = bodyPaddingRight;
                    me.trigger(bodyPaddingRight);
                }
            }
        });
    },

    getDefaultData: function() {
        return previousBodyPaddingRight;
    }
});

module.exports = BodyPaddingStore;
