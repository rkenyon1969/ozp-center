// @exclude
//
// This file is preprocessed by gulp to create the config file
// based on environment variables and/or defaults.
//
// Only modify this file to change the defaults.  In order to set actual configuration values
// for production, modify the file that gets built from this. To temporarily set configurations
// during dev (or at build time), use enviroment variables
//
// @endexclude
window.OzoneConfig = {
    // @ifdef API_URL
    "API_URL": '/* @echo API_URL */',
    // @endif
    // @ifndef API_URL
    "API_URL": 'https://localhost:8443/marketplace',
    // @endif
    // @ifdef HELP_URL
    "HELP_URL": '/* @echo HELP_URL */',
    // @endif
    // @ifndef HELP_URL
    "HELP_URL": "https://localhost:8088/dist/assets/PlaceholderUserGuide.pdf",
    // @endif
    // @ifdef METRICS_URL
    "METRICS_URL": '/* @echo METRICS_URL */',
    // @endif
    // @ifndef METRICS_URL
    "METRICS_URL": "https://www.owfgoss.org:10443/dev/metrics/",
    // @endif
    // @ifdef CENTER_URL
    "CENTER_URL": '/* @echo CENTER_URL */',
    // @endif
    // @ifndef CENTER_URL
    "CENTER_URL": "http://localhost:8000/dist",
    // @endif
    // @ifdef HUD_URL
    "HUD_URL": '/* @echo HUD_URL */',
    // @endif
    // @ifndef HUD_URL
    "HUD_URL": "http://localhost:8088/dist",
    // @endif
    // @ifdef WEBTOP_URL
    "WEBTOP_URL": '/* @echo WEBTOP_URL */',
    // @endif
    // @ifndef WEBTOP_URL
    "WEBTOP_URL": "http://localhost:9000/#/grid/sticky-0/0",
    // @endif
    // @ifdef DEVELOPER_RESOURCES_URL
    "DEVELOPER_RESOURCES_URL": '/* @echo DEVELOPER_RESOURCES_URL */',
    // @endif
    // @ifndef DEVELOPER_RESOURCES_URL
    "DEVELOPER_RESOURCES_URL": "#",
    // @endif
};
