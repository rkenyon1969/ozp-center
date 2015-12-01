// Useful Debugging Capabilities
// http://docs.casperjs.org/en/latest/events-filters.html
function turnOnDebug(casper) {
    casper.on("remote.message", function(msg) {
        this.echo("Console: " + msg);
    });

    casper.on("page.error", function(msg, trace) {
        this.echo("----- Error: " + msg);
        // maybe make it a little fancier with the code from the PhantomJS equivalent
    });

    casper.on("resource.error", function(resourceError) {
        this.echo("---- ResourceError: " + JSON.stringify(resourceError, undefined, 4));
    });

    // casper.on("resource.requested", function(msg) {
    //     this.echo("==== resource.requested Console: " + JSON.stringify(msg, undefined, 4));
    // });

    // casper.on("resource.received", function(msg) {
    //     this.echo("==== resource.received Console: " + JSON.stringify(msg, undefined, 4));
    // });

    // casper.on("http.auth", function(msg) {
    //     this.echo("==== http.auth Console: " + JSON.stringify(msg, undefined, 4));
    // });
};

module.exports = turnOnDebug;
