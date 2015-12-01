var waitForTextTime = 5000;
var waitAndClickTime = 5000;


module.exports = {
    waitAndClick: function(selector, that) {
        that.waitForSelector(
            selector,
            function () {
                that.echo('++++ Found and clicking ' + selector);
                that.click(selector);
                // that.capture(selector + '.png');
            },
            function () {
                that.echo("---- Can't find for clicking " + selector);
                that.capture('no' + selector + '.png');
            },
            waitAndClickTime
        );
    },
    checkForText: function(text, that) {
        that.waitForText(
            text,
            function () {
                that.echo('++++ Found ' + text);
                that.test.assertTextExists(text);
                // that.capture(text + '.png');
            },
            function () {
                that.echo("---- Can't find  " + text);
                that.capture('no' + text + '.png');
            },
            waitForTextTime
        );
    },
    checkForSelector: function(selector, that) {
        that.waitForSelector(
            selector,
            function () {
                that.echo('++++ Found ' + selector);
                that.test.assertExists(selector);
                // that.capture(selector + '.png');
            },
            function () {
                that.echo("---- Can't find " + selector);
                that.capture('no' + selector + '.png');
            },
            10000
        );
    }
};
