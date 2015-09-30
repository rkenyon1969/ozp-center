'use strict';

var { homepageTour, createEditTour } = require('./');

(function(){
  // Initialize the tour
  homepageTour.init();
  createEditTour.init();

  // Start the tour
  $(document).on('click', '#tour-button-home', function(){
    console.log('Starting tour');
    window.localStorage.clear();
    homepageTour.start();
  });
  /*$(document).on('click', '#tour-button-createEdit', function(){
    console.log('Starting tour');
    window.localStorage.clear();
    createEditTour.start();
  });*/
})();
