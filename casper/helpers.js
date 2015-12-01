var waitForTextTime = 5000;
var waitAndClickTime = 5000;


module.exports = {
    waitAndClick: function(selector, that, description) {
        description = description || selector;
        that.waitForSelector(
            selector,
            function () {
                that.echo('++++ Found and clicking ' + selector);
                that.click(selector);
                // that.capture('captures/' + description + '.png');
            },
            function () {
                that.echo("---- Can't find for clicking " + description);
                that.capture('captures/' + 'no' + description + '.png');
            },
            waitAndClickTime
        );
    },
    checkForText: function(text, that, description) {
        description = description || text;
        that.waitForText(
            text,
            function () {
                that.echo('++++ Found ' + description);
                that.test.assertTextExists(text);
                // that.capture('captures/' + description + '.png');
            },
            function () {
                that.echo("---- Can't find  " + description);
                that.capture('captures/' + 'no' + description + '.png');
            },
            waitForTextTime
        );
    },
    checkForSelector: function(selector, that, description) {
        description = description || selector;
        that.waitForSelector(
            selector,
            function () {
                that.echo('++++ Found ' + description);
                that.test.assertExists(selector);
                // that.capture('captures/' + description + '.png');
            },
            function () {
                that.echo("---- Can't find " + description);
                that.capture('captures/' + 'no' + description + '.png');
            },
            10000
        );
    }
};
