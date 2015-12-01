# CasperJS Automated Regression Testing (of Center)

[CasperJS](http://casperjs.org/) wraps [PhantomJS](http://phantomjs.org/), a headless browser, to
allow you to write scripts for "outside-in" functional testing. These sorts of tests should be able
to replace many of the manual tests in a typical regression test plan document.


## Prerequisites

You need both PhantomJS and CasperJS. Follow the instructions
[here](http://docs.casperjs.org/en/latest/installation.html).


## Quick Start

First, clone ozp-center:

`git clone https://github.com/ozone-development/ozp-center.git`

Next, navigate to `ozp-center/casper` and, to run the tests on ci-latest, run:

`casperjs test --ssl-protocol=any --web-security=false --ignore-ssl-errors=yes tests/>`

The `search.js`, for instance, test does the following:

1. Authenticates with basic authentication
2. Opens the Center homepage
3. Ensures the string "Featured" is present on the page
4. Ensures the selector for search input is present
5. Enter the string "a" and click search
6. Ensures the string "Search Results" is present
7. Ensures at least one listing is returned by checking for the class .SearchListingTile
8. Clears the search by clicking the X (class: .clearButton).
9. Ensures the string "Featured" is present on the page
10. Then performs a similar test using a category (Communication) instead of text search


## Configuring Tests

By default the tests run with the user set to `testAdmin1` against `ci-latest`. This is specified in
`casper/configure.js`. Feel free to provide URLs to other servers and other users, to include those
appropriate to the new backend.

`configure.js` includes other configuration items for CasperJS itself. Its verbosity and log level,
for instance, can be set here.


## Writing Tests

The CasperJS [docs](http://docs.casperjs.org/en/latest/testing.html) and looking at the existing
`tests/search.js` and `tests/submit.js` tests are the best place to start; stuff peculiar to testing
Center is documented here.


### The shim

To instrument a ReactJS app like center, you need Function.prototype.bind(). PhantomJS v1.x does not
support Function.prototype.bind(), and while PhantomJS v2.0 is out, there isn't an official CasperJS
version that supports PhantomJS v2.0. So, for the time being, we need the shim in shim.js. Require
the shim with: ```var turnOnShim = require('../shim');``` and turn it on with ```turnOnShim(casper);
``` inside your test.

### The helpers

The helper function in `helpers.js` are intended to decrease verbosity in the tests themselves, but
if they're getting in the way feel free not to use them. They all implement a wait for something - a
selector or some text - and either do something like click or assert existence if that something is
there; if that item isn't found, its absence is noted in the log and a png image capture of the page
is saved. The image can (sometimes) be used to quickly determine what went wrong.

### Debugging

`debug.js` allows you to specify how much debugging information you want passed from the browser
through to CasperJS.

### Gotchas

* The `casper.tests.begin()` method requires the number of assertions as a parameter. Currently all
  assertions are buried in the helpers `checkForText()` and `checkForSelector()`. So, the number of
  calls to those routines is the number of assertions.
* It's sometimes hard to remember that when you're writing CasperJS tests you don't have access to
  the same resources the app under test has, e.g. jquery or select2 (the select box library center
  uses). To get access to these resources, CasperJS needs them specified, as select2 is in
  configure.js.
