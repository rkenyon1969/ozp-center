var turnOnShim = require('../shim');
var turnOnDebug = require('../debug');
var waitAndClick = require('../helpers').waitAndClick;
var checkForText = require('../helpers').checkForText;
var checkForSelector = require('../helpers').checkForSelector;
var setup = require('../setup.js').setup;
var needsSetup = require('../setup.js').needsSetup;


casper.test.begin('Submit minimal listing', 8, function (test) {

    if (needsSetup()) {
        setup(casper);
    }

    // Lights are on
    casper.then(function () {
        checkForText('Featured', this);
    });

    casper.then(function () {
        waitAndClick("a[data-toggle='dropdown']", this);
    });

    casper.then(function () {
        checkForText('Create', this);
    });

    casper.then(function () {
        waitAndClick("a[href='#/edit']", this);
    });

    casper.then(function () {
        checkForText('Create New Listing', this);
    });

    // Make sure you can enter a listing title
    casper.then(function () {
        checkForSelector('#inputElement\\.title', this);
    });

    // Enter listing title
    casper.then(function () {
        var selector = '#inputElement\\.title';
        this.sendKeys(selector, 'Casper2');
    });

    // Make sure you can enter a listing type
    casper.then(function () {
        checkForSelector('#s2id_inputElement\\.type', this);
    });

    // Enter type and category
    casper.thenEvaluate(function() {
        // chose a Type
        $('#s2id_inputElement\\.type').select2('search', 'Widget');
        $('.select2-highlighted').mouseup();

        // chose a category
        $('#s2id_inputElement\\.categories').select2('search', 'Sports');
        $('.select2-highlighted').mouseup();
    });

    // Check to see if category and type stuck
    casper.then(function () {
        checkForText('Widget', this);
        checkForText('Sports', this);
    });

    // Submit the draft listing
    casper.then(function () {
        waitAndClick(".btn-danger", this);
    });

    // Check that the green buttons (preview, submit, etc.) are present
    casper.then(function () {
        casper.wait(1000, function () {
            checkForSelector('.btn-default', this);
        });
    });

    casper.run(function () {
        test.done();
    });
});
