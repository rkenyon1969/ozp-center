var configureCasper = require('./configure').configureCasper;
var url = require('./configure').url;
var username = require('./configure').username;
var password = require('./configure').password;


module.exports = {
    setup: function(casper) {
        casper.start();

        configureCasper(casper);
        turnOnDebug(casper);
        turnOnShim(casper);

        casper.options.pageSettings.userName = username;
        casper.options.pageSettings.password = password;
        casper.page.customHeaders={'Authorization': 'Basic '+btoa(username+':'+password)};

        casper.thenOpen(url).then(function(status) {
            if (status.status !== 200) {
                console.log('---- Unable to access network');
                this.exit(this.status(true));
            } else {
                console.log("++++ Getting Authenticated");
                this.echo(this.getTitle());
            }
        });
    },
    needsSetup: function () {
        if (typeof casper.options.pageSettings.userName === 'undefined') {
            return true;
        } else {
            return false;
        }
    }
}
