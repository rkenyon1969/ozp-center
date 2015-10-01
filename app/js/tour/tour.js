'use strict';

var { homepageTour } = require('./');

$(document).on('click', '#tour-button-home', function(){
  window.localStorage.clear();
  homepageTour.init();
  homepageTour.start();
});
