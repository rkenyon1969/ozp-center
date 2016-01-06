'use strict';
var ProfileSearchActions = require('../actions/ProfileSearchActions');
var $ = require('jquery');

var ObjectDB = require('object-db');

// Setup our LocalstorageDB we will use this to talk between Center,
// Webtop and Hud tours.
var tourDB = new ObjectDB('ozp_tour').init({
  center: {
    ran: false,
    startCenterTour: false,
  }
});


var { globalTour, centerTour } = require('./');

var centerStatus = tourDB.get('center');

var initTour = function() {
  // If tour has never run before, start it.
  if(!centerStatus.ran) {
    globalTour.init();
    globalTour.start();
  }
};

ProfileSearchActions.tourCheck.listen(() => {
  // If we close the tour, remember to not show the tour again.
  $(document).on('click', '#end-tour-btn', function() {
    tourDB.set({
      center: {
        ran: true
      }
    });
  });

  initTour();
});

$(document).on('click', '#tour-start', function(){
  globalTour.init();
  globalTour.start();
});

// Subscribe to our DB, this will at a later date allow us to know where our
// tour is at in other applications.
tourDB.subscribe((data) => {
  // Ideally we would not want this debounce, Unfortunatly it takes a millisecond
  // or two to pick up on localstorage changes
  setTimeout(function(){
    if(tourDB.get('center').startCenterTour) {
      tourDB.set({
        center: {
          startCenterTour: false
        }
      });

      centerTour.init();
      centerTour.start();

    }
  }, 200);
});
