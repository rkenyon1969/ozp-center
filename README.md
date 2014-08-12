# Center UI [![Build Status][travis-image]][travis-url]

Center UI built on [React](http://facebook.github.io/react/), [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) build system. If you look at the /gulp, it implements some nifty features:

* `gulp` shows all available commands.
* `gulp dev` implements an http server and a live reload server.
* `gulp --production` shows how to use command line flags to switch to building minified versions.
* Uses the awesome Webpack project to combine all the javascript files into one.

## Getting Started
First clone the repo. Then, install the bower and npm modules.

```
npm install
```

`npm start` or `gulp dev` then go to http://localhost:8080/webpack-dev-server/dist

Your browser will automatically reload when any file in /app changes.

[travis-url]: https://travis-ci.org/ozone-development/center-ui
[travis-image]: https://travis-ci.org/ozone-development/center-ui.svg