'use strict';

var { homepageTour } = require('./');

$(document).on('click', '#tour-start', function(){
  window.localStorage.clear();
  homepageTour.init();
  homepageTour.start();
});
