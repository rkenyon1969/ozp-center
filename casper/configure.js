module.exports = {
    // --- New backend  ---
    // url: 'http://localhost:8000/dist/#/home',
    // username: 'bigbrother',
    // password: 'password',

    // --- Old backend ---
    url: 'https://ci-latest.amlng.di2e.net:7799/center/#/home',
    username: 'testAdmin1',
    password: 'password',

    configureCasper: function(casper) {
        casper.options.clientScripts = [
            '../bower_components/es5-shim/es5-shim.js',
            '../node_modules/ozp-react-commons/app/OzoneConfig.js',
            '../node_modules/select2/select2.js'
        ];
        casper.options.pageSettings = {
            loadImages:  true,
            loadPlugins: true
        };
        casper.options.verbose = true;
        casper.options.logLevel = "warning"; // More debug available with turnOnDebug() in debug.js
        casper.options.viewportSize = {width: 700, height: 600};
    }
};
