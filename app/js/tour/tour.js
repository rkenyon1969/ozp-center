'use strict';

var { globalTour } = require('./');
var { centerTour } = require('./');

$(document).on('click', '#tour-start', function(){
  window.localStorage.clear();
  globalTour.init();
  globalTour.start();
});
