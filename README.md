# Center UI [![Build Status][travis-image]][travis-url]

Center UI built on [React](http://facebook.github.io/react/), [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/).

## Prerequisites
Install Node.js and npm. Head over to [the Node.js website](http://nodejs.org/) if you need to do that. Next, install Bower and Gulp, you might need to run them as sudo.
```
npm install -g gulp bower
```

## Setup
First clone the repo. Install module dependencies.

```
git clone https://github.com/ozone-development/center-ui.git
cd center-ui
npm install
```

Next, run `npm start` or `gulp dev`. Go to http://localhost:8000/webpack-dev-server/dist and browser will automatically reload when any file in /app changes. Alternatively, you can also go to http://localhost:8000/dist, if auto reload is undesirable.

## Available tasks
See `scripts` key in `package.json` for all options.
* `npm start` implements an http server and a live reload server.
* `npm run build` generates production build at ./dist directory with minified versions of JS and CSS. Contents of ./dist directory can then be copied to a web server.
* `npm run deployGhPages` runs a build with demo configs and deploys ./dist to github pages.

[travis-url]: https://travis-ci.org/ozone-development/ozp-center
[travis-image]: https://travis-ci.org/ozone-development/ozp-center.svg

