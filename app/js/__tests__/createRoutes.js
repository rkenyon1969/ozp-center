'use strict';

var Router = require('react-router');
var { Route } = Router;
var Routes = require('../components/Routes.jsx');

module.exports = function createRoutes (Component, path) {
    path = path || 'test';
    return Routes(<Route name={path} path={path} handler={Component} />);
};
